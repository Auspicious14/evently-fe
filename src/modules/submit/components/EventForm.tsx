"use client";

import { useForm, Controller } from 'react-hook-form';
import { useSubmit } from '../context';
import { IEventInput } from '../model';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Category, NigerianStates } from '@/modules/events/model';
import { useEffect } from 'react';

const EventForm = () => {
  const { submitEvent, isSubmitting, error, success, resetState } = useSubmit();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<IEventInput>({
    mode: 'onChange', // Validate on change to enable/disable button
  });

  const onSubmit = (data: IEventInput) => {
    // Convert date to ISO string for backend compatibility
    const submissionData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
    submitEvent(submissionData);
  };

  useEffect(() => {
    if (success) {
      reset(); // Clear the form on successful submission
    }
  }, [success, reset]);

  // Reset the context state when the component unmounts or user navigates away
  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-600">Event Submitted!</h3>
        <p className="text-muted-foreground mt-2">Thanks! Your event is under review.</p>
        <Button onClick={resetState} className="mt-4">
          Submit Another Event
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a New Tech Event</CardTitle>
        <CardDescription>Fill out the details below to add your event to the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title">Event Title</label>
            <Input id="title" {...register('title', { required: 'Title is required' })} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description">Description (Optional)</label>
            <Input id="description" {...register('description')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date">Date</label>
              <Input id="date" type="date" {...register('date', { required: 'Date is required' })} />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>
            <div className="space-y-2">
                <label htmlFor="isFree">Ticket</label>
                <Controller
                    name="isFree"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                        <Select onValueChange={(value) => field.onChange(value === 'true')} value={String(field.value)}>
                            <SelectTrigger id="isFree"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Free</SelectItem>
                                <SelectItem value="false">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location">Location</label>
               <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="location"><SelectValue placeholder="Select a location..." /></SelectTrigger>
                    <SelectContent>
                      {NigerianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="category"><SelectValue placeholder="Select a category..." /></SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="link">Event Link (Optional)</label>
            <Input id="link" type="url" {...register('link')} placeholder="https://example.com" />
          </div>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;