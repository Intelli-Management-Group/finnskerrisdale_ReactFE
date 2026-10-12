import { Link, useParams } from 'react-router-dom';
import GalleryGrid from '../../components/Gallery/GalleryGrid';
import Loader from '../../components/Common/Loader';
import useApi from '../../hooks/useApi';
import useSeo from '../../hooks/useSeo';
import { api } from '../../services/api';
import NotFoundPage from '../NotFound/NotFoundPage';

export function GalleryListPage() {
  const { data, loading } = useApi(() => api.galleries(), 'galleries');
  useSeo({ title: 'Gallery' });
  return (
    <div className="page page-gallery">
      <div className="container">
        <h1 className="page-title">Gallery</h1>
        {loading && <Loader />}
        {data && (data.length ? (
          <ul className="gallery-list">
            {data.map((g) => (
              <li key={g.id}>
                <Link to={`/gallery/${g.slug}/`}>
                  {g.cover_url && <img src={g.cover_url} alt="" loading="lazy" />}
                  <span className="gallery-list-title">{g.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="empty">No galleries yet.</p>)}
      </div>
    </div>
  );
}

export function GalleryDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(() => api.gallery(slug), slug);
  useSeo({ title: data?.title, description: data?.description, image: data?.cover_url });
  if (loading) return <Loader />;
  if (error?.status === 404) return <NotFoundPage />;
  return (
    <div className="page page-gallery">
      <div className="container">
        <h1 className="page-title">{data.title}</h1>
        {data.description && <p className="gallery-desc">{data.description}</p>}
        <GalleryGrid photos={data.photos} />
      </div>
    </div>
  );
}
