import { LandingPage } from "@/modules/home/page";
import { EventsProvider } from "@/modules/events/context";

const HomePage = () => {
  return (
    <EventsProvider>
      <LandingPage />
    </EventsProvider>
  );
};

export default HomePage;
