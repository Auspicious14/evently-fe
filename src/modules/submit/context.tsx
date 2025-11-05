"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

interface ISubmitContext {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  submitEvent: (formData: FormData) => Promise<void>;
  resetState: () => void;
}

const SubmitContext = createContext<ISubmitContext | null>(null);

export const SubmitProvider = ({ children }: { children: ReactNode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitEvent = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiClient.post("/events", formData, {
        //headers: {
         // "Content-Type": "multipart/form-data",
        //},
        //transformRequest: [(data) => data],
      });

      if (response.data && response.data.success) {
        setSuccess(true);
      } else {
        throw new Error("Failed to submit event");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <SubmitContext.Provider
      value={{ isSubmitting, error, success, submitEvent, resetState }}
    >
      {children}
    </SubmitContext.Provider>
  );
};

export const useSubmit = () => {
  const context = useContext(SubmitContext);
  if (!context) {
    throw new Error("useSubmit must be used within a SubmitProvider");
  }
  return context;
};
