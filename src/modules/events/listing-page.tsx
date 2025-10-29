"use client";

import React from 'react';
import { useEvents } from './context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { IEvent, Category, NigerianStates } from './model';
import Link from 'next/link';

const EventCard: React.FC<{ event: IEvent }> = ({ event }) => {
  const { id, title, date, location, isFree, image_url } = event;
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <Link href={`/events/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 h-full">
        <div className="relative">
          <img src={image_url || '/placeholder-image.jpg'} alt={title} className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-lg px-3 py-1 text-center shadow">
            <p className="font-bold text-lg">{day}</p>
            <p className="text-xs font-semibold">{month}</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate h-6">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{location}</p>
          <p className="font-semibold text-blue-600 mt-2">{isFree ? 'Free' : 'Paid'}</p>
        </div>
      </div>
    </Link>
  );
};

const FilterBar = () => {
    const { filters, setFilters, refetchEvents } = useEvents();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleApply = () => {
        refetchEvents();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <input
                    type="text"
                    name="search"
                    placeholder="Search events..."
                    value={filters.search || ''}
                    onChange={handleInputChange}
                    className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-md"
                />
                <select name="location" value={filters.location || ''} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-md">
                    <option value="">All Locations</option>
                    {NigerianStates.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                <select name="category" value={filters.category || ''} onChange={handleInputChange} className="p-3 border border-gray-300 rounded-md">
                    <option value="">All Categories</option>
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <Button onClick={handleApply} variant="primary" size="lg" className="w-full">Search</Button>
            </div>
        </div>
    );
};

const EventsListingPageContent = () => {
  const { events, loading, error, loadMore, hasMore } = useEvents();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="bg-gray-100 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold">Events</h1>
        <p className="mt-2 text-gray-600">Your ultimate guide to tech events, workshops, and meetups across the nation.</p>
      </section>
      <FilterBar />
      {loading && <p className="text-center">Loading events...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (<EventCard key={event.id} event={event} />))}
        </div>
      )}
      {!loading && hasMore && (
        <div className="text-center mt-12">
          <Button onClick={loadMore} disabled={loading} variant="primary">Load More Events</Button>
        </div>
      )}
    </main>
  );
};

const EventsListingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <EventsListingPageContent />
      <Footer />
    </div>
  );
};

export default EventsListingPage;
