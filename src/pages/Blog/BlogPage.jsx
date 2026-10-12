import { useParams, useSearchParams } from 'react-router-dom';
import BlogList from '../../components/BlogList/BlogList';
import BlogSidebar from '../../components/Sidebar/BlogSidebar';
import Pagination from '../../components/Common/Pagination';
import Loader from '../../components/Common/Loader';
import ErrorMessage from '../../components/Common/ErrorMessage';
import useApi from '../../hooks/useApi';
import useSeo from '../../hooks/useSeo';
import { useSite } from '../../hooks/useSite';
import { api } from '../../services/api';
import NotFoundPage from '../NotFound/NotFoundPage';

export default function BlogPage() {
  const { page: pageParam, category: catParam, tag = '' } = useParams();
  const [search] = useSearchParams();
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
  const category = catParam || search.get('category') || '';
  const { settings, categories } = useSite();
  const params = { page, with_content: 1, ...(category ? { category } : {}), ...(tag ? { tag } : {}) };
  const { data, meta, loading, error } = useApi(() => api.posts(params), JSON.stringify(params));
  const catName = categories?.find((c) => c.slug === category)?.name || (category && !categories?.length ? category : undefined);
  const base = category ? `/category/${category}/` : tag ? `/tag/${tag}/` : '/blog/';
  const archiveTitle = catName ? `Category: ${catName}` : tag ? `Tag: ${tag.replace(/-/g, ' ')}` : '';

  useSeo({
    title: `${catName || (tag ? tag.replace(/-/g, ' ') : 'Blog')}${page > 1 ? ` - Page ${page}` : ''}`,
    description: settings.tagline,
    noindex: page > 1 || !!tag,
    canonical: `${window.location.origin}${base}`,
  });

  if (!loading && meta && page > Math.max(1, meta.last_page)) return <NotFoundPage />;

  const hrefFor = (p) => (p === 1 ? base : `${base}page/${p}/`);

  return (
    <div className="page page-blog">
      <div className="container row-layout">
        <div className="col-main">
          {archiveTitle && <h1 className="archive-title">{archiveTitle}</h1>}
          {loading && <Loader />}
          {error && <ErrorMessage error={error} />}
          {data && <BlogList posts={data} />}
          {meta && <Pagination current={meta.current_page} last={meta.last_page} hrefFor={hrefFor} />}
        </div>
        <div className="col-side">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}
