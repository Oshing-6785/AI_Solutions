const express = require("express");
const router = express.Router();
const { handleChatbotMessage } = require("../controllers/chatBot.controllers");

router.post("/assist", handleChatbotMessage);

module.exports = router;
