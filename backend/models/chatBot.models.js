const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
  keywords: [String],
  response: String
});

module.exports = mongoose.model('Chatbot', chatbotSchema);
