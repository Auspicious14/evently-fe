"use client";

import React, { useState } from 'react';
import { useEvents } from './context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from './components/EventCard';
import FilterBar from './components/FilterBar';
import Map from '@/components/Map';
import { Button } from '@/components/ui/Button';
import { IEvent } from './model';

const EventsPageContent = () => {
  const { events, loading, error, loadMore, hasMore } = useEvents();
  const [showMap, setShowMap] = useState(false);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="relative h-96 flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/EventNaija-logo.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Discover Nigeria's Tech Scene
          </h1>
          <p className="mt-4 text-lg text-white">
            Your ultimate guide to tech events, workshops, and meetups across the nation.
          </p>
          <Button className="mt-8">Explore Events</Button>
        </div>
      </section>

      <div className="my-8">
        <FilterBar />
      </div>

      <Button onClick={() => setShowMap(!showMap)} className="mb-4">
        {showMap ? 'Hide Map' : 'Show Map'}
      </Button>

      {showMap && <Map events={events} />}

      {loading && <p className="text-center">Loading events...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event: IEvent) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No events found. Try adjusting your filters.
            </p>
          )}
        </div>
      )}
      {!loading && hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} disabled={loading}>
            Load More
          </Button>
        </div>
      )}
    </main>
  );
};

const EventsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <EventsPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;