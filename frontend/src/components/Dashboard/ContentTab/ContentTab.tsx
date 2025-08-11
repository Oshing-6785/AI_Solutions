import { useState } from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import ContentTabNavigation from "./ContentTabNavigation";
import TestimonialsTab from "./Testimonials/TestimonialsTab";
import SolutionTab from "./Solutions/SolutionTab";
import IndustryTab from "./Industry/IndustryTab";
import ProjectTab from "./Projects/ProjectTab"

export default function ContentTab() {
  const [activeContentTab, setActiveContentTab] = useState("home");

  return (
    <Tabs
      value={activeContentTab}
      onValueChange={setActiveContentTab}
      className="space-y-6"
    >
      <TabsList className="grid w-full grid-cols-7">
        <ContentTabNavigation />
      </TabsList>

      {/* Home Tab: Testimonials Management */}
      <TabsContent value="home">
        <TestimonialsTab />
      </TabsContent>

      {/*Content Tab: Solutions Management */}
      <TabsContent value="solutions">
        <SolutionTab />
      </TabsContent>

      {/*Content Tab: Industry Management */}
      <TabsContent value="industries">
        <IndustryTab />
      </TabsContent>

      {/* Content Tab : Project Management */}
      <TabsContent value="projects">
        <ProjectTab />
      </TabsContent>

      {/* Other Tabs Placeholder  */}
      <TabsContent value="solutions">Solutions content here...</TabsContent>
      <TabsContent value="projects">Projects content here...</TabsContent>
      <TabsContent value="gallery">Gallery content here...</TabsContent>
      <TabsContent value="events">Events content here...</TabsContent>
      <TabsContent value="articles">Articles content here...</TabsContent>
      <TabsContent value="about">About content here...</TabsContent>
    </Tabs>
  );
}
