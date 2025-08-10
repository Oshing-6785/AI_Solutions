const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    company_name: {
      type: String,
      required: true,
      minlength: [2, "Company name must be at least 2 characters long"],
      maxlength: [30, "Company name must be at most 30 characters long"],
    },

    job_title: {
    type: String,
    required: true,
    minlength: [2, "Job title must be at least 2 characters long"],
    maxlength: [30, "Job title must be at most 30 characters long"],
  },
  
    rating: {
      type: Number,
      required: true,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
      required: true,
      minlength: [10, "Feedback must be at least 10 characters long"],
      maxlength: [500, "Feedback must be at most 500 characters long"],
    },
    is_approved: {
      type: Boolean,
      default: false,
    },

    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("Feedback", feedbackSchema);
module.exports = feedbackModel;
