import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, Globe, Award, Brain, Lightbulb, Shield, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible with AI technology, staying ahead of industry trends."
    },
    {
      icon: Users,
      title: "People Centered",
      description: "Our solutions are designed to enhance human capabilities and improve the workplace experience for everyone."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize data security and privacy in every solution we develop, ensuring complete client confidence."
    },
    {
      icon: Heart,
      title: "Global Impact",
      description: "Committed to making a positive difference in organizations worldwide through thoughtful AI implementation."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      bio: "15+ years in AI research and enterprise solutions. Former head of AI at TechCorp, PhD in Computer Science from Cambridge.",
      expertise: ["Strategic Leadership", "AI Research", "Enterprise Solutions"]
    },
    {
      name: "James Thompson",
      role: "Chief Technology Officer", 
      bio: "Expert in machine learning and system architecture. Led development teams at major tech companies for over 12 years.",
      expertise: ["Machine Learning", "System Architecture", "Technical Leadership"]
    },
    {
      name: "Dr. Emily Chen",
      role: "Head of AI Research",
      bio: "PhD in Artificial Intelligence, published researcher with 50+ papers. Specializes in natural language processing.",
      expertise: ["NLP", "Research & Development", "Algorithm Design"]
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Customer Success",
      bio: "10+ years in client relations and project management. Ensures successful AI implementation across all projects.",
      expertise: ["Project Management", "Client Relations", "Implementation Strategy"]
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "AI SOLUTIONS established in Sunderland with a vision to democratize AI technology."
    },
    {
      year: "2020",
      title: "First Major Client",
      description: "Successfully deployed our first enterprise AI solution, achieving 200% ROI for the client."
    },
    {
      year: "2021",
      title: "International Expansion",
      description: "Expanded operations globally, serving clients across 15 countries."
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Received 'AI Innovation Award' and recognized as 'Top AI Company' by TechReview Magazine."
    },
    {
      year: "2023",
      title: "50+ Projects Milestone",
      description: "Completed over 50 successful AI implementations across diverse industries."
    },
    {
      year: "2024",
      title: "Advanced AI Platform",
      description: "Launched our proprietary AI platform, enabling faster and more efficient solution deployment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                About
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  AI SOLUTIONS
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Based in Sunderland, we're a pioneering AI company dedicated to transforming 
                the digital employee experience through innovative solutions that put people first.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Work With Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years of Innovation</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="mr-3 h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To innovate, promote, and deliver the future of digital work environments. 
                  We are committed to improving the global employee experience by providing 
                  intelligent solutions that support people in every corner of the world, 
                  making technology work for humanity rather than the other way around.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lightbulb className="mr-3 h-6 w-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be the global leader in AI-powered workplace transformation, 
                  creating a world where artificial intelligence seamlessly enhances 
                  human potential, drives innovation, and creates meaningful positive 
                  change in how people work and collaborate across all industries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and shape how we approach 
              every client relationship and solution we develop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experts driving innovation and excellence at AI SOLUTIONS. 
              Our diverse team brings decades of experience in AI, technology, and business transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup in Sunderland to a global AI solutions provider, 
              discover the key milestones that have shaped our company.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {milestone.year}
                </div>
                <Card className="flex-1 hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Whether you're looking to transform your business with AI or want to be part 
            of our growing team, we'd love to hear from you. Let's shape the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="xl" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
                See Our Work
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

export default About;