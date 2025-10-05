"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { IEvent, Category } from './model';
import * as api from '@/lib/api';

// Define the shape of the filters state
interface IEventFilters {
  location: string;
  category: Category | '';
}

// Define the shape of the context value
interface IEventsContext {
  events: IEvent[];
  loading: boolean;
  error: string | null;
  filters: IEventFilters;
  setFilters: (newFilters: Partial<IEventFilters>) => void;
  refetchEvents: () => void;
}

const EventsContext = createContext<IEventsContext | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IEventFilters>({
    location: '',
    category: '',
  });

  const fetchEvents = useCallback(async (currentFilters: IEventFilters) => {
    setLoading(true);
    setError(null);
    try {
      // Prepare filters for the API call, removing empty values
      const apiFilters = {
        ...(currentFilters.location && { location: currentFilters.location }),
        ...(currentFilters.category && { category: currentFilters.category }),
      };
      const fetchedEvents: IEvent[] = await api.getEvents(apiFilters);
      setEvents(fetchedEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch events.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch events on initial component mount
  useEffect(() => {
    fetchEvents(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const handleSetFilters = useCallback((newFilters: Partial<IEventFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchEvents(updatedFilters);
  }, [filters, fetchEvents]);

  const refetchEvents = useCallback(() => {
    fetchEvents(filters);
  }, [filters, fetchEvents]);

  const value = {
    events,
    loading,
    error,
    filters,
    setFilters: handleSetFilters,
    refetchEvents,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};