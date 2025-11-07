import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { EventsProvider } from '@/modules/events/context';
import { SubmitProvider } from '@/modules/submit/context';
import { DashboardProvider } from '@/modules/dashboard/context';
import { AdminProvider } from '@/modules/admin/context';
import { ToastProvider } from '@/components/ToastProvider';
import { NotificationsProvider } from '@/modules/notifications/context';
import { IEvent } from '@/modules/events/model';
import { apiClient } from '@/lib/api';

function MyApp({ Component, pageProps, events }: AppProps & { events: IEvent[] }) {
  return (
    <AuthProvider>
      <EventsProvider initialEvents={events}>
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

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps & { events: IEvent[] }> => {
  const ctx = await App.getInitialProps(context);
  let events: IEvent[] = [];

  try {
    const { data } = await apiClient.get<{ data: IEvent[] }>("/events", {
      params: { limit: 10, skip: 0 },
    });
    if (data.data) {
      events = data.data;
    }
  } catch (error) {
    console.error("Error fetching events in _app.tsx:", error);
  }

  return { ...ctx, events };
};

export default MyApp;
