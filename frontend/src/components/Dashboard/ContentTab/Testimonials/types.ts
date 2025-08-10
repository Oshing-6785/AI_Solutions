export interface Testimonial {
  _id?: string;
  name: string;
  company_name: string;
  job_title?: string;
  comment: string;
  rating: number;
  submitted_at?: string;
  is_approved?: boolean;
}
