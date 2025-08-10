import { Button } from "@/components/ui/button";
import { Feedback } from "./types";

interface FeedbackModalViewProps {
  feedback: Feedback;
  onClose: () => void;
}

export default function FeedbackModalView({ feedback, onClose }: FeedbackModalViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[500px]">
        <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
        <p><strong>ID:</strong> {feedback._id}</p>
        <p><strong>Name:</strong> {feedback.name}</p>
        <p><strong>Company:</strong> {feedback.company_name}</p>
        <p><strong>Job Title:</strong> {feedback.job_title}</p>
        <p><strong>Rating:</strong> {feedback.rating} / 5</p>
        <p><strong>Comment:</strong> {feedback.comment}</p>
        <p className="text-sm text-muted-foreground">
          <strong>Submitted:</strong> {new Date(feedback.submitted_at).toLocaleString()}
        </p>
        <div className="flex justify-end mt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
