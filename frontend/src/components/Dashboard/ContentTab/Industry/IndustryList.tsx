import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import API from "@/services/api";
import { Industry } from "./types";
import { Trash2, Pencil } from "lucide-react";

interface Props {
  industries: Industry[];
  loading: boolean;
  setSelectedIndustry: (ind: Industry | null) => void;
  setOpen: (open: boolean) => void;
  fetchIndustries: () => void;
}

export default function IndustryList({
  industries,
  loading,
  setSelectedIndustry,
  setOpen,
  fetchIndustries,
}: Props) {
  const handleEdit = (ind: Industry) => {
    setSelectedIndustry(ind);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this industry?")) return;
    try {
      await API.delete(`/industries/${id}`);
      toast.success("Industry deleted");
      fetchIndustries();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleVisibility = async (id: string, next: boolean) => {
    try {
      await API.patch(`/industries/${id}/visibility`, { isActive: next });
      toast.success(`Industry ${next ? "visible" : "hidden"}`);
      fetchIndustries();
    } catch {
      toast.error("Failed to update visibility");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {industries.map((ind) => (
        <div key={ind._id} className="border rounded-lg p-4 hover:shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{ind.name}</h3>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Switch
              checked={!!ind.isActive}
              onCheckedChange={(checked) => toggleVisibility(ind._id!, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {ind.isActive ? "Visible" : "Hidden"}
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => handleEdit(ind)}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(ind._id!)}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
