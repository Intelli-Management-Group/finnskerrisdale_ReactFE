import { Link } from 'react-router-dom';
import { useSite } from '../../hooks/useSite';
import Navbar from '../Navbar/Navbar';

export default function Header() {
  const { settings } = useSite();
  const name = settings.site_name || 'Finns Kerrisdale Ladies';

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="site-logo" aria-label={`${name} – home`}>
          {settings.logo_url ? (
            <img src={settings.logo_url} alt={name} width="290" height="76" />
          ) : (
            <span className="logo-text">{name}</span>
          )}
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
