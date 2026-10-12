import { useEffect } from 'react';
import { useSite } from './useSite';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Keeps <title>, description, canonical and Open Graph tags in sync during client-side navigation.
 * (The first page load already gets server-rendered tags from Laravel.)
 */
export default function useSeo({ title, description, image, canonical, type = 'website', noindex = false } = {}) {
  const { settings } = useSite();
  const siteName = settings.site_name || 'Finns Kerrisdale Ladies';

  useEffect(() => {
    if (title === undefined) return;
    const full = title ? `${title} - ${siteName}` : siteName;
    document.title = full;
    const desc = description || settings.seo_default_description || '';
    const url = canonical || window.location.origin + window.location.pathname;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image || settings.og_default_image);
    setMeta('property', 'og:site_name', siteName);
    setCanonical(url);
  }, [title, description, image, canonical, type, noindex, siteName, settings.seo_default_description, settings.og_default_image]);
}
