import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";
import { Project } from "./types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  onSuccess: () => void;
}

const ProjectDialog: React.FC<Props> = ({
  open,
  setOpen,
  selectedProject,
  setSelectedProject,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedProject ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add or edit a project.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          initialData={selectedProject}
          onClose={() => {
            setOpen(false);
            setSelectedProject(null);
          }}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
