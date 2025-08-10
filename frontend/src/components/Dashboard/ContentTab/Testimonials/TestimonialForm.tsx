import { useState } from "react";
import API from "@/services/api";
import { Testimonial } from "./types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TestimonialFormProps {
  initialData: Testimonial | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TestimonialForm({
  initialData,
  onSuccess,
  onCancel,
}: TestimonialFormProps) {
  const [formData, setFormData] = useState<Testimonial>(
    initialData || {
      name: "",
      company_name: "",
      job_title: "",
      comment: "",
      rating: 0,
    }
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?._id) {
        // Update
        await API.put(`/feedback/${initialData._id}`, formData);
        toast.success("Testimonial updated");
      } else {
        // Create
        await API.post("/feedback/create", formData);
        toast.success("Testimonial added");
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg space-y-4 bg-white shadow-md"
    >
      <h3 className="text-xl font-bold mb-2">
        {initialData ? "Edit Testimonial" : "Add New Testimonial"}
      </h3>

      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Client Name"
        required
      />

      <Input
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />

      {/* <Input
        name="job_title"
        value={formData.job_title || ""}
        onChange={handleChange}
        placeholder="Job Title"
        required
      /> */}

      <Textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Client's feedback"
        rows={4}
        required
      />

      <Input
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating (0 to 5)"
        type="number"
        min={0}
        max={5}
        required
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
