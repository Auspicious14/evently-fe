"use client";

import { useEffect, useState } from 'react';
import { useEvents } from '@/modules/events/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, MapPin, ExternalLink, ArrowLeft, ArrowUp, Share2, Flag, ChevronLeft, ChevronRight, X } from 'lucide-react';
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

const ImageGallery = ({ images, category }: { images: string[]; category: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasImages = images && images.length > 0;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!hasImages) {
    return (
      <div className={`bg-gradient-to-br ${getCategoryGradient(category)} h-64 md:h-80 relative`}>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    );
  }

  return (
    <>
      {/* Main Image Gallery */}
      <div className="relative h-64 md:h-80 bg-gray-900 group">
        <img
          src={images[currentIndex]}
          alt={`Event image ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        />
        
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        {/* Navigation arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip - only show if more than 1 image */}
      {images.length > 1 && (
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-primary scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index !== currentIndex && (
                    <div className="absolute inset-0 bg-black/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={images[lightboxIndex]}
              alt={`Event image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {lightboxIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const EventDetailPage = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const { getEvent, upvoteEvent, removeUpvoteEvent, flagEvent } = useEvents();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarEvents, setSimilarEvents] = useState<IEvent[]>([]);
  const [upvoting, setUpvoting] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    if (_id) {
      loadEvent();
    }
  }, [_id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await getEvent(_id);
      const eventData = response;
      setEvent(eventData);
      setHasUpvoted(eventData.hasUpvoted || false);
    } catch (error: any) {
      console.error('Failed to load event:', error);
      if (!error.message) {
        toast.error('Failed to load event details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpvoteToggle = async () => {
    if (!event || upvoting) return;
    
    try {
      setUpvoting(true);
      
      if (hasUpvoted) {
        await removeUpvoteEvent(event._id);
        toast.success('Upvote removed');
        setHasUpvoted(false);
        setEvent(prev => prev ? { ...prev, upvotes: Math.max(0, (prev.upvotes || 0) - 1) } : null);
      } else {
        await upvoteEvent(event._id);
        toast.success('Event upvoted!');
        setHasUpvoted(true);
        setEvent(prev => prev ? { ...prev, upvotes: (prev.upvotes || 0) + 1 } : null);
      }
    } catch (error: any) {
      // Error handled by interceptor
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

        {/* Image Gallery / Hero Section */}
        <ImageGallery images={event.imageUrls || []} category={event.category} />

        {/* Category & Free Badge Overlay */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {event.category}
              </span>
              {event.isFree && (
                <span className="px-4 py-1.5 bg-yellow-400 rounded-full text-sm font-bold text-gray-900">
                  FREE
                </span>
              )}
              {/* Event Status Badge */}
              <Badge 
                variant={
                  event.eventStatus === 'upcoming' ? 'default' :
                  event.eventStatus === 'ongoing' ? 'secondary' :
                  'outline'
                }
                className={
                  event.eventStatus === 'past' ? 'bg-gray-100 text-gray-600 border-gray-300' : ''
                }
              >
                {event.eventStatus === 'upcoming' ? 'Upcoming' :
                 event.eventStatus === 'ongoing' ? 'Ongoing' :
                 event.pastEventLabel || 'Past'}
              </Badge>
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
                    onClick={handleUpvoteToggle}
                    disabled={upvoting}
                    className={`w-full border transition-all ${
                      hasUpvoted
                        ? 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500'
                        : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200'
                    }`}
                    size="lg"
                  >
                    {upvoting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        {hasUpvoted ? 'Removing...' : 'Upvoting...'}
                      </>
                    ) : (
                      <>
                        <ArrowUp className={`mr-2 h-5 w-5 ${hasUpvoted ? 'fill-current' : ''}`} />
                        {hasUpvoted ? 'Upvoted' : 'Upvote'} ({event.upvotes || 0})
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
