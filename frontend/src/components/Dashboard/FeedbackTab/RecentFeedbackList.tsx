import { Card, CardContent } from "@/components/ui/card";
import { Feedback } from "./types";

export default function RecentFeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">Recent Feedbacks</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          {feedbacks.map((fb) => (
            <li key={fb._id}>
              {fb.name} – {new Date(fb.submitted_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
