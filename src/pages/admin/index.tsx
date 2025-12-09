import { useEffect, ElementType } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Check,
  X,
  Users,
  BarChart2,
  ThumbsUp,
  Flag,
} from "lucide-react";
import { useAdmin } from "@/modules/admin/context";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import AuthGuard from "@/components/AuthGuard";

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: ElementType;
}) => (
  <Card className="p-4 md:p-6">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl md:text-3xl font-bold">{value}</div>
      </div>
    </div>
  </Card>
);

const AdminDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { stats, loading: adminLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Platform Overview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Events"
            value={stats?.totalEvents ?? 0}
            icon={FileText}
          />
          <StatCard
            title="Pending Events"
            value={stats?.pendingEvents ?? 0}
            icon={FileText}
          />
          <StatCard
            title="Approved Events"
            value={stats?.approvedEvents ?? 0}
            icon={Check}
          />
          <StatCard
            title="Rejected Events"
            value={stats?.rejectedEvents ?? 0}
            icon={X}
          />
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
          />
          <StatCard
            title="Total Event Views"
            value={stats?.totalEventViews ?? 0}
            icon={BarChart2}
          />
          <StatCard
            title="Total Upvotes"
            value={stats?.totalUpvotes ?? 0}
            icon={ThumbsUp}
          />
          <StatCard
            title="Total Flags"
            value={stats?.totalFlags ?? 0}
            icon={Flag}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminDashboard = () => {
  return (
    <AuthGuard>
      <AdminDashboardPage />
    </AuthGuard>
  );
};

export default AdminDashboard;
