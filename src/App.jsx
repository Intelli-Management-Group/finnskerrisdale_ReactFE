import { BrowserRouter } from 'react-router-dom';
import { SiteProvider } from './hooks/useSite';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <AppRoutes />
      </SiteProvider>
    </BrowserRouter>
  );
}
