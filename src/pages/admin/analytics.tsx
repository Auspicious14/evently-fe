import { useAdmin } from "@/modules/admin/context";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import AuthGuard from "@/components/AuthGuard";
import { Card } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminAnalyticsPage = () => {
  const { stats } = useAdmin();

  // Mock data for charts since we only have aggregate stats
  const eventStatusData = [
    { name: "Approved", value: stats?.approvedEvents || 0, color: "#22c55e" },
    { name: "Pending", value: stats?.pendingEvents || 0, color: "#eab308" },
    { name: "Rejected", value: stats?.rejectedEvents || 0, color: "#ef4444" },
  ];

  const engagementData = [
    { name: "Views", value: stats?.totalEventViews || 0 },
    { name: "Upvotes", value: stats?.totalUpvotes || 0 },
    { name: "Flags", value: stats?.totalFlags || 0 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Insights into platform performance and user engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Event Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">
              Event Status Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {eventStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Engagement Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Engagement Metrics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-blue-600 font-medium mb-2">Total Users</div>
            <div className="text-4xl font-bold text-blue-900">
              {stats?.totalUsers || 0}
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-purple-600 font-medium mb-2">Total Events</div>
            <div className="text-4xl font-bold text-purple-900">
              {stats?.totalEvents || 0}
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-green-600 font-medium mb-2">
              Avg. Views/Event
            </div>
            <div className="text-4xl font-bold text-green-900">
              {stats?.totalEvents
                ? Math.round((stats.totalEventViews || 0) / stats.totalEvents)
                : 0}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminAnalytics = () => {
  return (
    <AuthGuard>
      <AdminAnalyticsPage />
    </AuthGuard>
  );
};

export default AdminAnalytics;
