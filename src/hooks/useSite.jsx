import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const SiteContext = createContext({ settings: {}, menu: [], categories: [], ready: false });

export function SiteProvider({ children }) {
  const [site, setSite] = useState({ settings: {}, menu: [], categories: [], ready: false });
  const faviconUrl = site.settings.favicon_url;

  useEffect(() => {
    api.site()
      .then((res) => setSite({ ...res.data, ready: true }))
      .catch(() => setSite((s) => ({ ...s, ready: true, failed: true })));
  }, []);

  useEffect(() => {
    if (!faviconUrl) return;
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = faviconUrl;
  }, [faviconUrl]);

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
