import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import IndustryList from "./IndustryList";
import IndustryDialog from "./IndustryDialog";
import { Industry } from "./types";
import API from "@/services/api";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function IndustryTab() {
  const [open, setOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/industries/"); 
      setIndustries(res.data.data || []);
    } catch {
      toast.error("Failed to load industries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Industries</h2>
        <Button onClick={() => { setSelectedIndustry(null); setOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Industry
        </Button>
      </div>

      <IndustryList
        industries={industries}
        loading={loading}
        setSelectedIndustry={setSelectedIndustry}
        setOpen={setOpen}
        fetchIndustries={fetchIndustries}
      />

      <IndustryDialog
        open={open}
        setOpen={setOpen}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        onSuccess={fetchIndustries}
      />
    </div>
  );
}
