"use client";

import React, { useEffect, useState } from 'react';
import { useEvents } from './context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { IEvent } from './model';

const EventDetailPageContent: React.FC<{ eventId: string }> = ({ eventId }) => {
  const { getEvent } = useEvents();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(eventData);
      } catch (err) {
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, getEvent]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!event) return <div className="text-center py-20">Event not found.</div>;

  const { title, description, date, location, category, isFree, link, image_url } = event;

  return (
    <main className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg h-80 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${image_url || '/placeholder-image.jpg'})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-end p-8">
            <h1 className="text-white text-4xl font-bold">{title}</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Price:</strong> {isFree ? 'Free' : 'Paid'}</p>
              </div>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-6">
                  <Button variant="primary" className="w-full">Register</Button>
                </a>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Venue</h3>
              <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center">Map Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


const EventDetailPage: React.FC<{ eventId: string }> = ({ eventId }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <EventDetailPageContent eventId={eventId} />
      <Footer />
    </div>
  );
};

export default EventDetailPage;
