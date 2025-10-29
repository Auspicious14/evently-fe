
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '@/context/AuthContext';

export default function AuthSuccessPage() {
  const { handleAuthentication } = useAuth();
   const router = useRouter();
  const searchParams = router.query;
  const token = searchParams.token as string;

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      handleAuthentication(token);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      router.push('/login');
    }
  }, [searchParams, router, handleAuthentication]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
