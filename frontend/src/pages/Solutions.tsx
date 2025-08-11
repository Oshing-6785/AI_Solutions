import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/services/api";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Key } from "lucide-react";

import { iconMap } from "@/components/Dashboard/ContentTab/Solutions/iconMap";

import FoldableDescription from "@/components/Dashboard/ContentTab/Solutions/FoldableDescription";
import FoldableFeatures from "@/components/Dashboard/ContentTab/Solutions/FoldableFeatures";

type UISolution = {
  _id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge?: "" | "Popular" | "Featured" | "New" | "Enterprise";
  color?: "primary" | "secondary" | "accent";
};

const buildPrefillMessage = (s: UISolution) => {
  const featuresText = (s.features || []).map((f) => `• ${f}`).join("\n");
  return (
    `I'm interested in "${s.title}".\n\n` +
    `${s.description}\n\n` +
    (featuresText ? `Key features:\n${featuresText}\n\n` : "") +
    `Please contact me with pricing, timeline, and implementation details.`
  );
};

const Solutions = () => {
  const [solutions, setSolutions] = useState<UISolution[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [loadingSolutions, setLoadingSolutions] = useState(true);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await API.get("/solutions/active");
        setSolutions(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch solutions:", error);
      } finally {
        setLoadingSolutions(false);
      }
    };
    fetchSolutions();
  }, []);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await API.get("/industries/active");
        const names = (res.data?.data || []).map((i: any) => i.name);
        setIndustries(names);
      } catch (e) {
        console.error("Failed to fetch industries:", e);
      } finally {
        setLoadingIndustries(false);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of AI solutions designed to
            transform your business operations, enhance employee experience, and
            drive innovation across all industries.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl" className="group">
              Request Custom Solution
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Solution Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI virtual assistants to rapid prototyping, we offer
              comprehensive solutions tailored to your specific business needs
              and industry requirements.
            </p>
          </div>

          {loadingSolutions ? (
            <p className="text-center text-muted-foreground">
              Loading solutions...
            </p>
          ) : solutions.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No solutions available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => {
                const Icon = iconMap[solution.icon];
                return (
                  <Card
                    key={solution._id}
                    className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
                          {Icon && (
                            <Icon className="h-6 w-6 text-primary-foreground" />
                          )}
                        </div>
                        {solution.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-gradient-primary text-primary-foreground"
                          >
                            {solution.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors ">
                        {solution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 grow">
                      <FoldableDescription
                        description={solution.description}
                        maxLength={160}
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Key className="w-4 h-4" />
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        </div>
                        <FoldableFeatures
                          features={solution.features || []}
                          initialVisibleCount={5}
                        />
                      </div>
                      <div className="mt-auto">
                        <Link
                          to="/contact"
                          state={{
                            prefill: { message: buildPrefillMessage(solution) },
                          }}
                          replace
                        >
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full group"
                          >
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI solutions have been successfully implemented across diverse
              industries, helping organizations of all sizes achieve their
              digital transformation goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {loadingIndustries ? (
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Loading industries…
                  </h3>
                </CardContent>
              </Card>
            ) : industries.length === 0 ? (
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    No industries available
                  </h3>
                </CardContent>
              </Card>
            ) : (
              industries.map((industry, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-sm">{industry}</h3>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our Implementation Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful deployment and
              maximum ROI from your AI investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "Analyze your current processes and identify optimization opportunities",
              },
              {
                step: "02",
                title: "Design",
                description:
                  "Create tailored solutions aligned with your business objectives",
              },
              {
                step: "03",
                title: "Deploy",
                description:
                  "Implement solutions with minimal disruption to your operations",
              },
              {
                step: "04",
                title: "Optimize",
                description:
                  "Continuous monitoring and improvement for maximum performance",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Contact our experts today to discuss how our AI solutions can be
            customized to meet your specific business requirements and drive
            measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
              >
                See Success Stories
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

export default Solutions;
