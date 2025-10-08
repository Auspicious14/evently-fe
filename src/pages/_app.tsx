import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EventNaija</title>
        <meta name="description" content="Discover tech events in Nigeria" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <div className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}