import { NextRequest, NextResponse } from 'next/server';
import { main } from '@/libs/openai/llm';

export const runtime = 'edge';

export async function POST(req: Request) {
  const encoder = new TextEncoder();

  try {
    const { message, transcript } = await req.json();
    if (!message || typeof message !== "string" || message.length >= 3000) {
      return new NextResponse("Message invalid", { status: 400 });
    }

    // Kirim ke LLM (Gemini)
    const content = await main(message, transcript);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of content) {
          const text = chunk.choices?.[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      }
    })
    return new NextResponse(stream);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
