import { Link } from 'react-router-dom';
import useSeo from '../../hooks/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Page not found', noindex: true });
  return (
    <div className="page page-404">
      <div className="container">
        <h1 className="page-title">Page not found</h1>
        <p>Sorry, we couldn’t find that page. It may have moved.</p>
        <p><Link to="/">Go to the home page</Link> or read our <Link to="/blog/">latest news</Link>.</p>
      </div>
    </div>
  );
}
