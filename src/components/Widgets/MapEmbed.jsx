import { useSite } from '../../hooks/useSite';

export default function MapEmbed() {
  const { settings } = useSite();
  if (!settings.map_embed_url) return null;
  return (
    <div className="map-embed">
      <iframe
        title={`Map to ${settings.site_name || 'the store'}`}
        src={settings.map_embed_url}
        width="294"
        height="184"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
