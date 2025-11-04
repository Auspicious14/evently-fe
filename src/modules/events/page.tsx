"use client";

import React, { useState } from 'react';
import { useEvents } from '@/modules/events/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Calendar, MapPin, ArrowUp, Share2, Filter } from 'lucide-react';
import Link from 'next/link';
import { Category } from '@/modules/events/model';
import { toast } from 'sonner';
import { ShareModal } from '@/modules/events/components/ShareModal'

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    AI: 'gradient-ai',
    Fintech: 'gradient-fintech',
    Startup: 'gradient-startup',
    Coding: 'gradient-coding',
    Hardware: 'gradient-hardware',
    Design: 'gradient-design',
    Marketing: 'gradient-marketing',
    Cybersecurity: 'gradient-cybersecurity',
    Virtual: 'gradient-virtual',
  };
  return gradients[category] || 'gradient-default';
};

export const EventsPage = () => {
  const { events, loading, error, loadMore, hasMore, filters, setFilters, upvoteEvent, removeUpvoteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [upvotingStates, setUpvotingStates] = useState<Record<string, boolean>>({});
  const [upvotedEvents, setUpvotedEvents] = useState<Record<string, boolean>>({});
  const [shareModalOpen, setShareModalOpen] = useState<{show: boolean, _id?: any>({show: false });
  const currentEvent = events.find(e => e._id === shareModalOpen._id);
const eventUrl = currentEvent ? `${window.location.origin}/events/${currentEvent._id}` : '';


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  const handleUpvoteToggle = async (eventId: string, currentlyUpvoted: boolean) => {
    if (upvotingStates[eventId]) return;

    setUpvotingStates(prev => ({ ...prev, [eventId]: true }));

    try {
      if (currentlyUpvoted) {
        await removeUpvoteEvent(eventId);
        toast.success('Upvote removed');
        setUpvotedEvents(prev => ({ ...prev, [eventId]: false }));
      } else {
        await upvoteEvent(eventId);
        toast.success('Event upvoted!');
        setUpvotedEvents(prev => ({ ...prev, [eventId]: true }));
      }
    } catch (error: any) {
    } finally {
      setUpvotingStates(prev => ({ ...prev, [eventId]: false }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Search Section */}
        <div className="bg-white border-b sticky top-14 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search events, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 pl-4"
                  />
                </div>
              </form>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 w-11 md:hidden"
              >
                <Filter className="h-5 w-5" />
              </Button>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {events.length} events
                </span>
                <select
                  className="h-11 px-3 border rounded-md text-sm"
                  onChange={(e) => setFilters({ category: e.target.value as Category | '' })}
                  value={filters.category || ''}
                >
                  <option value="">Sort by: Date</option>
                  {Object.values(Category).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg md:hidden">
                <select
                  className="w-full h-11 px-3 border rounded-md text-sm mb-2"
                  onChange={(e) => setFilters({ category: e.target.value as Category | '' })}
                  value={filters.category || ''}
                >
                  <option value="">All Categories</option>
                  {Object.values(Category).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className="container mx-auto px-4 py-8">
          {loading && events.length === 0 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found. Try adjusting your filters.</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const isUpvoted = upvotedEvents[event._id] ?? event.hasUpvoted ?? false;
              const isUpvoting = upvotingStates[event._id] || false;

              return (
                <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Gradient Header */}
                  <div className={`h-48 ${getCategoryGradient(event.category)} flex items-end p-4`}>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        {event.category}
                      </span>
                      {event.isFree && (
                        <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-bold text-gray-900">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary">
                      <Link href={`/events/${event._id}`}>{event.title}</Link>
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {event.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {event.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleUpvoteToggle(event._id, isUpvoted)}
                        disabled={isUpvoting}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                          isUpvoted
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {isUpvoting ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        ) : (
                          <ArrowUp className={`h-4 w-4 ${isUpvoted ? 'fill-current' : ''}`} />
                        )}
                        <span className="text-sm font-medium">{event.upvotes || 0}</span>
                      </button>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setShareModalOpen({show: true, _id: event?._id})>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Link href={`/events/${event._id}`}>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Load More */}
          {!loading && hasMore && (
            <div className="text-center mt-8">
              <Button
                onClick={loadMore}
                disabled={loading}
                size="lg"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      {shareModalOpen.show && currentEvent && (
        <ShareModal
         isOpen={shareModalOpen.show}
         onClose={() => setShareModalOpen({show: false})
         eventTitle={event.title}
         eventUrl={eventUrl}
        />
      )}
    </div>
  );
}
