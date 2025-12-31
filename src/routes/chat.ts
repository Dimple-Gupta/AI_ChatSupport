import { Router } from "express";
import { Conversation, Message } from "../models";
import { generateReply } from "../services/llm";

const router = Router();

router.post("/conversation", async (_req, res) => {
  const conversation = await Conversation.create();
  res.json(conversation);
});


router.post("/message", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Empty message" });
  }

  const conversation =
    sessionId
      ? await Conversation.findByPk(sessionId)
      : await Conversation.create();

  await Message.create({
    conversationId: conversation!.id,
    sender: "user",
    text: message,
  });

  const historyModels = await Message.findAll({
  where: { conversationId: conversation!.id },
  order: [["createdAt", "ASC"]],
});

// convert Sequelize objects → simple objects
const history = historyModels.map((m) => ({
  sender: m.get("sender") as string,
  text: m.get("text") as string,
}));

const reply = await generateReply(history, message);

  await Message.create({
    conversationId: conversation!.id,
    sender: "ai",
    text: reply,
  });

  res.json({ reply, sessionId: conversation!.id });
});
router.get("/conversations", async (_, res) => {
  const conversations = await Conversation.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(conversations);
});

router.get("/messages/:id", async (req, res) => {
  const messages = await Message.findAll({
    where: { conversationId: req.params.id },
    order: [["createdAt", "ASC"]],
  });
  res.json(messages);
});

export default router;
