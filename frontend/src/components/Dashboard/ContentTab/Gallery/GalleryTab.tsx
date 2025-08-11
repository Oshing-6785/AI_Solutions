import React from "react";
import API from "@/services/api";
import { Gallery } from "./types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import GallerySearch from "./GallerySearch";
import GalleryList from "./GalleryList";
import GalleryForm from "./GalleryForm";
import GalleryView from "./GalleryView";
import GalleryStats from "./GalleryStats";

const GalleryTab: React.FC = () => {
  const [items, setItems] = React.useState<Gallery[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // filters
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<Gallery["category"] | "All">("All");
  const [publishedOnly, setPublishedOnly] = React.useState(false);
  const [featuredOnly, setFeaturedOnly] = React.useState(false);
  const [visibleOnly, setVisibleOnly] = React.useState(false);

  // dialogs
  const [openForm, setOpenForm] = React.useState(false);
  const [selected, setSelected] = React.useState<Gallery | null>(null);

  const [openView, setOpenView] = React.useState(false);
  const [viewItem, setViewItem] = React.useState<Gallery | null>(null);

  const fetchGalleries = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get<{ galleries: Gallery[] }>("/gallery");
      setItems(data.galleries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((g) => {
      if (category !== "All" && g.category !== category) return false;
      if (publishedOnly && !g.published) return false;
      if (featuredOnly && !g.featured) return false;
      if (visibleOnly && !g.isActive) return false;

      if (!q) return true;
      const hay = `${g.title} ${g.content} ${g.location || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, category, publishedOnly, featuredOnly, visibleOnly, search]);

  const onCreate = () => {
    setSelected(null);
    setOpenForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        <Button onClick={onCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Item
        </Button>
      </div>

      {/* Stats */}
      <GalleryStats items={items} />

      {/* Filters */}
      <GallerySearch
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        publishedOnly={publishedOnly}
        setPublishedOnly={setPublishedOnly}
        featuredOnly={featuredOnly}
        setFeaturedOnly={setFeaturedOnly}
        visibleOnly={visibleOnly}
        setVisibleOnly={setVisibleOnly}
      />

      {/* List */}
      <GalleryList
        items={filtered}
        loading={loading}
        setSelected={(g) => {
          setSelected(g);
          setOpenForm(true);
        }}
        setOpen={setOpenForm}
        setViewItem={setViewItem}
        setOpenView={setOpenView}
        refetch={fetchGalleries}
      />

      {/* Create/Edit Dialog */}
      <GalleryForm
        open={openForm}
        setOpen={setOpenForm}
        selected={selected}
        refetch={fetchGalleries}
      />

      {/* View Dialog */}
      <GalleryView open={openView} setOpen={setOpenView} gallery={viewItem} />
    </div>
  );
};

export default GalleryTab;
