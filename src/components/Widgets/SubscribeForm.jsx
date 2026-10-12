import { useState } from 'react';
import { api } from '../../services/api';
import { useSite } from '../../hooks/useSite';

/** "Email Subscription — Sign me up!" (replaces the Easy Registration Forms widget) */
export default function SubscribeForm({ variant = 'block' }) {
  const { settings } = useSite();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    try {
      const res = await api.subscribe(email, website);
      setStatus({ state: 'done', message: res.message });
      setEmail('');
    } catch (err) {
      const msg = err.errors?.email?.[0] || err.message;
      setStatus({ state: 'error', message: msg });
    }
  };

  return (
    <div className={`subscribe subscribe-${variant}`}>
      <h5 className="subscribe-title">{settings.subscribe_title || 'Email Subscription'}</h5>
      <p className="subscribe-text">
        {settings.subscribe_text || 'Enter your email address to subscribe to our blog and receive notifications of new posts by email.'}
      </p>
      {status.state === 'done' ? (
        <p className="form-success" role="status">{status.message}</p>
      ) : (
        <form onSubmit={submit} noValidate>
          <label htmlFor={`sub-email-${variant}`} className="field-label">
            Email<span className="required">*</span>
          </label>
          <input
            id={`sub-email-${variant}`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status.state === 'error'}
          />
          <input
            type="text"
            name="website"
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
          />
          {status.state === 'error' && (
            <p className="form-error" role="alert">Error occurred. Please confirm your data and submit again: {status.message}</p>
          )}
          <button type="submit" className="btn btn-default" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending…' : settings.subscribe_button || 'Sign me up!'}
          </button>
        </form>
      )}
    </div>
  );
}
