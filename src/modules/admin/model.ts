export interface IAdminStatsOverview {
  totalEvents: number;
  pendingEvents: number;
  approvedEvents: number;
  rejectedEvents: number;
  totalUsers: number;
  totalEventViews: number;
  totalUpvotes: number;
  totalFlags: number;
}

export interface IAdminEvent {
  eventId: string;
  title: string;
  submitter: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  upvotes: number;
  views: number;
  flags: number;
  createdAt: string;
}
