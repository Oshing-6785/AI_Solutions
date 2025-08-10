import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, TrendingUp, Users, Clock, Award } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Global Manufacturing AI Assistant",
      client: "TechCorp Industries",
      industry: "Manufacturing",
      duration: "6 months",
      team: "8 specialists",
      description: "Implemented an AI-powered virtual assistant that streamlined production workflows and reduced downtime by 40%.",
      results: [
        "40% reduction in production downtime",
        "300% improvement in query response time",
        "$2.1M annual cost savings",
        "95% employee satisfaction rate"
      ],
      technologies: ["Natural Language Processing", "Machine Learning", "IoT Integration", "Real-time Analytics"],
      status: "Completed",
      year: "2024"
    },
    {
      title: "Healthcare Digital Transformation",
      client: "MedCare Solutions",
      industry: "Healthcare",
      duration: "8 months", 
      team: "12 specialists",
      description: "Developed a comprehensive AI solution for patient management and automated diagnosis assistance.",
      results: [
        "60% faster patient processing",
        "85% accuracy in preliminary diagnosis",
        "50% reduction in administrative tasks",
        "99.9% system uptime"
      ],
      technologies: ["Computer Vision", "Predictive Analytics", "HIPAA Compliance", "Cloud Infrastructure"],
      status: "Completed",
      year: "2023"
    },
    {
      title: "Financial Services Automation",
      client: "SecureBank Ltd",
      industry: "Finance",
      duration: "4 months",
      team: "6 specialists", 
      description: "Created an intelligent automation system for loan processing and risk assessment workflows.",
      results: [
        "75% faster loan processing",
        "90% reduction in manual errors",
        "$800K operational savings",
        "Enhanced compliance reporting"
      ],
      technologies: ["Risk Analytics", "Blockchain Integration", "Automated Workflows", "Security Protocols"],
      status: "Completed",
      year: "2023"
    },
    {
      title: "Retail Customer Experience Platform",
      client: "ShopSmart Chain",
      industry: "Retail",
      duration: "5 months",
      team: "10 specialists",
      description: "Built an AI-driven customer experience platform with personalized recommendations and inventory management.",
      results: [
        "35% increase in customer satisfaction",
        "25% boost in sales conversions",
        "Real-time inventory optimization",
        "Multi-channel integration"
      ],
      technologies: ["Recommendation Engine", "Inventory Analytics", "Customer Insights", "Omnichannel Integration"],
      status: "Ongoing",
      year: "2024"
    },
    {
      title: "Educational AI Tutor System",
      client: "EduFuture Academy",
      industry: "Education",
      duration: "7 months",
      team: "9 specialists",
      description: "Developed an adaptive learning platform with AI tutors for personalized student education paths.",
      results: [
        "45% improvement in learning outcomes",
        "24/7 student support availability",
        "Personalized curriculum adaptation",
        "Teacher workload reduction by 30%"
      ],
      technologies: ["Adaptive Learning", "Natural Language Processing", "Progress Analytics", "Content Management"],
      status: "Completed",
      year: "2024"
    }
  ];

  const stats = [
    { icon: Award, value: "50+", label: "Successful Projects" },
    { icon: Users, value: "25+", label: "Industries Served" },
    { icon: TrendingUp, value: "300%", label: "Average ROI" },
    { icon: Clock, value: "99.9%", label: "On-time Delivery" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Success
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how leading organizations across industries have transformed their operations 
            and achieved remarkable results with our AI solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Featured Case Studies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real projects, real results. See how our AI solutions have delivered 
              measurable impact across diverse industries and business challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      {project.industry}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{project.client}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Team Size:</span>
                      <p className="font-medium">{project.team}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Key Results:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Link to="/contact">
                      <Button variant="outline" className="w-full group">
                        Discuss Similar Project
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Industries We've Transformed</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our expertise spans across multiple sectors, delivering tailored solutions 
              that address industry-specific challenges and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Healthcare", "Finance", "Manufacturing", "Retail", "Education",
              "Technology", "Transportation", "Energy", "Government", "Real Estate"
            ].map((industry, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <h3 className="font-semibold">{industry}</h3>
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
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join the growing list of organizations that have transformed their operations 
            with AI SOLUTIONS. Let's discuss how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button variant="outline" size="xl" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
                Explore Solutions
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

export default Projects;