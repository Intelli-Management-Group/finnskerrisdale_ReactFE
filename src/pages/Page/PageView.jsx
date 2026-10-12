import { Navigate } from 'react-router-dom';
import RichContent from '../../components/Common/RichContent';
import BrandGrid from '../../components/Widgets/BrandGrid';
import ContactDetails from '../../components/Widgets/ContactDetails';
import MapEmbed from '../../components/Widgets/MapEmbed';
import SubscribeForm from '../../components/Widgets/SubscribeForm';
import ContactForm from '../../components/ContactForm/ContactForm';
import { useSite } from '../../hooks/useSite';
import useSeo from '../../hooks/useSeo';

/**
 * Renders a CMS page with its template. Layout lives in the page HTML (two-column rows from the
 * old site), and React widgets are mounted into placeholders such as <div data-widget="map">.
 */
export default function PageView({ page }) {
  const { settings } = useSite();
  useSeo({
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    image: page.seo?.og_image || page.featured_media?.url,
    noindex: page.seo?.noindex,
    canonical: page.seo?.canonical_url || undefined,
  });

  if (page.template === 'home') return <Navigate to="/" replace />;
  if (page.template === 'blog') return <Navigate to="/blog/" replace />;

  const widgets = {
    'contact-details': <ContactDetails />,
    subscribe: <SubscribeForm />,
    map: <MapEmbed />,
    brands: <BrandGrid brands={page.brands || []} />,
    'contact-form': settings.contact_form_enabled ? <ContactForm /> : null,
  };

  const hasContactForm = page.template === 'contact' && settings.contact_form_enabled && !(page.content || '').includes('data-widget="contact-form"');

  return (
    <div className={`page page-${page.template} page-${page.slug}`}>
      <div className="container">
        {page.featured_media && page.template === 'default' && (
          <img className="page-featured" src={page.featured_media.url} alt={page.featured_media.alt || ''} />
        )}
        {page.template === 'default' && !(page.content || '').includes('fkl-title-img') && <h1 className="page-title">{page.title}</h1>}
        <RichContent html={page.content} widgets={widgets} />
        {hasContactForm && <div className="contact-form-wrap"><ContactForm /></div>}
      </div>
    </div>
  );
}
