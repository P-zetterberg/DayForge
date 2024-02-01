import { OPENAI_API_KEY, OPENAI_ORG_KEY } from "$env/static/private";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: OPENAI_ORG_KEY,
  apiKey: OPENAI_API_KEY,
});
let systemPrompt = { role: "system", content: "You are a helpful assistant." };

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const requestData = await request.json();
  const completion = await openai.chat.completions.create({
    messages: [
      systemPrompt,
      {
        role: "user",
        content: requestData.content,
      },
    ],
    model: "gpt-4",
    stream: false,
  });

  //completion.choices[0]
  //completion.response.body

  const res = new Response(JSON.stringify(completion.choices[0]), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
