import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { EventsProvider } from '@/modules/events/context';
import { SubmitProvider } from '@/modules/submit/context';
import { DashboardProvider } from '@/modules/dashboard/context';
import { AdminProvider } from '@/modules/admin/context';
import { ToastProvider } from '@/components/ToastProvider';
import { NotificationsProvider } from '@/modules/notifications/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <EventsProvider>
        <SubmitProvider>
          <DashboardProvider>
            <AdminProvider>
              <NotificationsProvider>
                <ToastProvider />
                <Component {...pageProps} />
              </NotificationsProvider>
            </AdminProvider>
          </DashboardProvider>
        </SubmitProvider>
      </EventsProvider>
    </AuthProvider>
  );
}
