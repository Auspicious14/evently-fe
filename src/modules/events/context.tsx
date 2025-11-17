"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { IEvent, Category } from "./model";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

interface IEventFilters {
  search: string;
  location: string;
  category: Category | "";
  dateFrom: string;
  dateTo: string;
  status: string;
  eventStatus: 'upcoming' | 'past' | 'ongoing' | '';
}

interface IEventsContext {
  events: IEvent[];
  loading: boolean;
  error: string | null;
  filters: IEventFilters;
  setFilters: (newFilters: Partial<IEventFilters>) => void;
  refetchEvents: () => void;
  fetchEvents: () => void;
  loadMore: () => void;
  hasMore: boolean;
  getEvent: (id: string) => Promise<IEvent & { hasUpvoted?: boolean }>;
  upvoteEvent: (id: string) => Promise<void>;
  removeUpvoteEvent: (id: string) => Promise<void>;
  flagEvent: (id: string) => Promise<void>;
  fetchUpcomingEvents: () => void;
  fetchPastEvents: () => void;
  fetchOngoingEvents: () => void;
}

const EventsContext = createContext<IEventsContext | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IEventFilters>({
    search: "",
    location: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    eventStatus: "",
  });
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchEvents = useCallback(async (append: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const currentSkip = append ? skip : 0;
      const apiFilters = {
        ...(filters.search && { title: filters.search }),
        ...(filters.location && { location: filters.location }),
        ...(filters.category && { category: filters.category }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.status && { status: filters.status }),
        ...(filters.eventStatus && { eventStatus: filters.eventStatus }),
        limit,
        skip: currentSkip,
      };

      const { data } = await apiClient.get<{
        data: IEvent[];
        total: number;
      }>("/events", { params: apiFilters });

      setEvents((prev) => (append ? [...prev, ...data.data] : data.data));
      setHasMore(currentSkip + data.data.length < data.total);
      
      if (!append) {
        setSkip(data.data.length);
      } else {
        setSkip(currentSkip + data.data.length);
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "Failed to fetch events.";
      setError(errorMessage);
      console.error('Fetch events error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, skip, limit]);

  const handleSetFilters = useCallback(
    (newFilters: Partial<IEventFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
      setSkip(0);
      setEvents([]);
      setHasMore(true);
    },
    []
  );

  const refetchEvents = useCallback(() => {
    setSkip(0);
    setEvents([]);
    setHasMore(true);
    fetchEvents(false);
  }, [fetchEvents]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchEvents(true);
    }
  }, [loading, hasMore, fetchEvents]);

  const getEvent = useCallback(async (id: string): Promise<IEvent & { hasUpvoted?: boolean }> => {
    try {
      const { data } = await apiClient.get(`/events/${id}`);
      return data.data ? data.data : data;
    } catch (error: any) {
      throw error;
    }
  }, []);

  const upvoteEvent = useCallback(async (id: string) => {
    try {
      await apiClient.patch(`/events/${id}/upvote`);
    } catch (error: any) {
      if (error.message?.includes('already upvoted')) {
        toast.info('You have already upvoted this event');
      }
      throw error;
    }
  }, []);

  const removeUpvoteEvent = useCallback(async (id: string) => {
    try {
      await apiClient.delete(`/events/${id}/upvote`);
    } catch (error: any) {
      if (error.message?.includes('not upvoted')) {
        toast.info('You have not upvoted this event');
      }
      throw error;
    }
  }, []);

  const flagEvent = useCallback(async (id: string) => {
    try {
      await apiClient.patch(`/events/${id}/flag`);
    } catch (error: any) {
      throw error;
    }
  }, []);

  const fetchUpcomingEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await apiClient.get<{
        data: IEvent[];
        total: number;
      }>("/events/upcoming", { params: { limit: 20, skip: 0 } });

      setEvents(data.data);
      setHasMore(data.data.length < data.total);
      setSkip(data.data.length);
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to fetch upcoming events.";
      setError(errorMessage);
      console.error('Fetch upcoming events error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPastEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await apiClient.get<{
        data: IEvent[];
        total: number;
      }>("/events/past", { params: { limit: 20, skip: 0 } });

      setEvents(data.data);
      setHasMore(data.data.length < data.total);
      setSkip(data.data.length);
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to fetch past events.";
      setError(errorMessage);
      console.error('Fetch past events error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOngoingEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await apiClient.get<{
        data: IEvent[];
        total: number;
      }>("/events/ongoing", { params: { limit: 20, skip: 0 } });

      setEvents(data.data);
      setHasMore(data.data.length < data.total);
      setSkip(data.data.length);
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to fetch ongoing events.";
      setError(errorMessage);
      console.error('Fetch ongoing events error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    events,
    loading,
    error,
    filters,
    setFilters: handleSetFilters,
    fetchEvents,
    refetchEvents,
    loadMore,
    hasMore,
    getEvent,
    upvoteEvent,
    removeUpvoteEvent,
    flagEvent,
    fetchUpcomingEvents,
    fetchPastEvents,
    fetchOngoingEvents,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
