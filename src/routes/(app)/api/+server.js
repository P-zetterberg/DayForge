import { OPENAI_API_KEY, OPENAI_ORG_KEY } from "$env/static/private";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: OPENAI_ORG_KEY,
  apiKey: OPENAI_API_KEY,
});
let systemPrompt = { role: "system", content: "You are a helpful assistant." };

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
  try {
    await subtractCredit(locals);
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

    let savedData = await saveGeneratedText(completion.choices[0], locals);

    if (!savedData) {
      throw Error({ message: "Could not save data!", status: 404 });
    }

    const res = new Response(JSON.stringify(completion?.choices[0]), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    return new Response(error);
  }
}

async function saveGeneratedText(text, locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser(); //Bättre med session kolla upp
  const { error, data } = await locals.supabase
    .from("generations")
    .insert([
      {
        generated_text: text,
        user_id: user.id,
      },
    ])
    .select();

  if (error) return false; //Kasta error fånfa typeof error return error response iställer för ingen new Res
  return data;
}

async function subtractCredit(locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser(); //Bättre med session kolla upp
  await locals.supabase.rpc("Decrement_credit_by_1", {
    row_id: user.id,
  });
}
