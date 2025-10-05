import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by the Nigerian Tech Community.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
          <a
            href="https://twitter.com/your-community-handle" // Placeholder link
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Join our X Community
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;