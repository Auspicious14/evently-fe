import { AdminDashboard } from "@/modules/admin/page"
import AuthGuard from "@/components/AuthGuard"

const Admin = () => {
  return (
    <AuthGuard>
        <AdminDashboard />
    </AuthGuard>
  )
}

export default Admin
