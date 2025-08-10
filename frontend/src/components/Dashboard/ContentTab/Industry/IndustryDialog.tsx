import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import IndustryForm from "./IndustryForm";
import { Industry } from "./types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedIndustry: Industry | null;
  setSelectedIndustry: (i: Industry | null) => void;
  onSuccess: () => void;
}

export default function IndustryDialog({
  open,
  setOpen,
  selectedIndustry,
  setSelectedIndustry,
  onSuccess,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedIndustry ? "Edit Industry" : "Add Industry"}</DialogTitle>
          <DialogDescription>Manage an industry’s name and visibility.</DialogDescription>
        </DialogHeader>
        <IndustryForm
          initialData={selectedIndustry}
          onClose={() => {
            setOpen(false);
            setSelectedIndustry(null);
          }}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
