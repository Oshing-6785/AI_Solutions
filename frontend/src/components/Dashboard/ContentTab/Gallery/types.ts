export interface Gallery {
  _id?: string;
  title: string;
  category:
    | "Conference"
    | "Client_Visit"
    | "Internal_Event"
    | "Demo"
    | "Recognition"
    | "Partnership"
    | "Keynote"
    | "Milestone"
    | "Office_Launch";
  content: string;
  image_filename: string;
  image_path: string;
  image_mime?: string;
  image_size?: number;
  date: string; 
  location?: string;
  published?: boolean;
  featured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
