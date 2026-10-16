import { useSite } from '../../hooks/useSite';

export default function Footer() {
  const { settings } = useSite();
  const currentYear = String(new Date().getFullYear());
  const text = (settings.copyright_text || 'Copyright © {year} Finns Kerrisdale Ladies. All Rights Reserved.')
    .replace(/\{year\}/g, currentYear)
    .replace(/(©\s*)\d{4}/, `$1${currentYear}`);
  const social = Array.isArray(settings.social_links) ? settings.social_links.filter((s) => s?.url) : [];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {social.length > 0 && (
          <ul className="footer-social">
            {social.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label || s.network}</a></li>
            ))}
          </ul>
        )}
        <p className="copyright">{text}</p>
      </div>
    </footer>
  );
}
