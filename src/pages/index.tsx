import EventsPage from "@/modules/events/page";
import { EventsProvider } from "@/modules/events/context";

// The homepage, which renders the Events module.
// We wrap it with the EventsProvider so the page and all its children have access to the event state.
const HomePage = () => {
  return (
    <EventsProvider>
      <EventsPage />
    </EventsProvider>
  );
};

export default HomePage;