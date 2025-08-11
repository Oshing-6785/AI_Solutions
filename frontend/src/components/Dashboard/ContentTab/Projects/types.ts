export interface Project {
  _id?: string;
  icon:
    | "Brain"
    | "Zap"
    | "MessageSquare"
    | "Lightbulb"
    | "Cog"
    | "Shield"
    | "Globe"
    | "Users";
  company_name: string;
  title: string;
  description: string;
  duration:
    | "1 Month"
    | "2 Month"
    | "3 Month"
    | "4 Month"
    | "5 Month"
    | "6 Month"
    | "7 Month"
    | "8 Month"
    | "9 Month"
    | "10 Month"
    | "11 Month"
    | "1 Year"
    | "1 and Half Year"
    | "2 Years";
  team_size:
    | "1 specialists"
    | "2 specialists"
    | "3 specialists"
    | "4 specialists"
    | "5 specialists"
    | "6 specialists"
    | "7 specialists"
    | "8 specialists"
    | "9 specialists"
    | "10 specialists"
    | "11 specialists"
    | "12 specialists"
    | "13 specialists"
    | "14 specialists"
    | "15 specialists"
    | "16 specialists"
    | "17 specialists"
    | "18 specialists"
    | "19 specialists"
    | "20 specialists";
  key_results: string[];
  technologies_used: string[];
  badge?: string;
  color: "primary" | "secondary" | "accent";
  process: "Completed" | "Ongoing";
  date: string[];
  isActive?: boolean;
  created_at?: string;
  updatedAt?: string;
}
