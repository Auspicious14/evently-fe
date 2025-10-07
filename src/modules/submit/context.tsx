"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IEventInput } from './model';
import { apiClient } from '@/lib/api';

// Define the shape of the context value
interface ISubmitContext {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  submitEvent: (eventData: IEventInput) => Promise<void>;
  resetState: () => void;
}

const SubmitContext = createContext<ISubmitContext | null>(null);

export const SubmitProvider = ({ children }: { children: ReactNode }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitEvent = useCallback(async (eventData: IEventInput) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await apiClient.post('/events', eventData);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  }, []);

  const value = {
    isSubmitting,
    error,
    success,
    submitEvent,
    resetState,
  };

  return (
    <SubmitContext.Provider value={value}>
      {children}
    </SubmitContext.Provider>
  );
};

export const useSubmit = () => {
  const context = useContext(SubmitContext);
  if (!context) {
    throw new Error('useSubmit must be used within a SubmitProvider');
  }
  return context;
};