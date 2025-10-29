"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useSubmit } from '../context';
import { IEventInput } from '../model';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Category, NigerianStates } from '@/modules/events/model';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';

const EventForm = () => {
  const { submitEvent, isSubmitting, error, success, resetState } = useSubmit();
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IEventInput>({
    mode: 'onChange',
    defaultValues: {
      eventType: 'in-person',
      isFree: true,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success('Event submitted successfully!');
      reset();
      setImagePreview([]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreview(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: IEventInput) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        if (value) {
          Array.from(value as FileList).forEach((file) => {
            formData.append('images', file);
          });
        }
      } else if (value !== undefined && value !== null) {
        if (key === 'date') {
          formData.append(key, new Date(value).toISOString());
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    submitEvent(formData);
  };

  return (
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
          <textarea
            id="description"
            {...register('description')}
            placeholder="Provide a detailed description of your event..."
            rows={6}
            className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
            <Controller
              name="eventType"
              control={control}
              defaultValue="in-person"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3 h-12">
                  <button
                    type="button"
                    onClick={() => field.onChange('in-person')}
                    className={`h-full rounded-lg border-2 font-medium transition-colors ${
                      field.value === 'in-person'
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    In-person
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('online')}
                    className={`h-full rounded-lg border-2 font-medium transition-colors ${
                      field.value === 'online'
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Online
                  </button>
                </div>
              )}
            />
          </div>
        </div>

        {/* Is Free and Event Link */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Ticket Type
            </label>
            <Controller
              name="isFree"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3 h-12">
                  <button
                    type="button"
                    onClick={() => field.onChange(true)}
                    className={`h-full rounded-lg border-2 font-medium transition-colors ${
                      field.value === true
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange(false)}
                    className={`h-full rounded-lg border-2 font-medium transition-colors ${
                      field.value === false
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Paid
                  </button>
                </div>
              )}
            />
          </div>

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
        </div>

        {/* Event Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Event Images (Max 5)
          </label>
          <label htmlFor="images" className="block border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium mb-1">
              Click to upload <span className="text-muted-foreground">or drag and drop</span>
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or GIF (MAX. 5MB each)
            </p>
          </label>
          <input
            id="images"
            type="file"
            {...register('images')}
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="hidden"
          />
          
          {/* Image Preview */}
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
  );
};

export default EventForm;
