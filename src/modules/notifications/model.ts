export interface INotification {
  id: string; // mapped from _id
  _id?: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
  type: "event_approved" | "event_rejected" | "event_upvoted" | "event_created";
  eventId?: string;
}
