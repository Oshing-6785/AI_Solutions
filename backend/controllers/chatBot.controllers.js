const { getChatbotReply } = require("../services/chatBot.service");

module.exports.handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await getChatbotReply(message);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
