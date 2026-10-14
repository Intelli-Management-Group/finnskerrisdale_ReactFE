import { useEffect, useRef, useState } from 'react';

function getBrandPreviewImage(brand) {
  const candidates = [
    brand.brand_thumbnail_url,
    brand.brand_thumbnail,
    brand.hover_image_url,
    brand.hover_image,
    brand.preview_image_url,
    brand.preview_image,
    brand.image_url,
    brand.image,
    brand.featured_image_url,
    brand.featured_image,
    brand.logo_url,
  ];

  for (const image of candidates) {
    if (typeof image === 'string' && image.trim()) return image;
    if (image && typeof image === 'object') {
      const url = image.url || image.original_url;
      if (typeof url === 'string' && url.trim()) return url;
    }
  }

  return null;
}

/** Designer page: brand label tiles linking to each designer's website. */
export default function BrandGrid({ brands = [] }) {
  const [activeBrandId, setActiveBrandId] = useState(null);
  const displayRef = useRef(null);
  const activeBrand = brands.find((brand) => brand.id === activeBrandId) || brands[0];
  const previewImage = activeBrand ? getBrandPreviewImage(activeBrand) : null;

  useEffect(() => {
    if (!activeBrand || !previewImage) return;
    const row = displayRef.current?.closest('.fkl-row');
    const image = row?.querySelector('.fkl-col-4 img');
    if (!image) return;

    image.setAttribute('src', previewImage);
    image.setAttribute('alt', `${activeBrand.name} Designer Clothing`);
  }, [activeBrand?.name, previewImage]);

  if (!brands.length) return null;
  return (
    <div className="designer-brand-display" ref={displayRef}>
      <ul className="brand-grid">
        {brands.map((b) => {
          const tile = (
            <>
              {b.logo_url ? <img src={b.logo_url} alt={`${b.name} brand tag`} loading="lazy" /> : <span className="brand-name">{b.name}</span>}
              {/* {b.label && <span className="brand-label">{b.label}</span>} */}
            </>
          );
          return (
            <li
              key={b.id}
              className={`brand-tile${(activeBrand.id === b.id || activeBrandId === b.id) ? ' is-active' : ''}`}
              onMouseEnter={() => setActiveBrandId(b.id)}
              onMouseLeave={() => setActiveBrandId(null)}
              onFocus={() => setActiveBrandId(b.id)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setActiveBrandId(null);
              }}
            >
              {b.website_url ? (
                <a href={b.website_url} target="_blank" rel="noopener noreferrer" title={`Visit ${b.name}`}>{tile}</a>
              ) : (
                tile
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
