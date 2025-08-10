const ChatbotResponse = require("../models/chatBot.models");

module.exports.getChatbotReply = async (userMessage) => {
  const input = userMessage.toLowerCase();
  const allResponses = await ChatbotResponse.find();

  for (const item of allResponses) {
    if (item.keywords.some((keyword) => input.includes(keyword.toLowerCase()))) {
      return item.response;
    }
  }

  return "That's an interesting question! Please check our Solutions page or contact our team for more information.";
};


