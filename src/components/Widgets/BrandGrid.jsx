/** Designer page: brand label tiles linking to each designer's website. */
export default function BrandGrid({ brands = [] }) {
  if (!brands.length) return null;
  return (
    <ul className="brand-grid">
      {brands.map((b) => {
        const tile = (
          <>
            {b.logo_url ? <img src={b.logo_url} alt={`${b.name} brand tag`} loading="lazy" /> : <span className="brand-name">{b.name}</span>}
            {b.label && <span className="brand-label">{b.label}</span>}
          </>
        );
        return (
          <li key={b.id} className="brand-tile">
            {b.website_url ? (
              <a href={b.website_url} target="_blank" rel="noopener noreferrer" title={`Visit ${b.name}`}>{tile}</a>
            ) : (
              tile
            )}
          </li>
        );
      })}
    </ul>
  );
}
