import { NextRequest, NextResponse } from 'next/server';
import { main } from '@/libs/openai/llm';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
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
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        controller.close();
      }
    })
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}