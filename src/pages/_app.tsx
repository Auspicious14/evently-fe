import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ToastProvider';
import { NotificationsProvider } from '@/modules/notifications/context';
import { EventsProvider } from '@/modules/events/context';
import { DashboardProvider } from '@/modules/dashboard/context';
import { SubmitProvider } from '@/modules/submit/context';
import { AdminProvider } from '@/modules/admin/context';
import ErrorBoundary from '@/components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <EventsProvider>
          <DashboardProvider>
            <SubmitProvider>
              <NotificationsProvider>
                <ToastProvider />
                <AdminProvider>
                 <Component {...pageProps} />
                </AdminProvider>
              </NotificationsProvider>
            </SubmitProvider>
          </DashboardProvider>
        </EventsProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
