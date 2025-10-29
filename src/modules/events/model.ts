export interface IEvent {
  _id: string;
  title: string;
  description?: string;
  date: string; // ISO 8601 format
  location: string;
  coordinates?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  category: Category;
  isFree: boolean;
  link?: string;
  upvotes: number;
  flags: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ISO 8601 format
  imageUrls?: string[];
}

export enum Category {
  AI = 'AI',
  Fintech = 'Fintech',
  Startup = 'Startup',
  Coding = 'Coding',
  Design = 'Design',
  Marketing = 'Marketing',
  Cybersecurity = 'Cybersecurity',
  Hardware = 'Hardware',
  Virtual = 'Virtual',
}

// A sample list of Nigerian states for filter dropdowns
export const NigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT - Abuja"
];
