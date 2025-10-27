import { useRouter } from "next/router";
import React, { useEffect } from "react";

 const AuthSuccessPage = () => {
  const router = useRouter();
  const searchParams = router.query;
  const token = searchParams.token as string;

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);

      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Authenticating...</div>;
};

export default AuthSuccessPage