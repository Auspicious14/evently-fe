"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { IEvent, Category } from "./model";
import { apiClient } from "@/lib/api";

interface IEventFilters {
  location: string;
  category: Category | "";
  dateFrom: string;
  dateTo: string;
}

interface IEventsContext {
  events: IEvent[];
  loading: boolean;
  error: string | null;
  filters: IEventFilters;
  setFilters: (newFilters: Partial<IEventFilters>) => void;
  refetchEvents: () => void;
  loadMore: () => void;
  hasMore: boolean;
  getEvent: (id: string) => Promise<IEvent>;
  upvoteEvent: (id: string) => Promise<void>;
  flagEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<IEventsContext | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IEventFilters>({
    location: "",
    category: "",
    dateFrom: "",
    dateTo: "",
  });
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchEvents = useCallback(
    async (
      currentFilters: IEventFilters,
      currentSkip: number,
      append: boolean = false
    ) => {
      setLoading(true);
      setError(null);
      try {
        const apiFilters = {
          ...(currentFilters.location && { location: currentFilters.location }),
          ...(currentFilters.category && { category: currentFilters.category }),
          ...(currentFilters.dateFrom && { dateFrom: currentFilters.dateFrom }),
          ...(currentFilters.dateTo && { dateTo: currentFilters.dateTo }),
          limit,
          skip: currentSkip,
        };
        const { data } = await apiClient.get<{
          events: IEvent[];
          total: number;
        }>("/events", { params: apiFilters });
        setEvents((prev) => (append ? [...prev, ...data.events] : data.events));
        setTotal(data.total);
        setHasMore(currentSkip + data.events.length < data.total);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch events.";
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchEvents(filters, 0);
    setSkip(0);
  }, [filters]);

  const handleSetFilters = useCallback(
    (newFilters: Partial<IEventFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      setSkip(0);
      setEvents([]);
      setHasMore(true);
    },
    [filters]
  );

  const refetchEvents = useCallback(() => {
    fetchEvents(filters, 0);
    setSkip(0);
  }, [filters, fetchEvents]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const newSkip = skip + limit;
      fetchEvents(filters, newSkip, true);
      setSkip(newSkip);
    }
  }, [loading, hasMore, skip, filters, fetchEvents, limit]);

  const getEvent = useCallback(async (id: string) => {
    const { data } = await apiClient.get<IEvent>(`/events/${id}`);
    return data;
  }, []);

  const upvoteEvent = useCallback(
    async (id: string) => {
      await apiClient.post(`/events/${id}/upvote`);
      refetchEvents();
    },
    [refetchEvents]
  );

  const flagEvent = useCallback(
    async (id: string) => {
      await apiClient.post(`/events/${id}/flag`);
      refetchEvents();
    },
    [refetchEvents]
  );

  const value = {
    events,
    loading,
    error,
    filters,
    setFilters: handleSetFilters,
    refetchEvents,
    loadMore,
    hasMore,
    getEvent,
    upvoteEvent,
    flagEvent,
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
