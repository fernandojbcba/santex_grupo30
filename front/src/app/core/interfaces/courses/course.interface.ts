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

export interface Coursed {
  id: number;
  title: string;
  description: string;
  startCourse?:string;
  endCourse?:string;
  daysAndHours?: string;
  duration?: string;
  price?: number;
  imageUrl?: string;
  courseStateId:number;
  isPublished?: boolean;
  isDeleted?: boolean;
}