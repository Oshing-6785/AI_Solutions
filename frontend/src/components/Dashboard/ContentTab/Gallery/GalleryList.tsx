import React from "react";
import API from "@/services/api";
import { Gallery } from "./types";
import { categoryIconMap } from "./iconMap";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Pencil, Trash2, MapPin, ImageIcon, Star, Eye, EyeOff } from "lucide-react";
import FoldableDescription from "@/components/Dashboard/ContentTab/Projects/FoldableDescription";
import { mediaUrl } from "@/utils/mediaUrl";

interface Props {
  items: Gallery[];
  loading: boolean;
  setSelected: (g: Gallery | null) => void;
  setOpen: (open: boolean) => void;
  setViewItem: (g: Gallery) => void;
  setOpenView: (open: boolean) => void;
  refetch: () => Promise<void> | void;
}

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "");
const isVideoMime = (m?: string | null) => !!m && m.startsWith("video/");

const GalleryList: React.FC<Props> = ({
  items,
  loading,
  setSelected,
  setOpen,
  setViewItem,
  setOpenView,
  refetch,
}) => {
  const [pending, setPending] = React.useState<Set<string>>(new Set());

  const withPending = async (id: string, fn: () => Promise<void>) => {
    setPending((s) => new Set(s).add(id));
    try {
      await fn();
    } finally {
      setPending((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
    }
  };

  const onEdit = (g: Gallery) => {
    setSelected(g);
    setOpen(true);
  };

  const onDelete = (id: string) =>
    withPending(id, async () => {
      if (!confirm("Delete this gallery item?")) return;
      try {
        await API.delete(`/gallery/${id}`);
        toast.success("Gallery item deleted");
        await Promise.resolve(refetch());
      } catch (e: any) {
        toast.error(e?.response?.data?.error || "Failed to delete");
      }
    });

  const toggleField = (g: Gallery, field: "published" | "featured" | "isActive") => {
    const id = g._id!;
    const next = { [field]: !g[field] } as Partial<Gallery>;
    return withPending(id, async () => {
      try {
        const fd = new FormData();
        Object.entries(next).forEach(([k, v]) => fd.append(k, String(v)));
        await API.put(`/gallery/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success(
          field === "published"
            ? `Marked as ${!g.published ? "published" : "unpublished"}`
            : field === "featured"
            ? (!g.featured ? "Featured" : "Unfeatured")
            : (!g.isActive ? "Shown" : "Hidden")
        );
        await Promise.resolve(refetch());
      } catch (e: any) {
        toast.error(e?.response?.data?.error || "Update failed");
      }
    });
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!items?.length) return <p className="text-muted-foreground">No gallery items yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((g) => {
        const Icon = categoryIconMap[g.category];
        const busy = !!g._id && pending.has(g._id);

        return (
          <div
            key={g._id}
            className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border rounded-lg overflow-hidden"
          >
            {/* Media header*/}
            <div className="h-48 relative overflow-hidden">
              {g.image_path ? (
                isVideoMime(g.image_mime) ? (
                  <video
                    src={mediaUrl(g.image_path)}
                    className="absolute inset-0 w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      (e.currentTarget as HTMLVideoElement).style.display = "none";
                    }}
                  />
                ) : (
                  <img
                    src={mediaUrl(g.image_path)}
                    alt={g.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )
              ) : (
                <div className="h-full w-full bg-gradient-primary flex items-center justify-center">
                  {Icon ? (
                    <Icon className="h-10 w-10 text-primary-foreground" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-primary-foreground" />
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  {g.category.replace("_", " ")}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {fmtDate(g.date || g.createdAt)}
                </span>
              </div>

              <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {g.title}
              </CardTitle>

              {g.location && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {g.location}
                </div>
              )}

              <FoldableDescription description={g.content} />

              {/* Flags */}
              <div className="flex items-center gap-2 mt-4">
                <Badge variant={g.published ? "default" : "outline"}>
                  {g.published ? "Published" : "Unpublished"}
                </Badge>
                {g.featured && (
                  <Badge variant="outline" className="inline-flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    Featured
                  </Badge>
                )}
                <Badge variant="outline">{g.isActive ? "Visible" : "Hidden"}</Badge>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                {/* Left group */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setViewItem(g);
                      setOpenView(true);
                    }}
                    className="min-w-[100px]"
                  >
                    View
                  </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2 min-w-[100px]"
                      onClick={() => onEdit(g)}
                      disabled={busy}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-2 min-w-[100px]"
                      onClick={() => onDelete(g._id!)}
                      disabled={busy}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                </div>

                {/* Right group */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleField(g, "featured")}
                    disabled={busy}
                    className="flex items-center gap-2 min-w-[110px]"
                    title="Toggle Featured"
                  >
                    <Star className="w-4 h-4" />
                    {g.featured ? "Unfeature" : "Feature"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleField(g, "published")}
                    disabled={busy}
                    className="flex items-center gap-2 min-w-[110px]"
                    title="Toggle Publish"
                  >
                    {g.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {g.published ? "Unpublish" : "Publish"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleField(g, "isActive")}
                    disabled={busy}
                    className="min-w-[90px]"
                    title="Toggle Visibility"
                  >
                    {g.isActive ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryList;
