import { getUserIdFromToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Chat from "@/lib/models/Chat";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
   const userId = await getUserIdFromToken(req)
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" },{status:400})
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Ensure you have access to this model
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
    });

    await dbConnect();

    const user = await User.findById(userId);

    if(!user){
      return NextResponse.json({ error: "User does not exists" },{status:401})
    }
     // Check the number of chats for the user
     const chatCount = await Chat.countDocuments({ user: userId });

     if (chatCount >= 50) {
      const oldestChat = await Chat.findOne({ user: userId }).sort({ createdAt: 1 });
      if (oldestChat) {
        await Chat.deleteOne({ _id: oldestChat._id }); // Use deleteOne instead of remove
      }
    }

    const newChat = new Chat({
      user,
      prompt
    });

    await newChat.save()

    return NextResponse.json({ completion: response.choices[0].message.content }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({ error: error.message || "Something went wrong" }, { status:500 });
    }
  }
}



export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json({ chats }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({ error: error.message || "Something went wrong" }, { status:500 });
    }
  }
}
