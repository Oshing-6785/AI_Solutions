import React from "react";
import API from "@/services/api";
import { Solution } from "./types";
import { iconMap } from "./iconMap";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Key } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import FoldableDescription from "./FoldableDescription";
import FoldableFeatures from "./FoldableFeatures";
import { Card, CardTitle } from "@/components/ui/card";

interface Props {
  solutions: Solution[];
  loading: boolean;
  setSelectedSolution: (solution: Solution | null) => void;
  setOpen: (open: boolean) => void;
  fetchSolutions: () => void;
}

const SolutionList: React.FC<Props> = ({
  solutions,
  loading,
  setSelectedSolution,
  setOpen,
  fetchSolutions,
}) => {
  const handleEdit = (solution: Solution) => {
    setSelectedSolution(solution);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;

    try {
      await API.delete(`/solutions/${id}`);
      toast.success("Solution deleted");
      fetchSolutions();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleVisibility = async (id: string, nextIsActive: boolean) => {
    try {
      await API.patch(`/solutions/${id}/visibility`, {
        isActive: nextIsActive,
      });
      toast.success(
        `Solution ${nextIsActive ? "visible" : "hidden"} successfully`
      );
      fetchSolutions();
    } catch {
      toast.error("Failed to update visibility");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {solutions.map((solution) => {
        const Icon = iconMap[solution.icon];
        return (
          <div
            key={solution._id}
            className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
                {Icon && <Icon className="h-6 w-6 text-primary-foreground" />}
              </div>
              {solution.badge && (
                <span className="bg-gradient-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                  {solution.badge}
                </span>
              )}
            </div>

              <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {solution.title}
              </CardTitle>
            

            <FoldableDescription description={solution.description} />

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Key className="w-4 h-4" />
                <h4 className="font-semibold text-sm">Key Features:</h4>
              </div>
              <FoldableFeatures features={solution.features || []} />
            </div>

            {/* Visibility Toggle */}
            <div className="mb-4 flex items-center gap-2">
              <Switch
                id={`visibility-switch-${solution._id}`}
                checked={solution.isActive}
                onCheckedChange={(checked) =>
                  toggleVisibility(solution._id!, checked)
                }
              />
              <label
                htmlFor={`visibility-switch-${solution._id}`}
                className="text-sm font-medium"
              >
                {solution.isActive ? "Visible on Solutions" : "Hidden"}
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                aria-label="Edit solution"
                onClick={() => handleEdit(solution)}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-2"
                aria-label="Delete solution"
                onClick={() => handleDelete(solution._id!)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SolutionList;
