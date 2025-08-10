import { TabsTrigger } from "@/components/ui/tabs";

export default function ContentTabNavigation() {
  return (
    <>
      <TabsTrigger value="home">Home</TabsTrigger>
      <TabsTrigger value="solutions">Solutions</TabsTrigger>
      <TabsTrigger value="industries">Industries</TabsTrigger>
      <TabsTrigger value="projects">Projects</TabsTrigger>
      <TabsTrigger value="gallery">Gallery</TabsTrigger>
      <TabsTrigger value="events">Events</TabsTrigger>
      <TabsTrigger value="articles">Articles</TabsTrigger>
      <TabsTrigger value="about">About</TabsTrigger>
    </>
  );
}
