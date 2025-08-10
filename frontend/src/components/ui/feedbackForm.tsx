import React, { useState } from "react";
import API from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    rating: 0,
    comment: "",
    job_title: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      form.name.length < 3 ||
      form.company_name.length < 2 ||
      form.comment.length < 10 ||
      form.job_title.length < 2
    ) {
      alert("Please ensure all fields meet minimum length requirements.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/feedback/create", form);
      if (res.status === 201) {
        alert("🎉 Feedback submitted successfully!");
        setForm({
          name: "",
          company_name: "",
          rating: 0,
          comment: "",
          job_title: "",
        });
      }
    } catch (err: any) {
      console.error(
        "Error submitting feedback:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.error || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Feedback</CardTitle>
                <p className="text-muted-foreground">
                  Your feedback for our company is a valuable asset that
                  motivates us.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        value={form.company_name}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="job_title">Job Title *</Label>
                      <Input
                        id="job_title"
                        name="job_title"
                        value={form.job_title}
                        onChange={handleChange}
                        placeholder="Enter you job Title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating (0–5) *</Label>
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                        value={form.rating}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2 ">
                      <Label htmlFor="comment">Comment *</Label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        value={form.comment}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
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
  );
};

export default FeedbackForm;
