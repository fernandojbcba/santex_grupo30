export interface Course {
  id: number;
  title: string;
  description: string;
  daysAndHours?: string;
  duration?: string;
  price?: number;
  imageUrl?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
}
