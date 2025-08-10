import { Button } from "@/components/ui/button";
import { Feedback } from "./types";

interface FeedbackModalEditProps {
  feedback: Feedback;
  onChange: (updated: Feedback) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function FeedbackModalEdit({
  feedback,
  onChange,
  onCancel,
  onSubmit,
}: FeedbackModalEditProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[500px] space-y-4">
        <h2 className="text-xl font-bold mb-2">Edit Feedback</h2>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={feedback.name}
            onChange={(e) => onChange({ ...feedback, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={feedback.company_name}
            onChange={(e) => onChange({ ...feedback, company_name: e.target.value })}
            placeholder="Company"
          />

          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={feedback.job_title}
            onChange={(e) => onChange({ ...feedback, job_title: e.target.value })}
            placeholder="Company"
          />
          
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={feedback.rating}
            onChange={(e) => onChange({ ...feedback, rating: parseInt(e.target.value) })}
            placeholder="Rating (0–5)"
            min={0}
            max={5}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            value={feedback.comment}
            onChange={(e) => onChange({ ...feedback, comment: e.target.value })}
            placeholder="Comment"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
