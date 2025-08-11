import React from "react";
import { Gallery } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star } from "lucide-react";
import { mediaUrl } from "@/utils/mediaUrl";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  gallery: Gallery | null;
}

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "");
const isVideoMime = (m?: string | null) => !!m && m.startsWith("video/");

const GalleryView: React.FC<Props> = ({ open, setOpen, gallery }) => {
  if (!gallery) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{gallery.title}</DialogTitle>
          <DialogDescription>
            Details for “{gallery.title}” including media, metadata, and description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Media */}
          {gallery.image_path && (
            isVideoMime(gallery.image_mime) ? (
              <video
                src={mediaUrl(gallery.image_path)}
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
                src={mediaUrl(gallery.image_path)}
                alt={gallery.title}
                className="w-full h-auto rounded border object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge>{gallery.category.replace("_", " ")}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" /> {fmtDate(gallery.date)}
            </div>
            {gallery.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" /> {gallery.location}
              </div>
            )}
            {gallery.featured && (
              <Badge variant="outline" className="inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> Featured
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
            {gallery.content}
          </div>

          {/* Flags */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant={gallery.published ? "default" : "outline"}>
              {gallery.published ? "Published" : "Unpublished"}
            </Badge>
            <Badge variant="outline">{gallery.isActive ? "Visible" : "Hidden"}</Badge>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-muted-foreground mt-2">
            Created: {fmtDate(gallery.createdAt)} | Updated: {fmtDate(gallery.updatedAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryView;
