import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json(); // Ensure this is awaited properly

        const response = await openai.images.edit({
            image: fs.createReadStream("otter.png"),
            mask: fs.createReadStream("mask.png"),
            prompt: prompt,
        })

        return NextResponse.json({ completion: response.data }, { status: 200 });
    }catch (error) {
        if(error instanceof Error){
          return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
        }
    }
}
