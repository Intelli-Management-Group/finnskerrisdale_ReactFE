import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import ErrorMessage from '../components/Common/ErrorMessage';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import NotFoundPage from './NotFound/NotFoundPage';
import PageView from './Page/PageView';
import BlogDetailPage from './BlogDetail/BlogDetailPage';

/**
 * /{slug}/ can be a page or a post (WordPress kept both at the site root). Ask the API which.
 */
export default function SlugResolver() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(() => api.resolve(slug), slug);

  if (loading) return <Loader />;
  if (error?.status === 404) return <NotFoundPage />;
  if (error) return <div className="container"><ErrorMessage error={error} /></div>;

  if (data.type === 'redirect') {
    if (/^https?:\/\//.test(data.to)) {
      window.location.replace(data.to);
      return null;
    }
    return <Navigate to={data.to} replace />;
  }
  return data.type === 'page' ? <PageView page={data.item} /> : <BlogDetailPage post={data.item} />;
}
