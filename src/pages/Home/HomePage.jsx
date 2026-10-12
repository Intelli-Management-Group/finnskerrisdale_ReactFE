import RichContent from '../../components/Common/RichContent';
import Loader from '../../components/Common/Loader';
import ErrorMessage from '../../components/Common/ErrorMessage';
import useApi from '../../hooks/useApi';
import useSeo from '../../hooks/useSeo';
import { api } from '../../services/api';

export default function HomePage() {
  const { data: page, loading, error } = useApi(() => api.page('home'), 'home');
  useSeo({ title: page ? page.seo?.title || 'Home' : undefined, description: page?.seo?.description, image: page?.seo?.og_image });

  if (loading) return <Loader />;
  if (error) return <div className="container"><ErrorMessage error={error} /></div>;

  return (
    <div className="page page-home">
      <div className="container">
        <RichContent html={page.content} className="home-content" />
      </div>
    </div>
  );
}
