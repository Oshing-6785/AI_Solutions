import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/services/api";
import { toast } from "sonner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Clock, Award } from "lucide-react";

import { iconMap } from "@/components/Dashboard/ContentTab/Solutions/iconMap";

type PublicProject = {
  _id: string;
  title: string;
  company_name?: string;
  description?: string;
  key_results?: string[];
  technologies_used?: string[];
  duration?: string;
  team_size?: number | string;
  process?: string;
  date?: string[];
  badge?: string;
  icon?: string;
  isActive?: boolean;
};

const Projects = () => {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(false);

  const [industries, setIndustries] = useState<string[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);

  const stats = [
    { icon: Award, value: "50+", label: "Successful Projects" },
    { icon: Users, value: "25+", label: "Industries Served" },
    { icon: TrendingUp, value: "300%", label: "Average ROI" },
    { icon: Clock, value: "99.9%", label: "On-time Delivery" },
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects/");
      const list: PublicProject[] = res?.data?.data ?? [];
      setProjects(list.filter((p) => !!p.isActive));
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProjects();
    fetchIndustries();
  }, []);

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
            Discover how leading organizations across industries have
            transformed their operations and achieved remarkable results with
            our AI solutions.
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
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
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
              Real projects, real results. See how our AI solutions have
              delivered measurable impact across diverse industries and business
              challenges.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => {
                const status = project.process || "Completed";
                const year = project.date?.[0] || "";
                const badgeLabel =
                  project.badge || project.company_name || "Project";
                const results = project.key_results || [];
                const technologies = project.technologies_used || [];
                const Icon = project.icon
                  ? (iconMap as any)?.[project.icon]
                  : null;

                return (
                  <Card
                    key={project._id}
                    className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
                          {Icon ? (
                            <Icon className="h-6 w-6 text-primary-foreground" />
                          ) : null}
                        </div>

                        {/*  Badge  */}
                        <div className="flex items-center space-x-2">
                          {badgeLabel && (
                            <Badge
                              variant="secondary"
                              className="bg-gradient-primary text-primary-foreground"
                            >
                              {badgeLabel}
                            </Badge>
                          )}
                          <Badge
                            variant={
                              status === "Completed" ? "default" : "secondary"
                            }
                          >
                            {status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {year}
                          </span>
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {project.company_name}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <p className="font-medium">
                            {project.duration || "-"}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Team Size:
                          </span>
                          <p className="font-medium">
                            {project.team_size ?? "-"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Key Results:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {results.map((result, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Link
                          to="/contact"
                          state={{
                            prefill: {
                              title: project.title,
                              brief: project.description,
                              key_results: results, 
                              technologies_used: technologies, 
                            },
                          }}
                        >
                          <Button variant="outline" className="w-full group">
                            Discuss Similar Project
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join the growing list of organizations that have transformed their
            operations with AI SOLUTIONS. Let's discuss how we can help you
            achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
              >
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
