import { IEvent } from '@/modules/events/model';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThumbsUp, Flag, MapPin, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface EventCardProps {
  event: IEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
        <span className="text-gray-500">Event Image</span>
        {/* Event Status Badge */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={
              event.eventStatus === 'upcoming' ? 'default' :
              event.eventStatus === 'ongoing' ? 'secondary' :
              'outline'
            }
            className={
              event.eventStatus === 'past' ? 'bg-gray-100 text-gray-600 border-gray-300' : ''
            }
          >
            {event.eventStatus === 'upcoming' ? 'Upcoming' :
             event.eventStatus === 'ongoing' ? 'Ongoing' :
             event.pastEventLabel || 'Past'}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="flex items-center pt-2">
          <Calendar className="h-4 w-4 mr-2" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Tag className="h-4 w-4 mr-2" />
          <span>{event.category}</span>
        </div>
        {event.description && <p className="mt-4 text-sm line-clamp-3">{event.description}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Upvote ({event.upvotes})
          </Button>
          <Button variant="outline" size="sm" className="text-red-500">
            <Flag className="h-4 w-4 mr-2" />
            Flag
          </Button>
        </div>
        {event.link && (
          <Button asChild>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Details
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;