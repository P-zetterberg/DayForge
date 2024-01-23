import { OPENAI_API_KEY, OPENAI_ORG_KEY } from "$env/static/private";
import OpenAI from "openai";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const openai = new OpenAI({
    organization: OPENAI_ORG_KEY,
    apiKey: OPENAI_API_KEY,
  });
  let systemPromt = { role: "system", content: "You are a helpful assistant." };
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        systemPromt,
        {
          role: "user",
          content:
            "Can you please count to 3 & tell me a short story max 20 words about a frog",
        },
      ],
      model: "gpt-4",
    });
    // console.log();
    return new Response(JSON.stringify(completion));
  } catch (error) {}
}
