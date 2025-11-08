import { AdminDashboard } from "@/modules/admin/page"
import AuthGuard from "@/components/AuthGuard"
import { AdminProvider } from "@/modules/admin/context"

const Admin = () => {
  return (
    <AuthGuard>
      <AdminProvider>
        <AdminDashboard />
      </AdminProvider>
    </AuthGuard>
  )
}

export default Admin
