import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request) {
  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
