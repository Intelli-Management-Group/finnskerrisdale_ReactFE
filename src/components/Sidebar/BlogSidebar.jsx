import { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { useSite } from '../../hooks/useSite';
import { api } from '../../services/api';
import { longDate, truncate } from '../../utils/format';
import SubscribeForm from '../Widgets/SubscribeForm';

function PostTeaserList({ posts }) {
  return (
    <ul className="post-teasers">
      {posts.map((p) => (
        <li key={p.id}>
          <span className="teaser-date">{longDate(p.published_at)}</span>
          <h4 className="teaser-title"><Link to={p.path}>{p.title || 'Untitled'}</Link></h4>
          <p className="teaser-text">{truncate(p.summary, 58)}</p>
          <Link to={p.path} className="read-more">Read More...</Link>
        </li>
      ))}
    </ul>
  );
}

export function RecentPostsWidget({ title = 'Recent Posts' }) {
  const { data } = useApi(() => api.posts({ per_page: 5 }), 'recent');
  return (
    <section className="widget">
      <h3 className="wg-title">{title}</h3>
      {data && <PostTeaserList posts={data} />}
    </section>
  );
}

/** Blog list sidebar: subscription, categories, Popular / Recent / Comments tabs (as on the WordPress theme). */
export default function BlogSidebar() {
  const { categories } = useSite();
  const [tab, setTab] = useState('recent');
  const recent = useApi(() => api.posts({ per_page: 5 }), 'recent');

  return (
    <aside className="sidebar" aria-label="Blog sidebar">
      <section className="widget">
        <SubscribeForm variant="sidebar" />
      </section>

      {categories?.length > 0 && (
        <section className="widget">
          <h3 className="wg-title">Categories</h3>
          <ul className="cat-list">
            {categories.filter((c) => c.posts_count > 0).map((c) => (
              <li key={c.id}><Link to={`/category/${c.slug}/`}>{c.name}</Link></li>
            ))}
          </ul>
        </section>
      )}

      <section className="widget widget-tabs">
        <div className="tabs" role="tablist">
          {['recent', 'comments'].map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
              {t === 'recent' ? 'Recent' : 'Comments'}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          {tab === 'recent' && recent.data && <PostTeaserList posts={recent.data} />}
          {tab === 'comments' && <p className="muted">Comments are closed.</p>}
        </div>
      </section>
    </aside>
  );
}
