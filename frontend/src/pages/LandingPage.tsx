import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import heroImage from "@/assets/hero-ai-solutions.jpg";
import aiTechBg from "@/assets/ai-tech-background.jpg";
import { ArrowRight, Brain, Zap, Globe, Users } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${aiTechBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-bounce-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI SOLUTIONS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Revolutionizing the digital employee experience through AI-powered solutions, 
            automation, and intelligent virtual assistants for design, innovation, and global impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group hover:animate-pulse-glow">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button variant="outline" size="xl" className="hover:animate-pulse-glow">
                Explore Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 animate-slide-up">Why Choose AI SOLUTIONS?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Based in Sunderland, we deliver cutting-edge AI software to help businesses 
              proactively address challenges and innovate faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all animate-float">
                  <Brain className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Virtual Assistant</h3>
                <p className="text-muted-foreground">
                  Intelligent virtual assistants that respond to inquiries and provide AI-based solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all animate-float">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Rapid Prototyping</h3>
                <p className="text-muted-foreground">
                  Affordable prototyping solutions that speed up design, engineering, and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all animate-float">
                  <Globe className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Impact</h3>
                <p className="text-muted-foreground">
                  Supporting businesses worldwide with scalable solutions for global expansion.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all animate-float">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">People First</h3>
                <p className="text-muted-foreground">
                  Committed to improving the digital employee experience for people at work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            To innovate, promote, and deliver the future of digital work environments. 
            We are committed to improving the global employee experience by providing 
            intelligent solutions that support people in every corner of the world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground">Industries Served</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Solutions Delivered</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">25+</h3>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Reach out to us with your specific requirements. No login or account needed. 
            We're here to provide smart, scalable solutions tailored to your business needs.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="xl" className="group">
              Submit Your Requirement
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default LandingPage;