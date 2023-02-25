import messageManager from "../dao/mongo/messages/messageManager.mongo.js";
import Router from "express";

const router = Router();
const messages = new messageManager();

router.get("/", async (req, res) => {
  const response = await messages.find();
  res.json({ response });
});

router.post("/", async (req, res) => {
  try {
    const { userEmail, userMessage } = req.body;
    const dataMessage = {
      user: userEmail,
      message: userMessage,
    };

    const response = await messages.create(dataMessage);

    res.json({ response: response });
  } catch (error) {}
});

router.delete("/", async (req, res) => {
  try {
    const response = await messages.delete();
    res.json({ result: "succes", payload: response });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;