const e = require("express");
const mongoose = require("mongoose");
const contactRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [20, "Name must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits long"],
  },
  company_name: {
    type: String,
    required: true,
    unique: false,
    minlength: [2, "Company name must be at least 2 characters long"],
    maxlength: [30, "Company name must be at most 30 characters long"],
  },
  country: {
    type: String,
    required: true,
    minlength: [2, "Country name must be at least 2 characters long"],
    maxlength: [30, "Country name must be at most 30 characters long"],
  },
  job_title: {
    type: String,
    required: true,
    minlength: [2, "Job title must be at least 2 characters long"],
    maxlength: [30, "Job title must be at most 30 characters long"],
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
        minlength: [10, "Message must be at least 10 characters long"],
        maxlength: [50000, "Message must be at most 50000 characters long"],
      },
      submitted_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const contactModel = mongoose.model("Contact", contactRequestSchema);
module.exports = contactModel;
