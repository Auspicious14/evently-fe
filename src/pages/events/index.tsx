import { EventsPage } from "@/modules/events/page"
import { EventsProvider } from "@/modules/events/context"

const Events = () => {
  return (
    <EventsProvider>
      <EventsPage />
    </EventsProvider>
  )
}

export default Events
