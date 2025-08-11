import React from "react";
import API from "@/services/api";
import { Gallery } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { mediaUrl } from "@/utils/mediaUrl";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: Gallery | null;          
  refetch: () => Promise<void> | void;
};

const categories: Gallery["category"][] = [
  "Conference",
  "Client_Visit",
  "Internal_Event",
  "Demo",
  "Recognition",
  "Partnership",
  "Keynote",
  "Milestone",
  "Office_Launch",
];

const toDateInput = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const isVideoMime = (m?: string | null) => !!m && m.startsWith("video/");
const isVideoFile = (f?: File | null) => !!f && f.type.startsWith("video/");

const GalleryForm: React.FC<Props> = ({ open, setOpen, selected, refetch }) => {
  const isEdit = !!selected?._id;

  const [title, setTitle] = React.useState(selected?.title || "");
  const [category, setCategory] = React.useState<Gallery["category"]>(selected?.category || "Conference");
  const [content, setContent] = React.useState(selected?.content || "");
  const [date, setDate] = React.useState<string>(toDateInput(selected?.date || selected?.createdAt));
  const [location, setLocation] = React.useState(selected?.location || "");
  const [published, setPublished] = React.useState<boolean>(selected?.published ?? true);
  const [featured, setFeatured] = React.useState<boolean>(selected?.featured ?? false);
  const [isActive, setIsActive] = React.useState<boolean>(selected?.isActive ?? true);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setTitle(selected?.title || "");
    setCategory(selected?.category || "Conference");
    setContent(selected?.content || "");
    setDate(toDateInput(selected?.date || selected?.createdAt));
    setLocation(selected?.location || "");
    setPublished(selected?.published ?? true);
    setFeatured(selected?.featured ?? false);
    setIsActive(selected?.isActive ?? true);
    setFile(null);
    setPreview(null);
  }, [selected, open]);

  // Revoke object URL to avoid leaks
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f || null);
    if (preview) URL.revokeObjectURL(preview);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const validate = () => {
    if (!title || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return false;
    }
    if (!content || content.trim().length < 10) {
      toast.error("Content must be at least 10 characters");
      return false;
    }
    if (!date) {
      toast.error("Please choose a date");
      return false;
    }
    if (!isEdit && !file) {
      toast.error("Please upload an image or video file");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("category", category);
      fd.append("content", content);
      fd.append("date", new Date(date).toISOString());
      if (location) fd.append("location", location);
      fd.append("published", String(published));
      fd.append("featured", String(featured));
      fd.append("isActive", String(isActive));
      if (file) fd.append("file", file); 

      if (isEdit && selected?._id) {
        await API.put(`/gallery/${selected._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery item updated");
      } else {
        await API.post(`/gallery/create`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery item created");
      }

      await Promise.resolve(refetch());
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Gallery Item" : "Create Gallery Item"}</DialogTitle>
          <DialogDescription>
            Fill out the fields below to {isEdit ? "update" : "create"} a gallery entry.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="AI Innovation Summit 2024"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Gallery["category"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="London, UK" />
            </div>

            {/* Media */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="file">Image or Video</Label>
              <Input id="file" type="file" accept="image/*,video/*" onChange={onPickFile} />
              {preview ? (
                isVideoFile(file) ? (
                  <video
                    src={preview}
                    className="mt-2 max-h-48 w-auto rounded border"
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-2 max-h-48 w-auto object-contain rounded border"
                  />
                )
              ) : isEdit && selected?.image_path ? (
                isVideoMime(selected.image_mime) ? (
                  <video
                    src={mediaUrl(selected.image_path)}
                    className="mt-2 max-h-48 w-auto rounded border"
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={mediaUrl(selected.image_path)}
                    alt={selected.title}
                    className="mt-2 max-h-48 w-auto object-contain rounded border"
                  />
                )
              ) : null}
            </div>

            {/* Content */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe the event, project, or milestone…"
                rows={5}
                required
              />
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Switch id="published" checked={published} onCheckedChange={setPublished} />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="isActive">Visible</Label>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="min-w-[100px]">
              {submitting ? (isEdit ? "Updating…" : "Creating…") : isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryForm;
