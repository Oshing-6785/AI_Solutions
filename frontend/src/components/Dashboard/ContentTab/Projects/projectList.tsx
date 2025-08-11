import React from "react";
import API from "@/services/api";
import { Project } from "./types";
import { iconMap } from "./iconMap";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Key, Wrench } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import FoldableDescription from "./FoldableDescription";
import FoldableFeatures from "./FoldableFeatures";
import { CardTitle } from "@/components/ui/card";

interface Props {
  projects: Project[];
  loading: boolean;
  setSelectedProject: (project: Project | null) => void;
  setOpen: (open: boolean) => void;
  fetchProjects: () => Promise<void> | void; 
}

const ProjectList: React.FC<Props> = ({
  projects,
  loading,
  setSelectedProject,
  setOpen,
  fetchProjects,
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

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleDelete = (id: string) =>
    withPending(id, async () => {
      if (!confirm("Are you sure you want to delete this project?")) return;

      try {
        await API.delete(`/projects/${id}`);
        toast.success("Project deleted");
        try {
          await Promise.resolve(fetchProjects());
        } catch (e) {
          console.warn("Refetch failed after delete:", e);
        }
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "Failed to delete");
      }
    });

  const toggleVisibility = async (id: string, nextIsActive: boolean) => {
    try {
      await API.patch(`/projects/${id}/visibility`, { isActive: nextIsActive });
      toast.success(`Project ${nextIsActive ? "visible" : "hidden"} successfully`);
      fetchProjects();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to update visibility");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const Icon = iconMap[project.icon];
        const dateLabel = project.date?.[0] || "";
        const isBusy = pending.has(project._id!);

        return (
          <div
            key={project._id}
            className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all">
                {Icon && <Icon className="h-6 w-6 text-primary-foreground" />}
              </div>
              {project.badge && (
                <span className="bg-gradient-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                  {project.badge}
                </span>
              )}
            </div>

            <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>

            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {project.company_name || "Company"}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  project.process === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {project.process}
              </span>
              {dateLabel && (
                <span className="text-xs text-muted-foreground">{dateLabel}</span>
              )}
            </div>

            <FoldableDescription description={project.description} />

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Key className="w-4 h-4" />
                <h4 className="font-semibold text-sm">Key Results:</h4>
              </div>
              <FoldableFeatures features={project.key_results || []} />
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="w-4 h-4" />
                <h4 className="font-semibold text-sm">Technologies Used:</h4>
              </div>
              <FoldableFeatures features={project.technologies_used || []} />
            </div>

            <p className="text-xs text-muted-foreground mb-2">
              Duration: {project.duration} | Team Size: {project.team_size}
            </p>

            {/* Visibility Toggle  */}
            <div className="mb-4 flex items-center gap-2">
              <Switch
                id={`visibility-switch-${project._id}`}
                checked={!!project.isActive}
                onCheckedChange={(checked) => toggleVisibility(project._id!, checked)}
              />
              <label
                htmlFor={`visibility-switch-${project._id}`}
                className="text-sm font-medium"
              >
                {project.isActive ? "Visible on Projects" : "Hidden"}
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                aria-label="Edit project"
                onClick={() => handleEdit(project)}
                disabled={isBusy}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-2"
                aria-label="Delete project"
                onClick={() => handleDelete(project._id!)}
                disabled={isBusy}
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

export default ProjectList;
