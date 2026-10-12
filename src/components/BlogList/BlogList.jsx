import BlogCard from '../BlogCard/BlogCard';

export default function BlogList({ posts }) {
  if (!posts?.length) return <p className="empty">No posts yet.</p>;
  return (
    <div className="blog-list">
      {posts.map((p) => <BlogCard key={p.id} post={p} />)}
    </div>
  );
}
