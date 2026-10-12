import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Common/Breadcrumb';
import RichContent from '../../components/Common/RichContent';
import { RecentPostsWidget } from '../../components/Sidebar/BlogSidebar';
import GalleryGrid from '../../components/Gallery/GalleryGrid';
import useSeo from '../../hooks/useSeo';

export default function BlogDetailPage({ post }) {
  const category = post.categories?.[0];
  useSeo({
    title: post.seo?.title || post.title || '',
    description: post.seo?.description || post.summary,
    image: post.seo?.og_image || post.cover_url,
    type: 'article',
    noindex: post.seo?.noindex,
    canonical: post.seo?.canonical_url || undefined,
  });

  return (
    <div className="page page-single">
      <div className="container row-layout">
        <article className="col-main single-post">
          <h1 className="entry-title">{post.title}</h1>
          <Breadcrumb
            items={[
              ...(category ? [{ label: category.name, to: `/category/${category.slug}/` }] : []),
              { label: post.title || 'Untitled' },
            ]}
          />
          {post.featured_media && !(post.content || '').includes(post.featured_media.url) && (
            <img className="post-featured" src={post.featured_media.url} alt={post.featured_media.alt || ''} />
          )}
          <RichContent html={post.content} />
          {post.images?.length > 0 && <GalleryGrid photos={post.images} />}

          <nav className="post-nav" aria-label="More posts">
            {post.previous ? <Link className="post-nav-prev" to={post.previous.path}>Previous Post</Link> : <span />}
            {post.next ? <Link className="post-nav-next" to={post.next.path}>Next Post</Link> : <span />}
          </nav>
        </article>
        <div className="col-side">
          <aside className="sidebar"><RecentPostsWidget /></aside>
        </div>
      </div>
    </div>
  );
}
