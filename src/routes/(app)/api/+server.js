import { OPENAI_API_KEY, OPENAI_ORG_KEY } from "$env/static/private";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: OPENAI_ORG_KEY,
  apiKey: OPENAI_API_KEY,
});
let systemPromt = { role: "system", content: "You are a helpful assistant." };

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const requestData = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [
      systemPromt,
      {
        role: "user",
        content: "Hello",
      },
    ],
    model: "gpt-4",
    stream: true,
  });
  return new Response(completion.response.body, {
    headers: {
      "cache-control": "no-cache",
      "content-type": "text/event-stream",
    },
  });
}
