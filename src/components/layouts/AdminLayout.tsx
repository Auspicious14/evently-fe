import { useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  Settings as SettingsIcon,
  Menu,
} from "lucide-react";
import { useAdmin } from "@/modules/admin/context";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading: authLoading } = useAuth();
  const { stats } = useAdmin();
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // We can handle auth check here or in a higher level guard
  // Ideally, pages using this layout are already wrapped in AuthGuard or similar check

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {stats && stats.pendingEvents > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            showMobileMenu ? "block" : "hidden"
          } md:block w-64 bg-white border-r p-6 fixed md:sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto z-30`}
        >
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2">
              Welcome, {user?.username}!
            </h2>
            <p className="text-sm text-muted-foreground">Platform overview</p>
          </div>

          <nav className="space-y-1">
            <Link href="/admin">
              <span
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive("/admin")
                    ? "bg-green-50 text-primary font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </span>
            </Link>

            <Link href="/admin/events">
              <span
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive("/admin/events") ||
                  router.pathname.startsWith("/admin/events")
                    ? "bg-green-50 text-primary font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <FileText className="h-5 w-5" />
                Events
              </span>
            </Link>

            <Link href="/admin/analytics">
              <span
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive("/admin/analytics")
                    ? "bg-green-50 text-primary font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <TrendingUp className="h-5 w-5" />
                Analytics
              </span>
            </Link>

            <Link href="/admin/settings">
              <span
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive("/admin/settings")
                    ? "bg-green-50 text-primary font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <SettingsIcon className="h-5 w-5" />
                Settings
              </span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};
