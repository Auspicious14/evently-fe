"use client";

import { useEffect, useState } from 'react';
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
  Menu
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'analytics' | 'settings'>('events');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'posted'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Pending Events', value: '12', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Approved Today', value: '5', color: 'bg-green-50 text-green-600' },
    { label: 'Rejected Today', value: '2', color: 'bg-red-50 text-red-600' },
  ];

  const events = [
    { id: 1, title: 'Lagos Tech Summit 2024', date: 'Oct 28, 2024', status: 'pending', submitter: 'Bola Ahmed' },
    { id: 2, title: 'AI in FinTech Conference', date: 'Oct 25, 2024', status: 'approved', submitter: 'Chioma Nwosu' },
    { id: 3, title: 'DevFest Abuja', date: 'Oct 22, 2024', status: 'rejected', submitter: 'Emeka Okafor' },
  ];

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
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
            <p className="text-sm text-muted-foreground">Here's a summary of your platform.</p>
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-muted-foreground">Pending Review</div>
                    <div className="text-xl font-bold">12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'events' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5" />
                Events Management
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'analytics' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                Analytics
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <SettingsIcon className="h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <Card key={i} className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </Card>
                ))}
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
                <Button className="bg-primary hover:bg-primary/90">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Submit Event
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pending', label: 'Pending Review' },
                  { key: 'approved', label: 'Approved' },
                  { key: 'rejected', label: 'Rejected' },
                  { key: 'posted', label: 'Posted to X' },
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
                  placeholder="Search events..."
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
                      {events.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium">{event.title}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {event.submitter}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {event.date}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              Conference
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
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
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
