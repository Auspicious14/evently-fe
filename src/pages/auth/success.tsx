import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const AuthSuccessPage = () => {
  const router = useRouter();
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      handleAuthentication(token as string);
      router.push('/'); // Redirect to the homepage after successful login
    }
  }, [router.query, handleAuthentication, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Authenticating, please wait...</p>
    </div>
  );
};

export default AuthSuccessPage;