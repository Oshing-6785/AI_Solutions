import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock, Users, ExternalLink, Mic } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      title: "AI Transformation Summit 2024",
      type: "Keynote Speaker",
      date: "September 15, 2024",
      time: "09:00 - 17:00 GMT",
      location: "ExCeL London, UK",
      description: "Dr. Sarah Mitchell will deliver the opening keynote on 'The Future of Workplace AI' at this premier industry event.",
      audience: "500+ attendees",
      status: "confirmed",
      registerLink: "#",
      topics: ["Workplace AI", "Digital Transformation", "Employee Experience"]
    },
    {
      title: "TechNorth Conference",
      type: "Panel Discussion",
      date: "October 3, 2024",
      time: "14:00 - 15:30 GMT",
      location: "Manchester Central, UK",
      description: "Join our CTO James Thompson in a panel discussion about AI implementation challenges and solutions.",
      audience: "300+ attendees",
      status: "confirmed",
      registerLink: "#",
      topics: ["AI Implementation", "Technical Challenges", "Best Practices"]
    },
    {
      title: "Global AI Ethics Forum",
      type: "Workshop Leader",
      date: "October 20, 2024",
      time: "10:00 - 16:00 CET",
      location: "Amsterdam, Netherlands",
      description: "Leading a hands-on workshop on responsible AI development and ethical considerations in workplace automation.",
      audience: "100+ participants",
      status: "confirmed",
      registerLink: "#",
      topics: ["AI Ethics", "Responsible AI", "Workplace Automation"]
    },
    {
      title: "Innovation Festival Sunderland",
      type: "Host Presentation",
      date: "November 8, 2024",
      time: "11:00 - 12:00 GMT",
      location: "Sunderland, UK",
      description: "Showcasing local AI innovation and our contribution to the Sunderland tech ecosystem.",
      audience: "200+ local innovators",
      status: "hosting",
      registerLink: "#",
      topics: ["Local Innovation", "Tech Ecosystem", "AI Showcase"]
    }
  ];

  const pastEvents = [
    {
      title: "AI Innovation Summit 2024",
      date: "March 15, 2024",
      location: "London, UK",
      description: "Successful keynote presentation on AI-powered employee experience transformation.",
      outcome: "Generated 50+ qualified leads",
      type: "Keynote"
    },
    {
      title: "Healthcare AI Conference",
      date: "February 8, 2024",
      location: "Edinburgh, UK",
      description: "Demonstrated our healthcare AI solutions to medical professionals and IT leaders.",
      outcome: "3 new healthcare partnerships",
      type: "Demo"
    },
    {
      title: "Manufacturing Tech Expo",
      date: "January 20, 2024",
      location: "Birmingham, UK",
      description: "Exhibited AI solutions for manufacturing optimization and predictive maintenance.",
      outcome: "15+ manufacturing inquiries",
      type: "Exhibition"
    },
    {
      title: "Global AI Summit",
      date: "December 5, 2023",
      location: "Virtual Event",
      description: "International presentation on the future of AI in workplace transformation.",
      outcome: "1000+ global audience reach",
      type: "Virtual Keynote"
    }
  ];

  const eventTypes = [
    {
      icon: Mic,
      title: "Speaking Engagements",
      description: "Our experts regularly speak at industry conferences and events worldwide.",
      count: "50+ per year"
    },
    {
      icon: Users,
      title: "Workshops & Training",
      description: "Interactive workshops helping organizations understand and implement AI solutions.",
      count: "25+ per year"
    },
    {
      icon: MapPin,
      title: "Industry Exhibitions",
      description: "Showcasing our latest AI innovations at major technology and industry trade shows.",
      count: "15+ per year"
    },
    {
      icon: Calendar,
      title: "Client Events",
      description: "Exclusive events for clients and partners to network and learn about AI trends.",
      count: "12+ per year"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Events &
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Speaking
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us at industry conferences, workshops, and exclusive events where we share 
            insights on AI innovation and connect with forward-thinking organizations worldwide.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our team at these upcoming conferences and events. Register now to secure your spot 
              and learn about the latest in AI innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant={event.status === "hosting" ? "default" : "secondary"}
                      className={event.status === "hosting" ? "bg-gradient-primary text-primary-foreground" : ""}
                    >
                      {event.type}
                    </Badge>
                    {event.status === "hosting" && (
                      <Badge variant="outline" className="text-accent border-accent">
                        We're Hosting!
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.audience}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button variant="hero" className="flex-1 group">
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Meet Us There
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Types of Events We Participate In</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From intimate workshops to large-scale conferences, we engage with the AI community 
              in various formats to share knowledge and build connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((type, index) => (
              <Card key={index} className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                    <type.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{type.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{type.description}</p>
                  <div className="text-primary font-semibold">{type.count}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Recent Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Look back at our recent speaking engagements and the impact they've made 
              in the AI community and our business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{event.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Invite AI SOLUTIONS to Your Event
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Looking for expert speakers on AI innovation, workplace transformation, or digital evolution? 
            Our team is available for keynotes, panels, and workshops worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Request Speaker
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
                Meet Our Team
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

export default Events;