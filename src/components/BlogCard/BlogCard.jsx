import { Link } from 'react-router-dom';
import { dayMonth } from '../../utils/format';
import RichContent from '../Common/RichContent';

/**
 * One post on the blog list. The WordPress theme shows the date box, the title and the post's
 * full content (not an excerpt), so this card does the same.
 */
export default function BlogCard({ post, full = true }) {
  const { day, month } = dayMonth(post.published_at);
  return (
    <article className="blog-item">
      <div className="blog-date" aria-label={`Posted ${day} ${month}`}>
        <span className="blog-date-day">{day}</span> <span className="blog-date-month">{month}</span>
      </div>
      <div className="blog-body">
        <h3 className="blog-title">
          <Link to={post.path}>{post.title || ' '}</Link>
        </h3>
        {full && post.content ? (
          <RichContent html={post.content} />
        ) : (
          <>
            {post.cover_url && (
              <Link to={post.path} className="blog-thumb"><img src={post.cover_url} alt="" loading="lazy" /></Link>
            )}
            <p>{post.summary}</p>
            <Link to={post.path} className="read-more">Read More...</Link>
          </>
        )}
      </div>
    </article>
  );
}
