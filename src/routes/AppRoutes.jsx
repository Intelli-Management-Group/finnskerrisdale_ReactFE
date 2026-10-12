import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Common/Loader';
import HomePage from '../pages/Home/HomePage';
import SlugResolver from '../pages/SlugResolver';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

// Less-visited routes are split into their own chunks
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const GalleryListPage = lazy(() => import('../pages/Gallery/GalleryPages').then((m) => ({ default: m.GalleryListPage })));
const GalleryDetailPage = lazy(() => import('../pages/Gallery/GalleryPages').then((m) => ({ default: m.GalleryDetailPage })));

/*
 * URLs match the old WordPress site exactly:
 *   /            home
 *   /blog/       latest news (+ /blog/page/2/ …)
 *   /category/{slug}/, /tag/{slug}/  WordPress archives
 *   /{slug}/     any page (about, designer, contact) or post (e.g. /riani-s21/)
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/page/:page" element={<BlogPage />} />
          <Route path="category/:category" element={<BlogPage />} />
          <Route path="category/:category/page/:page" element={<BlogPage />} />
          <Route path="tag/:tag" element={<BlogPage />} />
          <Route path="tag/:tag/page/:page" element={<BlogPage />} />
          <Route path="gallery" element={<GalleryListPage />} />
          <Route path="gallery/:slug" element={<GalleryDetailPage />} />
          <Route path=":slug" element={<SlugResolver />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
