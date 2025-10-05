import { Category } from "@/modules/events/model";

export interface IEventInput {
  title: string;
  description?: string;
  date: string; // Should be in a format that the backend can parse, e.g., ISO string
  location: string;
  category: Category;
  isFree: boolean;
  link?: string;
}