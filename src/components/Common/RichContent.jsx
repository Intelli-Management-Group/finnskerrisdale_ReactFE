import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Lightbox from './Lightbox';

/**
 * Renders CMS HTML (already sanitized by Laravel) and:
 *  - mounts React widgets into placeholders like <div data-widget="subscribe"></div>
 *  - routes internal links through React Router (no full page reload)
 *  - opens links that point at an image in a lightbox, like the old site's image links
 */
/**
 * The raw HTML lives in its own memoised element so React never re-applies innerHTML when the
 * parent re-renders — otherwise the nodes our widgets are portalled into would be replaced.
 */
const HtmlBlock = memo(function HtmlBlock({ html, className, innerRef }) {
  return <div ref={innerRef} className={`entry-content ${className}`} dangerouslySetInnerHTML={{ __html: html || '' }} />;
});

export default function RichContent({ html, widgets = {}, className = '' }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  // Re-scan placeholders only when the HTML or the set of available widgets changes
  // (the widget elements themselves are read fresh on every render below).
  const widgetKeys = Object.keys(widgets).filter((k) => widgets[k]).join(',');
  useLayoutEffect(() => {
    if (!ref.current) return;
    const enabled = widgetKeys ? widgetKeys.split(',') : [];
    const found = [...ref.current.querySelectorAll('[data-widget]')]
      .map((el) => ({ el, name: el.getAttribute('data-widget') }))
      .filter((s) => enabled.includes(s.name));
    found.forEach(({ el }) => { el.textContent = ''; }); // drop the editor's "[widget]" label
    setSlots(found);
  }, [html, widgetKeys]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    // lazy-load and async-decode every content image
    root.querySelectorAll('img').forEach((img) => {
      if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });

    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a || !root.contains(a) || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (/\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(href)) {
        e.preventDefault();
        const images = [...root.querySelectorAll('a')]
          .map((x) => x.getAttribute('href'))
          .filter((h) => h && /\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(h));
        setLightbox({ images, index: Math.max(0, images.indexOf(href)) });
        return;
      }
      const url = new URL(a.href, window.location.href);
      if (url.origin === window.location.origin && !href.startsWith('#')) {
        e.preventDefault();
        navigate(url.pathname + url.search + url.hash);
      }
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [html, navigate]);

  return (
    <>
      <HtmlBlock html={html} className={className} innerRef={ref} />
      {slots.map(({ el, name }, i) => (widgets[name] ? createPortal(widgets[name], el, `${name}-${i}`) : null))}
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
