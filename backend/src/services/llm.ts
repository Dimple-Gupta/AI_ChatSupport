import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
 'AIzaSyBILhwDofsiaG4z5lthXM8Fx-iRHJ1PvAE'
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const SYSTEM_PROMPT = `
You are a helpful support agent for a small e-commerce store.

FAQs:
- Shipping: Ships worldwide in 5–7 business days.
- Returns: 30-day hassle-free returns.
- Support hours: Mon–Fri, 9am–6pm IST.
`;

type HistoryMessage = {
  sender: string;
  text: string;
};

export async function generateReply(
  history: HistoryMessage[],
  userMessage: string
): Promise<string> {
  try {
    // Gemini does not use "system" role directly like OpenAI,
    // so we prepend it as context.
    const prompt = `
${SYSTEM_PROMPT}

Conversation so far:
${history
  .map(
    (m) =>
      `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`
  )
  .join("\n")}

User: ${userMessage}
Assistant:
`;

    const result = await model.generateContent(prompt);

    return result.response.text() || "No response";
  } catch (error) {
    console.error("Gemini LLM error:", error);
    return "Sorry, I'm having trouble responding right now.";
  }
}



// import OpenAI from "openai";
// import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const SYSTEM_PROMPT = `
// You are a helpful support agent for a small e-commerce store.

// FAQs:
// - Shipping: Ships worldwide in 5–7 business days.
// - Returns: 30-day hassle-free returns.
// - Support hours: Mon–Fri, 9am–6pm IST.
// `;

// export async function generateReply(
//   history: { sender: string; text: string }[],
//   userMessage: string
// ): Promise<string> {
//   try {
//     const messages: ChatCompletionMessageParam[] = [
//       {
//         role: "system",
//         content: SYSTEM_PROMPT,
//       },
//       ...history.map(
//         (m): ChatCompletionMessageParam => ({
//           role: m.sender === "user" ? "user" : "assistant",
//           content: m.text,
//         })
//       ),
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ];

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages,
//       max_tokens: 200,
//     });

//     return response.choices[0]?.message?.content ?? "No response";
//   } catch (error) {
//     console.error("LLM error:", error);
//     return "Sorry, I'm having trouble responding right now.";
//   }
// }
