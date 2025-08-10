import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, Eye, ThumbsUp } from "lucide-react";

const Articles = () => {
  const featuredArticle = {
    title: "The Future of AI in Workplace Transformation: A 2024 Perspective",
    excerpt: "As we advance deeper into 2024, artificial intelligence continues to reshape how we work, collaborate, and innovate. This comprehensive analysis explores the latest trends, challenges, and opportunities in AI-powered workplace transformation.",
    author: "Dr. Sarah Mitchell",
    date: "August 15, 2024",
    readTime: "12 min read",
    category: "Industry Insights",
    views: "2,850",
    likes: "156",
    featured: true
  };

  const articles = [
    {
      title: "Implementing AI Virtual Assistants: A Step-by-Step Guide",
      excerpt: "Learn how to successfully integrate AI virtual assistants into your organization with our proven methodology and best practices.",
      author: "James Thompson",
      date: "July 28, 2024",
      readTime: "8 min read",
      category: "Technical Guide",
      views: "1,950",
      likes: "89"
    },
    {
      title: "ROI Analysis: Measuring the Impact of AI Solutions",
      excerpt: "A comprehensive framework for evaluating the return on investment of AI implementations, with real-world case studies and metrics.",
      author: "Michael Rodriguez",
      date: "July 15, 2024",
      readTime: "10 min read",
      category: "Business Strategy",
      views: "1,650",
      likes: "124"
    },
    {
      title: "Ethical AI Development: Principles and Practices",
      excerpt: "Exploring the fundamental principles of ethical AI development and how to implement responsible AI practices in your organization.",
      author: "Dr. Emily Chen",
      date: "June 30, 2024",
      readTime: "15 min read",
      category: "AI Ethics",
      views: "2,100",
      likes: "187"
    },
    {
      title: "The Evolution of Employee Experience in the AI Era",
      excerpt: "How artificial intelligence is transforming employee experience and what organizations need to know to stay competitive.",
      author: "Dr. Sarah Mitchell",
      date: "June 12, 2024",
      readTime: "9 min read",
      category: "Workplace Innovation",
      views: "1,800",
      likes: "102"
    },
    {
      title: "Machine Learning in Manufacturing: Real-World Applications",
      excerpt: "Discover how machine learning is revolutionizing manufacturing processes through predictive maintenance, quality control, and optimization.",
      author: "James Thompson",
      date: "May 25, 2024",
      readTime: "11 min read",
      category: "Industry Applications",
      views: "1,450",
      likes: "76"
    },
    {
      title: "Building Trust in AI Systems: A Leadership Perspective",
      excerpt: "Key strategies for leaders to build organizational trust in AI systems and drive successful digital transformation initiatives.",
      author: "Michael Rodriguez",
      date: "May 8, 2024",
      readTime: "7 min read",
      category: "Leadership",
      views: "1,320",
      likes: "93"
    },
    {
      title: "Natural Language Processing in Healthcare: Opportunities and Challenges",
      excerpt: "An in-depth look at how NLP is transforming healthcare delivery and the challenges organizations face in implementation.",
      author: "Dr. Emily Chen",
      date: "April 20, 2024",
      readTime: "13 min read",
      category: "Healthcare AI",
      views: "2,200",
      likes: "145"
    },
    {
      title: "Scaling AI Solutions: From Pilot to Production",
      excerpt: "Best practices and common pitfalls when scaling AI solutions from initial pilots to full production deployments.",
      author: "James Thompson",
      date: "April 5, 2024",
      readTime: "9 min read",
      category: "Implementation",
      views: "1,750",
      likes: "108"
    }
  ];

  const categories = [
    "All Articles", "Industry Insights", "Technical Guide", "Business Strategy", 
    "AI Ethics", "Workplace Innovation", "Healthcare AI", "Leadership"
  ];

  const authors = [
    {
      name: "Dr. Sarah Mitchell",
      role: "CEO & AI Strategy Expert",
      articles: 15,
      expertise: "AI Strategy, Workplace Transformation"
    },
    {
      name: "James Thompson",
      role: "CTO & Technical Lead",
      articles: 12,
      expertise: "Machine Learning, System Architecture"
    },
    {
      name: "Dr. Emily Chen",
      role: "Head of AI Research",
      articles: 18,
      expertise: "NLP, AI Ethics, Research"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Customer Success",
      articles: 10,
      expertise: "Business Strategy, Implementation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Insights &
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore expert insights, industry analysis, and practical guidance on AI implementation, 
            workplace transformation, and the future of digital innovation.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="hover:shadow-md transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground mb-4">
              Featured Article
            </Badge>
          </div>

          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <Badge variant="outline" className="mb-4">
                      {featuredArticle.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 leading-tight hover:text-primary transition-colors cursor-pointer">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredArticle.readTime}
                    </div>
                  </div>

                  <Button variant="hero" className="group">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Article Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Views
                        </div>
                        <span className="font-medium">{featuredArticle.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Likes
                        </div>
                        <span className="font-medium">{featuredArticle.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
                    <h3 className="font-semibold mb-2">Stay Updated</h3>
                    <p className="text-sm text-primary-foreground/90 mb-4">
                      Get the latest AI insights delivered to your inbox.
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with our expert analysis and practical guidance on AI implementation, 
              industry trends, and workplace transformation strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-3">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {article.likes}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Expert Authors</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the thought leaders behind our insights - industry experts with decades 
              of combined experience in AI, technology, and business transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map((author, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{author.role}</p>
                  <div className="text-xs text-muted-foreground mb-3">
                    {author.articles} articles published
                  </div>
                  <div className="text-xs bg-muted px-3 py-1 rounded-full">
                    {author.expertise}
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
            Ready to Apply These Insights?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Transform theory into practice. Contact our experts to discuss how these insights 
            can be applied to your specific business challenges and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="xl" className="group">
                Discuss Your Needs
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

export default Articles;