"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventForm from "./components/EventForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const SubmitPageContent = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Submit New Event</h1>
        <p className="mt-4 text-lg text-gray-600">
          Got an event you'd like to share? Fill out the form below.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <EventForm />
      </div>
    </main>
  );
};

const SubmitPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow">
        <SubmitPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default SubmitPage;
