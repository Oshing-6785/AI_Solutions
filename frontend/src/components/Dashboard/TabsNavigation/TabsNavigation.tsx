import { TabsTrigger } from "@/components/ui/tabs";

export default function TabsNavigation() {
  return (
    <>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="contacts">Contact Inquiries</TabsTrigger>
      <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
      <TabsTrigger value="content">Content Management</TabsTrigger>
    </>
  );
}
