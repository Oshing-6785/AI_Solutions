import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PrefillPayload = {
  message?: string;
  title?: string;
  brief?: string;
  key_results?: string[];
  technologies_used?: string[];
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    country: "",
    job_title: "",
    message: "",
  });

  const location = useLocation() as { state?: { prefill?: PrefillPayload } };
  const prefilledOnce = useRef(false);

  const buildPrefillMessage = (p: PrefillPayload) => {
    if (p.message) return p.message;

    const lines: string[] = [];
    if (p.title) lines.push(`I'm interested in "${p.title}".`, "");
    if (p.brief) {
      lines.push("Brief:", p.brief.trim(), "");
    }
    if (p.key_results && p.key_results.length) {
      lines.push("Key results:");
      p.key_results.forEach((r) => lines.push(`• ${r}`));
      lines.push(""); 
    }
    if (p.technologies_used && p.technologies_used.length) {
      lines.push("Technologies used:");
      p.technologies_used.forEach((t) => lines.push(`• ${t}`));
      lines.push("");
    }
    lines.push("Please contact me with pricing, timeline, and implementation details.");
    return lines.join("\n");
  };

  useEffect(() => {
    if (prefilledOnce.current) return;

    const incoming = location?.state?.prefill;
    if (incoming) {
      const composed = buildPrefillMessage(incoming).trim();
      if (composed && !formData.message) {
        setFormData((prev) => ({ ...prev, message: composed }));
        prefilledOnce.current = true;
      }
    }
  }, [location, formData.message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await API.post("/contact/create", formData);

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Request Submitted Successfully!",
          description:
            "Our team will contact you within 24 hours to discuss your requirements.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          company_name: "",
          country: "",
          job_title: "",
          message: "",
        });
        prefilledOnce.current = false; 
      } else {
        toast({
          title: "Submission Failed",
          description: "Unexpected response from server.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const countries = [
    "United Kingdom",
    "Nepal",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Get in
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with AI? Share your requirements
            with us and let our experts design a custom solution that drives
            real results.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Submit Your Requirements
                  </CardTitle>
                  <p className="text-muted-foreground">
                    No account required. Just tell us about your project and
                    we'll get back to you with a tailored solution.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name *</Label>
                        <Input
                          id="company_name"
                          value={formData.company_name}
                          onChange={(e) =>
                            handleChange("company_name", e.target.value)
                          }
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) =>
                            handleChange("country", value)
                          }
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="job_title">Job Title *</Label>
                        <Input
                          id="job_title"
                          value={formData.job_title}
                          onChange={(e) =>
                            handleChange("job_title", e.target.value)
                          }
                          placeholder="Enter your job title"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Please describe your project requirements, goals, and any specific challenges you're facing..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                    >
                      Submit Requirements
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI SOLUTIONS
                    <br />
                    Sunderland, United Kingdom
                    <br />
                    Serving clients globally
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We respond to all inquiries within 24 hours.
                    <br />
                    For urgent requests, expect a response within 4 hours during
                    business days.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-primary" />
                    Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <p className="text-muted-foreground text-sm">
                      info@ai-solutions.co.uk
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Technical Support</p>
                    <p className="text-muted-foreground text-sm">
                      support@ai-solutions.co.uk
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Partnerships</p>
                    <p className="text-muted-foreground text-sm">
                      partners@ai-solutions.co.uk
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Need Immediate Assistance?</h3>
                  <p className="text-primary-foreground/90 text-sm mb-4">
                    For urgent technical issues or time-sensitive projects, our
                    priority support team is available.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Priority Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose AI SOLUTIONS?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Response</h3>
              <p className="text-muted-foreground">
                Get expert consultation within 24 hours of your inquiry
                submission.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Expert Consultation
              </h3>
              <p className="text-muted-foreground">
                Speak directly with AI specialists who understand your industry
                challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
              <p className="text-muted-foreground">
                Receive tailored proposals designed specifically for your
                business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Contact;
