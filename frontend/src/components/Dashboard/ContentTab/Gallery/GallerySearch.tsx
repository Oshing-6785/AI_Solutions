import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Gallery } from "./types";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  category: Gallery["category"] | "All";
  setCategory: (v: Gallery["category"] | "All") => void;
  publishedOnly: boolean;
  setPublishedOnly: (v: boolean) => void;
  featuredOnly: boolean;
  setFeaturedOnly: (v: boolean) => void;
  visibleOnly: boolean;
  setVisibleOnly: (v: boolean) => void;
}

const categories: (Gallery["category"] | "All")[] = [
  "All",
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

const GallerySearch: React.FC<Props> = ({
  search,
  setSearch,
  category,
  setCategory,
  publishedOnly,
  setPublishedOnly,
  featuredOnly,
  setFeaturedOnly,
  visibleOnly,
  setVisibleOnly,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Search */}
      <div>
        <Input
          placeholder="Search title, content, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <Select value={category} onValueChange={(v) => setCategory(v as Gallery["category"] | "All")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Published */}
      <div className="flex items-center space-x-2">
        <Switch id="publishedOnly" checked={publishedOnly} onCheckedChange={setPublishedOnly} />
        <Label htmlFor="publishedOnly">Published</Label>
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Switch id="featuredOnly" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
        <Label htmlFor="featuredOnly">Featured</Label>
      </div>

      {/* Visible */}
      <div className="flex items-center space-x-2">
        <Switch id="visibleOnly" checked={visibleOnly} onCheckedChange={setVisibleOnly} />
        <Label htmlFor="visibleOnly">Visible</Label>
      </div>
    </div>
  );
};

export default GallerySearch;
