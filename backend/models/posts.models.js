const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title must be at most 100 characters long"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Success_story",
      "Event",
      "Article",
      "Solution_details",
      "Past_works",
    ],
    default: "Article",
  },
  content: {
    type: String,
    required: true,
    minlength: [10, "Content must be at least 10 characters long"],
    maxlength: [2000, "Content must be at most 2000 characters long"],
  },
  image_url: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /^https?:\/\/.+/.test(v);
    },
    message: "Please enter a valid image URL",
  },
},

  created_at: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
