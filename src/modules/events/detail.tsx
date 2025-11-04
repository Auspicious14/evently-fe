"use client";

import { useEffect, useState } from 'react';
import { useEvents } from '@/modules/events/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Calendar, MapPin, ExternalLink, ArrowLeft, ArrowUp, Share2, Flag } from 'lucide-react';
import { IEvent } from '@/modules/events/model';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    AI: 'from-purple-500 to-purple-700',
    Fintech: 'from-pink-500 to-red-500',
    Startup: 'from-blue-400 to-cyan-400',
    Coding: 'from-green-400 to-teal-400',
    Hardware: 'from-orange-400 to-yellow-400',
    Design: 'from-cyan-500 to-indigo-900',
    Marketing: 'from-teal-200 to-pink-200',
    Cybersecurity: 'from-red-500 to-orange-400',
    Virtual: 'from-indigo-600 to-blue-500',
  };
  return gradients[category] || 'from-gray-400 to-gray-600';
};

export const EventDetailPage = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const { getEvent, upvoteEvent, flagEvent } = useEvents();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarEvents, setSimilarEvents] = useState<IEvent[]>([]);
  const [upvoting, setUpvoting] = useState(false);

  useEffect(() => {
    if (_id) {
      loadEvent();
    }
  }, [_id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await getEvent(_id);
      const eventData = response.data ? response.data : response;
      setEvent(eventData);
    } catch (error: any) {
      console.error('Failed to load event:', error);
      if (!error.message) {
        toast.error('Failed to load event details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!event || upvoting) return;
    
    try {
      setUpvoting(true);
      await upvoteEvent(event._id);
      toast.success('Event upvoted!');
      // Optimistically update the UI
      setEvent(prev => prev ? { ...prev, upvotes: (prev.upvotes || 0) + 1 } : null);
    } catch (error: any) {
      // Don't show toast if error already shown by interceptor
      if (!error.message) {
        toast.error('Failed to upvote event');
      }
    } finally {
      setUpvoting(false);
    }
  };

  const handleFlag = async () => {
    if (!event) return;
    try {
      await flagEvent(event._id);
      toast.success('Event reported');
    } catch (error: any) {
      if (!error.message) {
        toast.error('Failed to report event');
      }
    }
  };

  const handleShare = (platform: string) => {
    if (!event) return;
    const url = window.location.href;
    const text = `Check out ${event.title} on EventNaija!`;
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <Button onClick={() => router.push('/events')}>Browse Events</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${getCategoryGradient(event.category)} h-64 md:h-80 relative`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-6 relative z-10">
            <div className="flex gap-3">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                {event.category}
              </span>
              {event.isFree && (
                <span className="px-4 py-1.5 bg-yellow-400 rounded-full text-sm font-bold text-gray-900">
                  FREE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Date & Time</div>
                      <div className="font-medium text-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="font-medium text-foreground">{event.location}</div>
                    </div>
                  </div>
                </div>

                {event.link && (
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 mb-6" size="lg">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Visit Event Website
                    </Button>
                  </a>
                )}
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">About this event</h2>
                {event.description ? (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{event.description}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No description available.</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#{event.category}</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#{event.location.split(',')[0]}</span>
                  {event.isFree && <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#Free</span>}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-3">Share with friends</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" onClick={copyLink} className="gap-2">
                    Copy Link
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <div className="space-y-4">
                  <Button
                    onClick={handleUpvote}
                    disabled={upvoting}
                    className="w-full bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"
                    size="lg"
                  >
                    {upvoting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
                        Upvoting...
                      </>
                    ) : (
                      <>
                        <ArrowUp className="mr-2 h-5 w-5" />
                        Upvote ({event.upvotes || 0})
                      </>
                    )}
                  </Button>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    RSVP Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Event
                  </Button>

                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium">{event.views || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upvotes</span>
                      <span className="font-medium">{event.upvotes || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Going</span>
                      <span className="font-medium">{event.goingCount || 0}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {similarEvents.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-bold mb-4">You Might Also Like</h3>
                  <div className="space-y-4">
                    {similarEvents.slice(0, 3).map((similarEvent) => (
                      <Link
                        key={similarEvent._id}
                        href={`/events/${similarEvent._id}`}
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex gap-3">
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getCategoryGradient(similarEvent.category)} flex-shrink-0`}></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">{similarEvent.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(similarEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              <button
                onClick={handleFlag}
                className="w-full text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 py-2"
              >
                <Flag className="h-4 w-4" />
                Report an issue with this event
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
