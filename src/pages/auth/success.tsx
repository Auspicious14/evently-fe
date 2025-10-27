import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

 const AuthSuccessPage = () => {
  const { handleAuthentication } = useAuth();
  const router = useRouter();
  const searchParams = router.query;
  const token = searchParams.token as string;

  useEffect(() => {
    if (token) {
      //localStorage.setItem("access_token", token);
     handleAuthentication(token);

      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
   <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default AuthSuccessPage
