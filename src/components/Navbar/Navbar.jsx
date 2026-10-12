import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSite } from '../../hooks/useSite';

const FALLBACK = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about/' },
  { label: 'Designer', url: '/designer/' },
  { label: 'Latest News', url: '/blog/' },
  { label: 'Contact Us', url: '/contact/' },
];

export default function Navbar() {
  const { menu, ready } = useSite();
  const items = menu?.length ? menu : ready ? FALLBACK : FALLBACK;
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const isExternal = (url) => /^https?:\/\//.test(url);
  // "Latest News" stays highlighted while reading a post (posts live at /{slug}/)
  const isActive = (url) => {
    if (url === '/') return pathname === '/';
    return pathname.startsWith(url.replace(/\/$/, '')) ;
  };

  return (
    <nav className="main-nav" aria-label="Main">
      <button
        type="button"
        className={`nav-toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="sr-only">Menu</span>
      </button>
      <ul id="main-menu" className={`main-menu ${open ? 'is-open' : ''}`}>
        {items.map((item) => (
          <li key={item.url + item.label} className={isActive(item.url) ? 'current-menu-item' : ''}>
            {isExternal(item.url) ? (
              <a href={item.url} target={item.open_in_new_tab ? '_blank' : undefined} rel="noopener noreferrer">{item.label}</a>
            ) : (
              <NavLink to={item.url} end={item.url === '/'} className={() => (isActive(item.url) ? 'active' : '')}>
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
