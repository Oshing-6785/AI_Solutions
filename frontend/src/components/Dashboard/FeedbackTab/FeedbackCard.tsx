import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Star,
  Eye,
  Pencil,
  Key,
  Building,
  BriefcaseBusiness,
} from "lucide-react";
import { Feedback } from "./types";

interface Props {
  feedback: Feedback;
  onView: (fb: Feedback) => void;
  onEdit: (fb: Feedback) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackCard({
  feedback,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">{feedback.name}</span>
              <Badge variant="outline">{feedback.rating}★</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Key className="w-3 h-3" />
              ID: {feedback._id}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness className="w-4 h-4" />
              Job Title:{feedback.job_title}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4" />
              {feedback.company_name}
            </div>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < feedback.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView(feedback)}
            >
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(feedback)}
            >
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(feedback._id)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
          {feedback.comment}
        </p>
        <p className="text-xs text-right text-muted-foreground">
          Submitted: {new Date(feedback.submitted_at).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
