import { Link } from 'react-router-dom';

/** "You are here: Home / Uncategorized / RIANI S'21" */
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <span className="breadcrumb-label">You are here: </span>
      <Link to="/">Home</Link>
      {items.map((it, i) => (
        <span key={i}>
          {' / '}
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
