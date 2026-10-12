import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/Common/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="site">
      <a className="skip-link" href="#content">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="content" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
