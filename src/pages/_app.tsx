import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { EventsProvider } from '@/modules/events/context';
import { SubmitProvider } from '@/modules/submit/context';
import { DashboardProvider } from '@/modules/dashboard/context';
import { AdminProvider } from '@/modules/admin/context';
import { ToastProvider } from '@/components/ToastProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <EventsProvider>
        <SubmitProvider>
          <DashboardProvider>
            <AdminProvider>
              <ToastProvider />
              <Component {...pageProps} />
            </AdminProvider>
          </DashboardProvider>
        </SubmitProvider>
      </EventsProvider>
    </AuthProvider>
  );
}
