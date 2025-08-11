import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectList from "./projectList";
import ProjectDialog from "./ProjectDialog";
import { Project } from "./types";
import API from "@/services/api";
import { toast } from "sonner";

const ProjectTab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // load active + hidden
      const res = await API.get("/projects/", {
        params: { includeInactive: true },
      });
      setProjects(res.data.data || []);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = () => {
    setSelectedProject(null);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Manage Projects</h2>
            <p className="text-muted-foreground">
              View, add, and edit your projects.
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-elegant p-6">
          <ProjectList
            projects={projects}
            loading={loading}
            setSelectedProject={setSelectedProject}
            setOpen={setOpen}
            fetchProjects={fetchProjects}
          />
        </div>

        <ProjectDialog
          open={open}
          setOpen={setOpen}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onSuccess={() => {
            fetchProjects();
            setOpen(false);
            setSelectedProject(null);
          }}
        />
      </div>
    </div>
  );
};

export default ProjectTab;
