"use client";

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Settings as SettingsIcon,
  Check,
  X,
  Eye,
  MoreVertical,
  Search,
  Menu,
  Users,
  BarChart2,
  ThumbsUp,
  Flag
} from 'lucide-react';
import { useAdmin } from './context';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';
import { IAdminEvent } from './model';

export const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { stats, events, loading: adminLoading, refetch } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'analytics' | 'settings'>('dashboard');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleUpdateStatus = async (eventId: string, status: string) => {
    try {
      await apiClient.patch(`/events/${eventId}/status`, { status });
      toast.success(`Event ${status}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update event status');
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const statusMatch = filter === 'all' || event.status === filter;
      const searchMatch = searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [events, filter, searchTerm]);

  if (authLoading || adminLoading || !user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon}: { title: string, value: number, icon: any) => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">EventNaija Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {stats && stats.pendingEvents > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${showMobileMenu ? 'block' : 'hidden'} md:block w-64 bg-white min-h-screen border-r p-6`}>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">Welcome, Admin!</h2>
            <p className="text-sm text-muted-foreground">Platform overview</p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setShowMobileMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={() => { setActiveTab('events'); setShowMobileMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'events' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <FileText className="h-5 w-5" />
              Events Management
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setShowMobileMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'analytics' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              Analytics
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setShowMobileMenu(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
              }`}
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Platform Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Events" value={stats?.totalEvents ?? 0} icon={FileText} />
                <StatCard title="Pending Events" value={stats?.pendingEvents ?? 0} icon={FileText} />
                <StatCard title="Approved Events" value={stats?.approvedEvents ?? 0} icon={Check} />
                <StatCard title="Rejected Events" value={stats?.rejectedEvents ?? 0} icon={X} />
                <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={Users} />
                <StatCard title="Total Event Views" value={stats?.totalEventViews ?? 0} icon={BarChart2} />
                <StatCard title="Total Upvotes" value={stats?.totalUpvotes ?? 0} icon={ThumbsUp} />
                <StatCard title="Total Flags" value={stats?.totalFlags ?? 0} icon={Flag} />
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Events Management</h2>
                  <p className="text-muted-foreground">Review, approve, and manage all event submissions.</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pending', label: 'Pending Review' },
                  { key: 'approved', label: 'Approved' },
                  { key: 'rejected', label: 'Rejected' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      filter === tab.key
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search events by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Events Table */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Submitter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredEvents.map((event) => (
                        <tr key={event.eventId} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium">{event.title}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
                              <span>{event.submitter.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {event.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                event.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : event.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {event.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {event.status === 'pending' && (
                                <>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => handleUpdateStatus(event.eventId, 'approved')}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => handleUpdateStatus(event.eventId, 'rejected')}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Analytics</h2>
              <p className="text-muted-foreground">Analytics coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Settings coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
