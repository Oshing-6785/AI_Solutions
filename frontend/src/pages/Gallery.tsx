import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, MapPin, Award } from "lucide-react";
import API from "@/services/api";
import { mediaUrl } from "@/utils/mediaUrl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Minimal type for public view (aligns with your backend)
type PGallery = {
  _id: string;
  title: string;
  category:
    | "Conference"
    | "Client_Visit"
    | "Internal_Event"
    | "Demo"
    | "Recognition"
    | "Partnership"
    | "Keynote"
    | "Milestone"
    | "Office_Launch";
  content: string;
  image_path?: string;
  image_mime?: string;     // <-- add this
  mediaType?: "image" | "video"; // optional if you add it server-side
  date?: string;           // ISO
  location?: string;
  published?: boolean;
  isActive?: boolean;
  createdAt?: string;
};

const CATEGORY_LABELS: Record<PGallery["category"], string> = {
  Conference: "Conference",
  Client_Visit: "Client Visit",
  Internal_Event: "Internal Event",
  Demo: "Demo",
  Recognition: "Recognition",
  Partnership: "Partnership",
  Keynote: "Keynote",
  Milestone: "Milestone",
  Office_Launch: "Office Launch",
};

// Keep your original visible categories (and order)
const CATEGORIES_FILTER = [
  "All",
  "Conference",
  "Client Visit",
  "Demo",
  "Recognition",
  "Partnership",
  "Keynote",
  "Milestone",
  "Office Launch",
] as const;
type CategoryFilter = typeof CATEGORIES_FILTER[number];

const prettyDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString() : "";

// Detect if an item is a video (works even if mediaType isn't set)
const isVideo = (g: PGallery) =>
  g.mediaType === "video" || (g.image_mime?.startsWith("video/") ?? false);

const Gallery: React.FC = () => {
  const [items, setItems] = React.useState<PGallery[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activeCat, setActiveCat] = React.useState<CategoryFilter>("All");

  // View modal state
  const [openView, setOpenView] = React.useState(false);
  const [viewItem, setViewItem] = React.useState<PGallery | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await API.get<{ galleries: PGallery[] }>("/gallery");
        // Only show published & active on public page
        const cleaned =
          data?.galleries?.filter((g) => g.published && g.isActive) ?? [];
        // Sort by date desc (fallback to createdAt)
        cleaned.sort(
          (a, b) =>
            new Date(b.date || b.createdAt || 0).getTime() -
            new Date(a.date || a.createdAt || 0).getTime()
        );
        if (mounted) setItems(cleaned);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Filter by user-selected category button
  const visibleItems = React.useMemo(() => {
    if (activeCat === "All") return items;
    // Map human label back to enum string
    const targetEnum = Object.entries(CATEGORY_LABELS).find(
      ([, label]) => label === activeCat
    )?.[0] as PGallery["category"] | undefined;
    if (!targetEnum) return items;
    return items.filter((g) => g.category === targetEnum);
  }, [items, activeCat]);

  const handleOpenView = (g: PGallery) => {
    setViewItem(g);
    setOpenView(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section (unchanged style) */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Photo
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore moments from our journey - from industry conferences and client visits 
            to team achievements and milestone celebrations that define our story.
          </p>
        </div>
      </section>

      {/* Categories Filter (same look) */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES_FILTER.map((category) => (
              <Button
                key={category}
                variant={activeCat === category ? "default" : "outline"}
                size="sm"
                className="hover:shadow-md transition-all"
                onClick={() => setActiveCat(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid (same card style, real images/videos, no icon, no dark overlay) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : visibleItems.length === 0 ? (
            <p className="text-muted-foreground">No gallery items to show.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleItems.map((g) => {
                const catLabel =
                  CATEGORY_LABELS[g.category] || g.category.replace("_", " ");
                return (
                  <Card
                    key={g._id}
                    className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
                    onClick={() => handleOpenView(g)}
                    role="button"
                    aria-label={`View ${g.title}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenView(g);
                      }
                    }}
                  >
                    {/* Media area */}
                    <div className="h-64 relative overflow-hidden bg-gradient-primary">
                      {g.image_path ? (
                        isVideo(g) ? (
                          <video
                            src={mediaUrl(g.image_path)}
                            className="absolute inset-0 w-full h-full object-cover"
                            preload="metadata"
                            playsInline
                            muted
                            controls
                            onError={(e) => {
                              (e.currentTarget as HTMLVideoElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <img
                            src={mediaUrl(g.image_path)}
                            alt={g.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )
                      ) : null}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                          {catLabel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {prettyDate(g.date || g.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {g.title}
                      </h3>

                      {g.location && (
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {g.location}
                        </div>
                      )}

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {g.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* View Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
            <DialogDescription>
              Details for “{viewItem?.title}” including media, metadata, and description.
            </DialogDescription>
          </DialogHeader>

          {viewItem && (
            <div className="space-y-4">
              {/* Full media */}
              {viewItem.image_path && (
                isVideo(viewItem) ? (
                  <video
                    src={mediaUrl(viewItem.image_path)}
                    className="w-full h-auto rounded border"
                    controls
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      (e.currentTarget as HTMLVideoElement).style.display = "none";
                    }}
                  />
                ) : (
                  <img
                    src={mediaUrl(viewItem.image_path)}
                    alt={viewItem.title}
                    loading="lazy"
                    className="w-full h-auto rounded border object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )
              )}

              {/* Meta */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge>{CATEGORY_LABELS[viewItem.category] || viewItem.category.replace("_", " ")}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" /> {prettyDate(viewItem.date || viewItem.createdAt)}
                </div>
                {viewItem.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" /> {viewItem.location}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {viewItem.content}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Section (unchanged) */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Impact in Numbers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Industry Awards</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Speaking Events</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Countries Visited</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Events Attended</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (unchanged) */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join us at upcoming events, invite us to speak at your conference, 
            or partner with us to create the next chapter in AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button variant="secondary" size="xl" className="group">
                View Upcoming Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary">
                Invite Us to Speak
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

export default Gallery;
