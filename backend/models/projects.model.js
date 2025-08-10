const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    enum: [
      "Building",
      "Brain",
      "Zap",
      "MessageSquare",
      "Lightbulb",
      "Cog",
      "Shield",
      "Globe",
      "Users",
    ],
  },
});
