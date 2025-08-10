import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import API from "@/services/api";

import {
  Feedback,
  FeedbackCard,
  FeedbackSearch,
  RecentFeedbackList,
  FeedbackModalView,
  FeedbackModalEdit,
} from "../FeedbackTab"; 


interface FeedbackTabProps {
  feedbacks?: Feedback[];
  recentFeedbacks?: Feedback[];
  loadingFeedbacks: boolean;
  handleDelete: (id: string) => void;
  searchField: string;
  setSearchField: (val: string) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
  searchError?: string;
}

export default function FeedbackTab({
  feedbacks = [],
  recentFeedbacks = [],
  loadingFeedbacks,
  handleDelete,
  searchField,
  setSearchField,
  searchValue,
  setSearchValue,
  handleSearch,
  handleReset,
  searchError,
}: FeedbackTabProps) {
  const [viewedFeedback, setViewedFeedback] = useState<Feedback | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  const handleSubmitEdit = async () => {
    if (!editingFeedback) return;

    try {
      const original = feedbacks.find((fb) => fb._id === editingFeedback._id);
      if (!original) return;

      const changedFields: string[] = [];
      if (editingFeedback.name !== original.name) changedFields.push("Name");
      if (editingFeedback.company_name !== original.company_name) changedFields.push("Company");
      if (editingFeedback.rating !== original.rating) changedFields.push("Rating");
      if (editingFeedback.comment !== original.comment) changedFields.push("Comment");

      await API.put(`/feedback/${editingFeedback._id}`, {
        name: editingFeedback.name,
        company_name: editingFeedback.company_name,
        rating: editingFeedback.rating,
        comment: editingFeedback.comment,
      }, {
        withCredentials: true,
      });

      setEditingFeedback(null);
      handleReset();

      toast.success("Feedback updated", {
        description:
          changedFields.length > 0
            ? `Updated field(s): ${changedFields.join(", ")}`
            : "No changes were made",
      });
    } catch (error: any) {
      console.error("Error updating feedback:", error);
      toast.error("Update failed", {
        description: error?.response?.data?.message || "Network/server error occurred.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Feedback</h2>
        <Badge variant="secondary">{feedbacks.length} total</Badge>
      </div>

      {/* Search Section */}
      <FeedbackSearch
        searchField={searchField}
        setSearchField={setSearchField}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleReset={handleReset}
        searchError={searchError}
      />

      {/* Recent Feedback Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <RecentFeedbackList feedbacks={recentFeedbacks} />
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {loadingFeedbacks ? (
          <p>Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-muted-foreground">No feedback available.</p>
        ) : (
          feedbacks.map((feedback) => (
            <FeedbackCard
              key={feedback._id}
              feedback={feedback}
              onView={setViewedFeedback}
              onEdit={setEditingFeedback}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {viewedFeedback && (
        <FeedbackModalView feedback={viewedFeedback} onClose={() => setViewedFeedback(null)} />
      )}

      {editingFeedback && (
        <FeedbackModalEdit
          feedback={editingFeedback}
          onChange={setEditingFeedback}
          onCancel={() => setEditingFeedback(null)}
          onSubmit={handleSubmitEdit}
        />
      )}
    </div>
  );
}
