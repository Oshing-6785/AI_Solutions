import { useEffect, useState } from "react";
import API from "@/services/api";
import { Button } from "@/components/ui/button";
import TestimonialsList from "./TestimonialsList";
import TestimonialForm from "./TestimonialForm";
import { Testimonial } from "./types";
import { toast } from "sonner";

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  
  const fetchTestimonials = async () => {
  try {
    const res = await API.get("/feedback/");
    console.log("Feedback response:", res.data);
    setTestimonials(Array.isArray(res.data.feedbacks) ? res.data.feedbacks : []);
  } catch (err) {
    toast.error("Failed to load testimonials");
  }
};

  useEffect(() => {
    fetchTestimonials();
  }, []);

  
  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await API.delete(`/feedback/${id}`);
      toast.success("Testimonial deleted");
      fetchTestimonials();
    } catch (err) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleAddNew = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchTestimonials();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <Button onClick={handleAddNew}>+ Add New</Button>
      </div>

      <TestimonialsList
        testimonials={testimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={fetchTestimonials}
      />

      {isFormOpen && (
        <TestimonialForm
          initialData={selectedTestimonial}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
