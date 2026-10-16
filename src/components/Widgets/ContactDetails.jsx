import { useSite } from '../../hooks/useSite';

export default function ContactDetails() {
  const { settings: s } = useSite();
  const hours = Array.isArray(s.hours) ? s.hours : [];
  const tel = (s.phone || '').replace(/[^\d+]/g, '');

  return (
    <div className="contact-details">
      {s.address && (
        <p className="cd-no-bottom-space"><span className="cd-label">Address:</span> <span className="cd-value">{s.address}</span></p>
      )}
      {s.phone && (
        <p className="cd-no-bottom-space"><span className="cd-label">Phone:</span> <a className="cd-value" href={`tel:${tel}`}>{s.phone}</a></p>
      )}
      {s.email && (
        <p className="cd-tight"><span className="cd-label">E-mail:</span> <a className="cd-value" href={`mailto:${s.email}`}>{s.email}</a></p>
      )}
      {hours.length > 0 && (
        <p className="cd-tight">
          <span className="cd-label">Hours:</span>
          <span className="cd-hours">
            {hours.map((h, i) => (
              <span key={i} className="cd-value">{h.days}: {h.time}</span>
            ))}
            {s.hours_note && <span className="cd-value cd-note">{s.hours_note}</span>}
          </span>
        </p>
      )}
      {hours.length === 0 && s.hours_note && <p className="cd-note">{s.hours_note}</p>}
    </div>
  );
}
