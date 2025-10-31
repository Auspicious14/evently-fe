"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  LayoutDashboard, 
  Calendar, 
  ThumbsUp, 
  Settings, 
  LogOut,
  Upload,
  CheckCircle,
  FileText,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { useDashboard } from './context';
import { formatDistanceToNow } from 'date-fns';

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white border-r min-h-screen p-6 hidden md:block">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-semibold">{user?.username}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
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
          onClick={() => setActiveTab('myevents')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'myevents' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
          }`}
        >
          <Calendar className="h-5 w-5" />
          My Events
        </button>

        <button
          onClick={() => setActiveTab('upvoted')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'upvoted' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
          }`}
        >
          <ThumbsUp className="h-5 w-5" />
          Upvoted Events
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'settings' ? 'bg-green-50 text-primary font-medium' : 'hover:bg-gray-50'
          }`}
        >
          <Settings className="h-5 w-5" />
          Settings
        </button>
      </nav>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors mt-8"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </div>
  );
};

const MobileNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <nav className="flex justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-3 px-4 ${
            activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('myevents')}
          className={`flex flex-col items-center gap-1 py-3 px-4 ${
            activeTab === 'myevents' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">My Events</span>
        </button>

        <button
          onClick={() => setActiveTab('upvoted')}
          className={`flex flex-col items-center gap-1 py-3 px-4 ${
            activeTab === 'upvoted' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <ThumbsUp className="h-5 w-5" />
          <span className="text-xs">Upvoted</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 py-3 px-4 ${
            activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs">Settings</span>
        </button>
      </nav>
    </div>
  );
};

const DashboardTab = () => {
  const { user } = useAuth();
  const { stats, activities, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}!</h1>
        <p className="text-muted-foreground">Here's a summary of your activity on EventNaija.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Events Submitted</div>
            <FileText className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.eventsSubmitted ?? 0}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Events Approved</div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.eventsApproved ?? 0}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Upvotes Received</div>
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.upvotesReceived ?? 0}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Events You've Upvoted</div>
            <ThumbsUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.upvotedEvents ?? 0}</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity._id} className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg mt-1">
                {activity.type === 'upvote' && <ThumbsUp className="h-4 w-4 text-blue-600" />}
                {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-600" />}
                {activity.type === 'submission' && <Upload className="h-4 w-4 text-orange-600" />}
              </div>
              <div>
                <p className="font-medium">{activity.message}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

import { useEvents } from '../events/context';
const MyEventsTab = () => {
  const { events, setFilters, loading } = useEvents();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    if (filter === 'all') {
      setFilters({ status: '' });
    } else {
      setFilters({ status: filter });
    }
  }, [filter, setFilters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link href="/submit">
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Submit New Event
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending Review' },
          { key: 'approved', label: 'Approved' },
          { key: 'rejected', label: 'Rejected' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? 'bg-primary text-white'
                : 'bg-white border hover:border-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event._id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    event.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    event.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {event.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {event.location}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Link href={`/events/${event._id}`}>
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'myevents' && <MyEventsTab />}
        {activeTab === 'upvoted' && <div>Upvoted Events Coming Soon</div>}
        {activeTab === 'settings' && <div>Settings Coming Soon</div>}
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
                }
