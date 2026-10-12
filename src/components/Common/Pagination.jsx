import { Link } from 'react-router-dom';

/** WordPress-style pagination: ← Previous 1 2 … 4 Next → */
export default function Pagination({ current, last, hrefFor }) {
  if (!last || last <= 1) return null;
  const pages = [];
  for (let p = 1; p <= last; p++) {
    if (p === 1 || p === last || Math.abs(p - current) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return (
    <nav className="pagination" aria-label="Blog pages">
      {current > 1 && <Link className="page-numbers prev" to={hrefFor(current - 1)}>← Previous</Link>}
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`d${i}`} className="page-numbers dots">…</span>
        ) : p === current ? (
          <span key={p} className="page-numbers current" aria-current="page">{p}</span>
        ) : (
          <Link key={p} className="page-numbers" to={hrefFor(p)}>{p}</Link>
        ),
      )}
      {current < last && <Link className="page-numbers next" to={hrefFor(current + 1)}>Next →</Link>}
    </nav>
  );
}
