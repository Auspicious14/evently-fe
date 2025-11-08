import { DashboardPage } from "@/modules/dashboard/page"
import AuthGuard from "@/components/AuthGuard"
import { DashboardProvider } from "@/modules/dashboard/context"
import { EventsProvider } from "@/modules/events/context"

const Dashboard = () => {
  return (
    <AuthGuard>
      <DashboardProvider>
        <EventsProvider>
          <DashboardPage />
        </EventsProvider>
      </DashboardProvider>
    </AuthGuard>
  )
}

export default Dashboard
