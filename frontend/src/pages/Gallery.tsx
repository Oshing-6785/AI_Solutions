import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Award } from "lucide-react";

const Gallery = () => {
  const galleryItems = [
    {
      title: "AI Innovation Summit 2024",
      category: "Conference",
      date: "March 2024",
      location: "London, UK",
      description: "Our CEO Dr. Sarah Mitchell presented cutting-edge AI solutions to industry leaders.",
      image: "conference-2024",
      type: "event"
    },
    {
      title: "TechCorp Factory Visit",
      category: "Client Visit",
      date: "February 2024",
      location: "Manchester, UK",
      description: "Implementation team visiting TechCorp's manufacturing facility for AI assistant deployment.",
      image: "factory-visit",
      type: "project"
    },
    {
      title: "Team Innovation Workshop",
      category: "Internal Event",
      date: "January 2024",
      location: "Sunderland Office",
      description: "Quarterly innovation workshop where our team explores new AI technologies and methodologies.",
      image: "workshop-2024",
      type: "team"
    },
    {
      title: "Healthcare AI Showcase",
      category: "Demo",
      date: "December 2023",
      location: "Edinburgh, UK",
      description: "Demonstrating our healthcare AI solutions at the National Healthcare Technology Conference.",
      image: "healthcare-demo",
      type: "demo"
    },
    {
      title: "Award Ceremony",
      category: "Recognition",
      date: "November 2023",
      location: "Birmingham, UK",
      description: "Receiving the 'Best AI Innovation' award at the UK Tech Excellence Awards.",
      image: "award-ceremony",
      type: "award"
    },
    {
      title: "University Collaboration",
      category: "Partnership",
      date: "October 2023",
      location: "Newcastle University",
      description: "Signing partnership agreement with Newcastle University for AI research collaboration.",
      image: "university-partnership",
      type: "partnership"
    },
    {
      title: "Global AI Conference",
      category: "Keynote",
      date: "September 2023",
      location: "San Francisco, USA",
      description: "International keynote presentation on the future of workplace AI at Global AI Conference.",
      image: "global-conference",
      type: "event"
    },
    {
      title: "Client Success Celebration",
      category: "Milestone",
      date: "August 2023",
      location: "Virtual Event",
      description: "Celebrating 50+ successful AI implementations with our valued clients worldwide.",
      image: "success-celebration",
      type: "milestone"
    },
    {
      title: "Sunderland Tech Hub Opening",
      category: "Office Launch",
      date: "July 2023",
      location: "Sunderland, UK",
      description: "Grand opening of our expanded headquarters in Sunderland's tech district.",
      image: "office-opening",
      type: "company"
    }
  ];

  const categories = ["All", "Conference", "Client Visit", "Demo", "Recognition", "Partnership", "Keynote", "Milestone"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Photo
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore moments from our journey - from industry conferences and client visits 
            to team achievements and milestone celebrations that define our story.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="hover:shadow-md transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Placeholder for image */}
                <div className="h-64 bg-gradient-primary flex items-center justify-center text-primary-foreground relative overflow-hidden">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {item.type === "event" && <Calendar className="h-8 w-8" />}
                      {item.type === "project" && <Users className="h-8 w-8" />}
                      {item.type === "team" && <Users className="h-8 w-8" />}
                      {item.type === "demo" && <MapPin className="h-8 w-8" />}
                      {item.type === "award" && <Award className="h-8 w-8" />}
                      {item.type === "partnership" && <Users className="h-8 w-8" />}
                      {item.type === "milestone" && <Award className="h-8 w-8" />}
                      {item.type === "company" && <MapPin className="h-8 w-8" />}
                    </div>
                    <p className="text-sm opacity-75">Photo: {item.image}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Impact in Numbers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Industry Awards</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Speaking Events</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Countries Visited</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Events Attended</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join us at upcoming events, invite us to speak at your conference, 
            or partner with us to create the next chapter in AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button variant="secondary" size="xl" className="group">
                View Upcoming Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
                Invite Us to Speak
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Gallery;