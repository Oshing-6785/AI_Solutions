import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote, Building, MapPin, TrendingUp, Award, Users } from "lucide-react";
import FeedbackForm from "@/components/ui/feedbackForm";

const Feedback = () => {
  const testimonials = [
    {
      quote: "AI SOLUTIONS transformed our manufacturing operations completely. The AI virtual assistant reduced our downtime by 40% and improved our overall efficiency dramatically. The team's expertise and support throughout the implementation was exceptional.",
      author: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechCorp Industries",
      location: "Manchester, UK",
      industry: "Manufacturing",
      rating: 5,
      project: "AI Virtual Assistant Implementation",
      results: "40% reduction in downtime, $2.1M annual savings"
    },
    {
      quote: "The rapid prototyping solution helped us launch our new product line 6 months ahead of schedule. The AI-powered development process was incredibly efficient and cost-effective. Highly recommend their services.",
      author: "Michael Rodriguez",
      role: "Product Director",
      company: "Innovation Labs",
      location: "London, UK",
      industry: "Technology",
      rating: 5,
      project: "Rapid Prototyping Platform",
      results: "6 months faster time-to-market, 50% cost reduction"
    },
    {
      quote: "Outstanding support throughout our digital transformation journey. The healthcare AI solution has improved our patient processing speed by 60% and enhanced diagnostic accuracy significantly. The team understood our unique challenges perfectly.",
      author: "Dr. Emily Watson",
      role: "Digital Strategy Lead",
      company: "MedCare Solutions",
      location: "Edinburgh, UK",
      industry: "Healthcare",
      rating: 5,
      project: "Healthcare Digital Transformation",
      results: "60% faster patient processing, 85% diagnostic accuracy"
    },
    {
      quote: "The financial automation system has revolutionized our loan processing. We've seen a 75% improvement in processing speed and virtually eliminated manual errors. The ROI was evident within the first quarter.",
      author: "James Thompson",
      role: "Operations Manager",
      company: "SecureBank Ltd",
      location: "Birmingham, UK",
      industry: "Finance",
      rating: 5,
      project: "Financial Services Automation",
      results: "75% faster processing, 90% error reduction"
    },
    {
      quote: "The customer experience platform has been a game-changer for our retail operations. Customer satisfaction increased by 35% and our sales conversions improved by 25%. The AI recommendations are incredibly accurate.",
      author: "Lisa Anderson",
      role: "Customer Experience Director",
      company: "ShopSmart Chain",
      location: "Liverpool, UK",
      industry: "Retail",
      rating: 5,
      project: "Customer Experience Platform",
      results: "35% higher satisfaction, 25% conversion boost"
    },
    {
      quote: "The educational AI tutor system has transformed how our students learn. We've seen a 45% improvement in learning outcomes and our teachers can now focus on more strategic educational initiatives.",
      author: "David Miller",
      role: "Head of Technology",
      company: "EduFuture Academy",
      location: "Newcastle, UK",
      industry: "Education",
      rating: 5,
      project: "AI Tutor System",
      results: "45% better learning outcomes, 30% teacher workload reduction"
    }
  ];

  const stats = [
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      description: "Based on 50+ client reviews"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Projects completed successfully"
    },
    {
      icon: Award,
      value: "95%",
      label: "Client Satisfaction",
      description: "Would recommend us to others"
    },
    {
      icon: Users,
      value: "85%",
      label: "Repeat Business",
      description: "Clients returning for new projects"
    }
  ];

  const industryRatings = [
    { industry: "Manufacturing", rating: 4.9, projects: 12 },
    { industry: "Healthcare", rating: 4.8, projects: 8 },
    { industry: "Finance", rating: 5.0, projects: 6 },
    { industry: "Retail", rating: 4.9, projects: 10 },
    { industry: "Education", rating: 4.7, projects: 5 },
    { industry: "Technology", rating: 4.8, projects: 9 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Client
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Feedback
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover what our clients say about their AI transformation journey with AI SOLUTIONS. 
            Real testimonials from real businesses across diverse industries.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read authentic feedback from organizations that have transformed their operations 
              with our AI solutions and achieved remarkable results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      {testimonial.industry}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <blockquote className="text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mt-4">
                      <div>
                        <p className="font-medium text-foreground">{testimonial.company}</p>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Project:</p>
                        <p>{testimonial.project}</p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg mt-4">
                      <h4 className="font-semibold text-sm mb-1">Key Results:</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.results}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Ratings */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Ratings by Industry</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we perform across different industries and the number of successful 
              projects we've completed in each sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryRatings.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{item.industry}</h3>
                  
                  <div className="flex justify-center mb-3">
                    {renderStars(Math.floor(item.rating))}
                  </div>
                  
                  <div className="text-2xl font-bold text-primary mb-2">{item.rating}/5</div>
                  <div className="text-sm text-muted-foreground">
                    Based on {item.projects} completed projects
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Detailed Case Studies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Want to learn more about how these results were achieved? 
              Explore our detailed case studies and see the complete transformation journey.
            </p>
            
            <Link to="/projects">
              <Button variant="hero" size="lg" className="group">
                View Case Studies
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
            Join the growing list of satisfied clients who have transformed their operations 
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
      <FeedbackForm />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Feedback;