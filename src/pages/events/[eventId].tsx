import EventDetailPage from "@/modules/events/detail-page";
import { EventsProvider } from "@/modules/events/context";
import { useRouter } from "next/router";

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  if (!eventId || typeof eventId !== "string") {
    return <div>Loading...</div>;
  }

  return (
    <EventsProvider>
      <EventDetailPage eventId={eventId} />
    </EventsProvider>
  );
};

export default EventPage;
