import EventsListingPage from "@/modules/events/listing-page";
import { EventsProvider } from "@/modules/events/context";

const EventsPage = () => {
  return (
    <EventsProvider>
      <EventsListingPage />
    </EventsProvider>
  );
};

export default EventsPage;
