import React, { useMemo } from "react";
import { Gallery } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Eye, EyeOff, Star, Images } from "lucide-react";

type Props = {
  items: Gallery[];
  recentCount?: number; 
};

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "");

const GalleryStats: React.FC<Props> = ({ items, recentCount = 5 }) => {
  const { total, published, featured, visible, recent } = useMemo(() => {
    const total = items.length;
    const published = items.filter((g) => g.published).length;
    const featured = items.filter((g) => g.featured).length;
    const visible = items.filter((g) => g.isActive).length;

    const recent = [...items]
      .sort((a, b) => new Date(b.date || b.createdAt || "").getTime() - new Date(a.date || a.createdAt || "").getTime())
      .slice(0, Math.max(0, recentCount));

    return { total, published, featured, visible, recent };
  }, [items, recentCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Images className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
          <Eye className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{published}</div>
          <p className="text-xs text-muted-foreground">
            {(total ? Math.round((published / total) * 100) : 0)}% of all items
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Featured</CardTitle>
          <Star className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{featured}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Visible</CardTitle>
          <EyeOff className="w-5 h-5 text-muted-foreground rotate-180" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{visible}</div>
          <p className="text-xs text-muted-foreground">
            {(total ? Math.round((visible / total) * 100) : 0)}% currently shown
          </p>
        </CardContent>
      </Card>

      {/* Recent panel spans full width below on small screens */}
      <Card className="md:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent items.</p>
          ) : (
            <ul className="divide-y">
              {recent.map((g) => (
                <li key={g._id} className="py-2 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{g.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {g.category.replace("_", " ")} • {fmtDate(g.date || g.createdAt)}{g.location ? ` • ${g.location}` : ""}
                    </p>
                  </div>
                  {g.featured && (
                    <Badge variant="outline" className="ml-3 inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Featured
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryStats;
