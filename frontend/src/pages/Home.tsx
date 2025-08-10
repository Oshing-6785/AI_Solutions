import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Users, Building, Key, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import TestimonialsList from "@/components/Dashboard/ContentTab/Testimonials/TestimonialsList";
import API from "../services/api";

const Home = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Solutions",
      description:
        "Successfully implemented across 50+ industries with measurable results.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description:
        "Solutions that grow with your business and adapt to changing needs.",
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description:
        "Award-winning AI solutions recognized by industry leaders globally.",
    },
    {
      icon: Clock,
      title: "Rapid Implementation",
      description:
        "Fast deployment with minimal disruption to your existing operations.",
    },
  ];

  // const testimonials = [
  //   {
  //     quote: "AI SOLUTIONS transformed our workflow efficiency by 300%. Their virtual assistant handles complex queries seamlessly.",
  //     author: "Sarah Chen",
  //     company: "TechCorp Industries",
  //     role: "CTO"
  //   },
  //   {
  //     quote: "The rapid prototyping capabilities helped us launch our product 6 months ahead of schedule.",
  //     author: "Michael Rodriguez",
  //     company: "Innovation Labs",
  //     role: "Product Director"
  //   },
  //   {
  //     quote: "Outstanding support throughout the implementation. The team truly understands digital transformation.",
  //     author: "Emily Watson",
  //     company: "Global Manufacturing Co.",
  //     role: "Digital Strategy Lead"
  //   }
  // ];

  const [approvedTestimonials, setApprovedTestimonials] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await API.get("/feedback/approved");
        setApprovedTestimonials(res.data.feedbacks);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    fetchApproved();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Accelerate Your Digital
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Transformation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Leverage the power of AI to streamline operations, enhance
                employee experience, and drive innovation across your
                organization. Join industry leaders who trust AI SOLUTIONS for
                their digital evolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/solutions">
                  <Button variant="outline" size="lg">
                    View Solutions
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Instant ROI</h3>
                      <p className="text-muted-foreground text-sm">
                        See results within the first month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Scalable Solutions</h3>
                      <p className="text-muted-foreground text-sm">
                        Grows with your business needs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Support</h3>
                      <p className="text-muted-foreground text-sm">
                        24/7 dedicated AI specialists
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Leading Companies Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the competitive advantages that have made AI SOLUTIONS
              the preferred partner for digital transformation across
              industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                    <benefit.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<section className="py-24 bg-muted">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
      <p className="text-xl text-muted-foreground">
        Real results from real businesses who've transformed with AI SOLUTIONS
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {approvedTestimonials.map((testimonial, index) => (
        <Card
          key={index}
          className="hover:shadow-elegant transition-all duration-300"
        >
          <CardContent className="p-8">
            <blockquote className="text-lg mb-6 leading-relaxed">
              "{testimonial.comment}"
            </blockquote>
            <div className="border-t pt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <p className="font-semibold">{testimonial.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <p className="text-muted-foreground text-sm">
                  Rating: {testimonial.rating} ★
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                <p className="text-primary text-sm font-medium">
                  {testimonial.company_name}
                </p>
              </div>
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
            Ready to Lead Your Industry?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join the companies already transforming their operations with AI
            SOLUTIONS. Let's discuss how we can accelerate your digital
            transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
              >
                View Case Studies
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

export default Home;
