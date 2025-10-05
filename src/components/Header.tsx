import Link from 'next/link';
import { Button } from '@/components/ui/Button'; // I will create this component next
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Menu className="h-6 w-6" />
            <span className="font-bold inline-block">TechEventsNG</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Home
            </Link>
            <Link href="/submit" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Submit Event
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;