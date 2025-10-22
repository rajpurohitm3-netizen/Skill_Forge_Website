import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User asked:", userMessage);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 80, // force short responses
      },
    });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "You are a study assistant chatbot. Always reply in 2–3 short, simple sentences. Be concise and avoid long explanations.\n\n" +
                userMessage,
            },
          ],
        },
      ],
    });

    const botReply =
      response.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠ No reply from Gemini";

    console.log("Gemini reply:", botReply);
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error in Gemini API:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
