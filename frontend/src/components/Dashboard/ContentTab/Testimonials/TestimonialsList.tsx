import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Users, Building, Key, Star } from "lucide-react";
import { Testimonial } from "./types";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import API from "@/services/api";

interface TestimonialsListProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onToggle: () => void;
}

export default function TestimonialsList({
  testimonials,
  onEdit,
  onDelete,
  onToggle,
}: TestimonialsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial._id} className="relative hover:shadow-lg">
          <CardContent className="p-6 space-y-4">
            <blockquote className="text-lg italic">"{testimonial.comment}"</blockquote>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <p className="font-semibold">{testimonial.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground">{testimonial.company_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground italic">{testimonial.job_title}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-muted-foreground">Rating: {testimonial.rating} ★</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={testimonial.is_approved}
                    onCheckedChange={async (checked) => {
                      try {
                        await API.patch(`/feedback/${testimonial._id}/approve`, {
                          is_approved: checked,
                        });
                        toast.success(`Testimonial ${checked ? "approved" : "hidden"} from Home`);
                        onToggle();
                      } catch (err) {
                        toast.error("Failed to update visibility");
                      }
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {testimonial.is_approved ? "Visible on Home" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(testimonial)}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(testimonial._id!)}>
                  <Trash className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
