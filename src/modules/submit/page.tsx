"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useSubmit } from '@/modules/submit/context';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Category, NigerianStates } from '@/modules/events/model';
import { IEventInput } from '@/modules/submit/model';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import EventForm from '@/modules/submit/components/EventForm';

export const SubmitPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  

  if (authLoading || !user) {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><a href="/" className="hover:text-foreground">Home</a></li>
              <li>/</li>
              <li className="text-foreground">Submit Event</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Submit a New Event</h1>
            <p className="text-muted-foreground">
              Contribute to the tech community by sharing your event.
            </p>
          </div>
        </div>
        <EventForm />
      </main>
      <Footer />
    </div>
  );
}
