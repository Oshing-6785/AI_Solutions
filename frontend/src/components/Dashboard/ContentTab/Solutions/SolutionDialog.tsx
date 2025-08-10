import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SolutionForm from "./SolutionForm";
import { Solution } from "./types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedSolution: Solution | null;
  setSelectedSolution: (solution: Solution | null) => void;
  onSuccess: () => void;  
}

const SolutionDialog: React.FC<Props> = ({
  open,
  setOpen,
  selectedSolution,
  setSelectedSolution,
  onSuccess,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedSolution ? "Edit Solution" : "Add New Solution"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add or edit a solution.
          </DialogDescription>
        </DialogHeader>
        <SolutionForm
          initialData={selectedSolution}
          onClose={() => {
            setOpen(false);
            setSelectedSolution(null);
          }}
          onSuccess={onSuccess}  
        />
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
