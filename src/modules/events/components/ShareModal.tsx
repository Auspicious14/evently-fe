import React from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventUrl,
}) => {
  const text = `Check out "${eventTitle}" on EventNaija!`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(eventUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + eventUrl)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(eventUrl);
    toast.success('Link copied to clipboard!');
    onClose();
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    toast.success(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold">Share Event</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <p className="text-sm text-muted-foreground">
            Share this event with your network
          </p>

          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-16 gap-1 text-xs font-medium"
              onClick={() => handleShare('twitter')}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-16 gap-1 text-xs font-medium"
              onClick={() => handleShare('linkedin')}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-16 gap-1 text-xs font-medium"
              onClick={() => handleShare('facebook')}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex flex-col h-16 gap-1 text-xs font-medium"
              onClick={() => handleShare('whatsapp')}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.263c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297C11.416 0 4.963 6.453 4.963 14.406c0 2.626.704 5.193 2.043 7.426l-1.288 4.705 4.825-1.265a10.07 10.07 0 004.842 1.235c7.953 0 14.406-6.453 14.406-14.406 0-3.853-1.523-7.344-3.993-9.92"/>
              </svg>
              WhatsApp
            </Button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={eventUrl}
              readOnly
              className="flex-1 text-sm bg-transparent outline-none select-all"
            />
            <Button size="sm" onClick={copyLink}>
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
