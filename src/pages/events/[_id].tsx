import { EventDetailPage } from "@/modules/events/detail";
import { useRouter } from "next/router";
import { EventsProvider } from "@/modules/events/context";

const EventDetail = () => {
  const router = useRouter();
  const { _id } = router.query;

  if (!_id) {
    return null;
  }

  return (
    <EventsProvider>
      <EventDetailPage _id={_id as string} />
    </EventsProvider>
  );
};

export default EventDetail;
