const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./db/db");
connectToDB();
const adminRouter = require("./routes/admin.routes");
const contactRouter = require("./routes/contact.routes");
const feedbackRouter = require("./routes/feedback.routes");
const chatbotRouter = require("./routes/chatBot.routes");
const postRouter = require("./routes/post.routes");
const industryRouter = require ("./routes/industry.routes")
const solutionRouter = require ("./routes/solution.routes")
const projectRouter = require ("./routes/project.routes")
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);
app.use("/feedback", feedbackRouter);
app.use("/posts", postRouter);
app.use("/chatbot", chatbotRouter);
app.use("/industries", industryRouter)
app.use("/solutions", solutionRouter)
app.use("/projects", projectRouter)



app.get("/", (req, res) => {
  res.send("Hello im responding to client side!");
});

module.exports = app;
