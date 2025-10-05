import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
      <Component {...pageProps} />
    </div>
  );
}