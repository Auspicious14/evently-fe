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

export const SubmitPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { submitEvent, isSubmitting, error, success, resetState } = useSubmit();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<IEventInput>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (success) {
      toast.success('Event submitted successfully! It will be reviewed by our team.');
      reset();
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  }, [success, reset, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  const onSubmit = (data: IEventInput) => {
    const submissionData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
    submitEvent(submissionData);
  };

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

          {/* Form Card */}
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Event Title
                </label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Enter the name of your event"
                  className="h-12"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Event Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Event Description
                </label>
                <div className="border rounded-lg">
                  <div className="flex gap-2 p-2 border-b bg-gray-50">
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <em>I</em>
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      <u>U</u>
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded">
                      ≡
                    </button>
                  </div>
                  <textarea
                    id="description"
                    {...register('description')}
                    placeholder="Provide a detailed description of your event..."
                    rows={6}
                    className="w-full p-4 resize-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time and Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">
                    Date & Time
                  </label>
                  <Input
                    id="date"
                    type="datetime-local"
                    {...register('date', { required: 'Date is required' })}
                    className="h-12"
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: 'Location is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="location" className="h-12">
                          <SelectValue placeholder="e.g., Lagos, Nigeria" />
                        </SelectTrigger>
                        <SelectContent>
                          {NigerianStates.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Category and Event Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="category" className="h-12">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Category).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Type
                  </label>
                  <div className="grid grid-cols-2 gap-3 h-12">
                    <Controller
                      name="isFree"
                      control={control}
                      defaultValue={true}
                      render={({ field }) => (
                        <>
                          <button
                            type="button"
                            onClick={() => field.onChange(true)}
                            className={`h-full rounded-lg border-2 font-medium transition-colors ${
                              field.value
                                ? 'bg-primary text-white border-primary'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            In-person
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange(false)}
                            className={`h-full rounded-lg border-2 font-medium transition-colors ${
                              !field.value
                                ? 'bg-primary text-white border-primary'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            Online
                          </button>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Event Link */}
              <div>
                <label htmlFor="link" className="block text-sm font-medium mb-2">
                  Event Link
                </label>
                <Input
                  id="link"
                  type="url"
                  {...register('link')}
                  placeholder="https://example.com"
                  className="h-12"
                />
              </div>

              {/* Event Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Image
                </label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload <span className="text-muted-foreground">or drag and drop</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                  size="lg"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Preview
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
