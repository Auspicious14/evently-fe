import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ToastProvider';
import { NotificationsProvider } from '@/modules/notifications/context';
import { IEvent } from '@/modules/events/model';
import { apiClient } from '@/lib/api';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ToastProvider />
        <Component {...pageProps} />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default MyApp;
