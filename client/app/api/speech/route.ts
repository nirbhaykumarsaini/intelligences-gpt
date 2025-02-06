import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure API key exists
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-audio-preview",
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      messages: [{ role: "user", content: prompt }],
      store: true,
    });

    // ✅ Ensure choices exist and audio data is available
    const audioData = response.choices?.[0]?.message?.audio?.data;

    if (!audioData) {
      return NextResponse.json({ error: "No audio data received" }, { status: 500 });
    }

    return NextResponse.json({ audio: audioData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || "Something went wrong" }, { status: (error as any)?.status || 500 });
    }
  }
}
