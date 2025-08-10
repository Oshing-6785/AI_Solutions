import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SolutionList from "./SolutionList";
import SolutionDialog from "./SolutionDialog";
import { Solution } from "./types";
import API from "@/services/api";
import { toast } from "sonner";

const SolutionTab = () => {
  const [open, setOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/solutions/");
      setSolutions(res.data.data);
    } catch {
      toast.error("Failed to load solutions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleAdd = () => {
    setSelectedSolution(null);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Solutions</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Solution
        </Button>
      </div>

      {/* Pass solutions to SolutionList */}
      <SolutionList
        solutions={solutions}
        loading={loading}
        setSelectedSolution={setSelectedSolution}
        setOpen={setOpen}
        fetchSolutions={fetchSolutions} 
      />

      <SolutionDialog
        open={open}
        setOpen={setOpen}
        selectedSolution={selectedSolution}
        setSelectedSolution={setSelectedSolution}
        onSuccess={() => {
          fetchSolutions();
          setOpen(false);
          setSelectedSolution(null);
        }}
      />
    </div>
  );
};

export default SolutionTab;
