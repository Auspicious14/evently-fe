"use client";

import { useForm, Controller } from 'react-hook-form';
import { useSubmit } from '../context';
import { IEventInput } from '../model';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Category, NigerianStates } from '@/modules/events/model';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';


const EventForm = () => {
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

  const onSubmit = (data: IEventInput) => {
    const submissionData = {
      ...data,
      date: new Date(data.date).toISOString(),
    };
    submitEvent(submissionData);
  };

  useEffect(() => {
    if (success) reset();
  }, [success, reset]);

  useEffect(() => {
    return () => resetState();
  }, [resetState]);

  if (success) {
    return (
      <div className="text-center bg-white p-12 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-green-600">Event Submitted Successfully!</h3>
        <p className="text-gray-600 mt-2">Your event is under review. Thank you for your contribution!</p>
        <Button onClick={resetState} className="mt-6" variant="primary">
          Submit Another Event
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Event Title"
          id="title"
          placeholder="Enter the name of your event"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
        <Input
          label="Description"
          id="description"
          placeholder="Briefly describe the event"
          {...register('description')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select a category..." /></SelectTrigger>
                  <SelectContent>
                    {Object.values(Category).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select a location..." /></SelectTrigger>
                  <SelectContent>
                    {NigerianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date"
            id="date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            error={errors.date?.message}
          />
          <Controller
              name="isFree"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price</label>
                  <Select onValueChange={(value) => field.onChange(value === 'true')} value={String(field.value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Free</SelectItem>
                      <SelectItem value="false">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
          />
        </div>
        <Input
          label="Event Website or Link"
          id="link"
          type="url"
          placeholder="https://example.com"
          {...register('link')}
        />
        {error && <p className="text-sm font-medium text-red-500 text-center">{error}</p>}
        <div className="text-right">
          <Button type="submit" disabled={!isValid || isSubmitting} variant="primary">
            {isSubmitting ? 'Submitting...' : 'Submit Event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
