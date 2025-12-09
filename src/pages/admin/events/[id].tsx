import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import AuthGuard from "@/components/AuthGuard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  MapPin,
  User,
  Link as LinkIcon,
  Check,
  X,
  ArrowLeft,
  Clock,
  Tag,
  Share2,
  Flag,
  ThumbsUp,
  Eye,
} from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { IEvent } from "@/modules/events/model";
import Link from "next/link";
import Image from "next/image";

const AdminEventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const { data } = await apiClient.get(`/events/${id}`);
        setEvent(data.data || data);
      } catch (error) {
        toast.error("Failed to fetch event details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdateStatus = async (status: string) => {
    if (!event) return;
    try {
      await apiClient.patch(`/events/${event._id}/status`, { status });
      toast.success(`Event ${status}`);
      setEvent({ ...event, status: status as any });
    } catch (error) {
      toast.error("Failed to update event status");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!event) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-2xl font-bold">Event not found</h2>
          <Link href="/admin/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Event Details</h1>
          <div className="ml-auto flex gap-2">
            {event.status === "pending" && (
              <>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleUpdateStatus("approved")}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleUpdateStatus("rejected")}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
            {event.status !== "pending" && (
              <Badge
                variant={
                  event.status === "approved" ? "default" : "destructive"
                }
                className="text-base px-4 py-1"
              >
                {event.status.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="mb-2">
                  {event.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Posted {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4">{event.title}</h2>

              {event.imageUrls && event.imageUrls.length > 0 && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src={event.imageUrls[0]}
                    alt={event.title}
                    className="w-full h-auto object-cover max-h-96"
                  />
                </div>
              )}

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {event.description || "No description provided."}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Stats & Engagement</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold">{event.views || 0}</span>
                  <span className="text-xs text-muted-foreground">Views</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <ThumbsUp className="h-6 w-6 text-green-500 mb-2" />
                  <span className="text-2xl font-bold">
                    {event.upvotes || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">Upvotes</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Share2 className="h-6 w-6 text-purple-500 mb-2" />
                  <span className="text-2xl font-bold">
                    {event.shares || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">Shares</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Flag className="h-6 w-6 text-red-500 mb-2" />
                  <span className="text-2xl font-bold">{event.flags || 0}</span>
                  <span className="text-xs text-muted-foreground">Flags</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Event Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {event.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Type</div>
                    <div className="text-sm text-muted-foreground">
                      {event.isFree ? "Free Event" : "Paid Event"}
                    </div>
                  </div>
                </div>

                {event.link && (
                  <div className="flex items-start gap-3">
                    <LinkIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">External Link</div>
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {event.link}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Submitter Info</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">
                    User ID: {event.submitterId}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Source: {event.source || "Web"}
                  </div>
                </div>
              </div>
              {event.sourceTweetId && (
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Original Tweet</div>
                  <a
                    href={`https://twitter.com/i/web/status/${event.sourceTweetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                  >
                    View on Twitter
                    <LinkIcon className="h-3 w-3" />
                  </a>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminEventDetail = () => {
  return (
    <AuthGuard>
      <AdminEventDetailPage />
    </AuthGuard>
  );
};

export default AdminEventDetail;
