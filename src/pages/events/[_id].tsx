import { EventDetailPage } from "@/modules/events/detail";
import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const { _id } = router.query;

  if (!_id) {
    return null;
  }

  return (  
      <EventDetailPage _id={_id as string} />
  );
};

export default EventDetail;
