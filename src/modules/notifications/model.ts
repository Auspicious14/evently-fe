
export interface INotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: 'event_approved' | 'event_rejected' | 'event_upvoted';
  metadata: {
    eventId: string;
    eventTitle: string;
  };
}
