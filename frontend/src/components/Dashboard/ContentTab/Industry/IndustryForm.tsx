import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "@/services/api";
import { toast } from "sonner";
import { Industry } from "./types";

interface Props {
  initialData: Industry | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function IndustryForm({ initialData, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Industry>({ name: "", isActive: true });
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && initialData?._id) {

        await API.put(`/industries/${initialData._id}`, {
          name: form.name,
          isActive: form.isActive,
        });
        toast.success("Industry updated");
      } else {
        
        await API.post(`/industries/create`, {
          name: form.name,
          isActive: form.isActive,
        });
        toast.success("Industry created");
      }
      onSuccess?.();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Operation failed";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-sm font-medium">Industry Name</label>
      <Input
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="e.g., Healthcare"
        required
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
