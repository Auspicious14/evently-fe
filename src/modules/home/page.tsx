"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { Search, Upload, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useEvents } from '@/modules/events/context';
import { useState, useEffect } from 'react';
import { IEvent } from '../events/model';

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    AI: 'gradient-ai',
    Fintech: 'gradient-fintech',
    Startup: 'gradient-startup',
    Coding: 'gradient-coding',
  };
  return gradients[category] || 'gradient-default';
};

export const LandingPage = () => {
  const { events, fetchEvents, loading } = useEvents();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchEvents();
  }, []);

  
  const filteredEvents = (
    activeTab === 'All'
      ? events
      : events.filter((event) => event.category === activeTab)
  ).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Discover Nigeria's Hottest Tech Events
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Your central hub for conferences, workshops, and hackathons across Nigeria's vibrant tech scene.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/events">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                      Browse Events
                    </Button>
                  </Link>
                  <Link href="/submit">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Submit Event
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Events Listed</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-primary">20k+</div>
                    <div className="text-xs text-muted-foreground">Community Members</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-xs text-muted-foreground">Cities Covered</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl aspect-square md:aspect-auto md:h-96 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-xl font-semibold">Tech Community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <Link href="/events">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {['All', 'Conferences', 'Workshops', 'Hackathons', 'Meetups'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-white border hover:border-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-32 ${getCategoryGradient(event.category)}`}></div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        {event.category}
                      </span>
                      {event.isFree && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold mb-2 line-clamp-2">{event.title}</h3>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting started is simple. Discover your next tech event in just 3 steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Discover</h3>
                <p className="text-muted-foreground">
                  Find tech events happening across Nigeria by searching or filtering by category and location.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Register</h3>
                <p className="text-muted-foreground">
                  Easily register for events, get tickets, and add them to your calendar.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Engage</h3>
                <p className="text-muted-foreground">
                  Connect with speakers, sponsors, and fellow attendees before and after the event.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary to-green-600 text-white p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Have an event to share?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Submit your tech event and reach thousands of enthusiasts across Nigeria
              </p>
              <Link href="/submit">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Upload className="mr-2 h-5 w-5" />
                  Submit Your Event
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
    }
