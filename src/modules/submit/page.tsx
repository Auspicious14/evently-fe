"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventForm from './components/EventForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const SubmitPageContent = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!user) router.push('/login'); // Redirect if not authenticated
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Share a Tech Event
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Contribute to the community by adding a new event.
        </p>
      </section>

      <EventForm />
    </main>
  );
};

const SubmitPage = () => {
  // This is the top-level component for the page.
  // It ensures that the context provider wraps everything that needs access to the submit state.
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <SubmitPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default SubmitPage;