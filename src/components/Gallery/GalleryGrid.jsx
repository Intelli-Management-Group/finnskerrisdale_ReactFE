import { useState } from 'react';
import Lightbox from '../Common/Lightbox';

export default function GalleryGrid({ photos = [] }) {
  const [open, setOpen] = useState(null);
  if (!photos.length) return <p className="empty">No photos yet.</p>;
  const full = photos.map((p) => p.variants?.large || p.url);
  return (
    <>
      <ul className="gallery-grid">
        {photos.map((p, i) => (
          <li key={p.id}>
            <button type="button" className="gallery-thumb" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}${p.caption ? `: ${p.caption}` : ''}`}>
              <img src={p.variants?.medium || p.url} alt={p.alt || p.caption || ''} loading="lazy" width={p.width} height={p.height} />
            </button>
            {p.caption && <p className="gallery-caption">{p.caption}</p>}
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox images={full} index={open} onClose={() => setOpen(null)} />}
    </>
  );
}
