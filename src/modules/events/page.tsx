"use client";

import React from 'react';
import { useEvents } from './context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { IEvent } from './model';
import Link from 'next/link';

const SearchBar = () => (
  <div className="mt-8 bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
    <input type="text" placeholder="Search events..." className="flex-grow w-full md:w-auto p-3 border border-gray-300 rounded-md" />
    <select className="w-full md:w-auto p-3 border border-gray-300 rounded-md">
      <option>Category</option>
    </select>
    <select className="w-full md:w-auto p-3 border border-gray-300 rounded-md">
      <option>Location</option>
    </select>
    <Button variant="primary" size="lg" className="w-full md:w-auto">Search</Button>
  </div>
);

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

const HomePageContent = () => {
  const { events, loading, error } = useEvents();

  return (
    <>
      <section
        className="bg-cover bg-center text-white py-24 px-4"
        style={{ backgroundImage: "url('/hero-background.png')" }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Don't miss out on Nigeria's <br /> Vibrant Tech Scene
          </h1>
          <p className="mt-4 text-lg">
            Your one-stop platform for all tech events, from local meetups to global conferences.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Events</h2>
            <Link href="/events" className="text-blue-600 font-semibold hover:underline">
              View all &rarr;
            </Link>
        </div>

        {loading && <p className="text-center">Loading events...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.slice(0, 4).map((event: IEvent) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <HomePageContent />
      <Footer />
    </div>
  );
};

export default HomePage;
