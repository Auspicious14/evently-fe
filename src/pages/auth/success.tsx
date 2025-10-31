
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AuthSuccessPage = () => {
  const router = useRouter();
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      handleAuthentication(token as string);
      toast.success("Authentication successful!");
      window.location.href = "/dashboard";
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
