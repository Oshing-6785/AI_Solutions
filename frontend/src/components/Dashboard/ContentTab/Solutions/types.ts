export interface Solution {
  _id?: string;
  icon: string; 
  title: string;
  description: string;
  features: string[];
  badge?: string
  color: "primary" | "secondary" | "accent";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
