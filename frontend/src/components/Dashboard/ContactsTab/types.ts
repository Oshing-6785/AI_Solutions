export interface Message {
  _id?: string;
  message: string;
  submitted_at: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
  country: string;
  messages?: Message[];
  message?: string;
  created_at?: string;
}

export interface CountryStat {
  _id: string;
  count: number;
}
