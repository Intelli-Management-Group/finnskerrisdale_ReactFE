import { useState } from 'react';
import { api } from '../../services/api';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

/** Optional contact form (enabled from Admin → Settings → Forms). */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    setErrors({});
    try {
      const res = await api.contact(form);
      setStatus({ state: 'done', message: res.message });
      setForm(EMPTY);
    } catch (err) {
      setErrors(err.errors || {});
      setStatus({ state: 'error', message: err.message });
    }
  };

  if (status.state === 'done') return <p className="form-success" role="status">{status.message}</p>;

  const field = (key, label, props = {}) => (
    <div className={`form-row ${errors[key] ? 'has-error' : ''}`}>
      <label htmlFor={`cf-${key}`}>{label}{props.required && <span className="required">*</span>}</label>
      {props.as === 'textarea' ? (
        <textarea id={`cf-${key}`} rows={5} value={form[key]} onChange={set(key)} required={props.required} />
      ) : (
        <input id={`cf-${key}`} type={props.type || 'text'} value={form[key]} onChange={set(key)} required={props.required} autoComplete={props.autoComplete} />
      )}
      {errors[key] && <span className="field-error">{errors[key][0]}</span>}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <h5 className="subscribe-title">Send us a message</h5>
      {field('name', 'Name', { required: true, autoComplete: 'name' })}
      {field('email', 'Email', { required: true, type: 'email', autoComplete: 'email' })}
      {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
      {field('message', 'Message', { required: true, as: 'textarea' })}
      <input type="text" className="hp-field" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
      {status.state === 'error' && !Object.keys(errors).length && <p className="form-error" role="alert">{status.message}</p>}
      <button type="submit" className="btn btn-default" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}
