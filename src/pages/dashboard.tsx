import { DashboardPage } from "@/modules/dashboard/page"
import AuthGuard from "@/components/AuthGuard"

const Dashboard = () => {
  return (
    <AuthGuard>
     <DashboardPage />
    </AuthGuard>
  )
}

export default Dashboard
