import { useCallback, useEffect, useState } from 'react';

export default function Lightbox({ images, index = 0, onClose }) {
  const [i, setI] = useState(index);
  const prev = useCallback(() => setI((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setI((n) => (n + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}>
      <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>×</button>
      {images.length > 1 && (
        <button type="button" className="lightbox-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
      )}
      <img src={images[i]} alt="" onClick={(e) => e.stopPropagation()} />
      {images.length > 1 && (
        <button type="button" className="lightbox-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
      )}
      {images.length > 1 && <div className="lightbox-count">{i + 1} / {images.length}</div>}
    </div>
  );
}
