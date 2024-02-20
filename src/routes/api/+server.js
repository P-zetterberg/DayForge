import { OPENAI_API_KEY, OPENAI_ORG_KEY } from "$env/static/private";
import { promptCreator } from "./_prompt/mainPrompt";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: OPENAI_ORG_KEY,
  apiKey: OPENAI_API_KEY,
});
let systemPrompt = {
  role: "system",
  content:
    "You are a day activity planner, you take in user input and plan a day based on those inputs.",
};

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
          content: promptCreator(requestData.content), //Görs om till separat function som är prompt + form values.
        },
      ],
      model: "gpt-4",
      stream: false,
      temperature: 0,
    });
    // TODO error från GPT koll igen fake key för ez error

    requestData.completion = {
      message: {
        content: "123",
      },
    };
    const completedObj = {
      completion: completion.choices[0],
      metadata: requestData.content,
    };

    let savedData = await saveGeneratedText(completedObj, locals);
    if (!savedData) {
      addCredit(locals);
      throw Error("Could not save data!");
    }

    const res = new Response(JSON.stringify(completion.choices[0]), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

async function saveGeneratedText(objData, locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();
  const { error, data } = await locals.supabase
    .from("generations")
    .insert({
      generated_text: objData.completion,
      user_id: user.id,
      metadata: objData.metadata,
    })
    .select();

  if (error) return false; //Kasta error fånfa typeof error return error response iställer för ingen new Res
  return data;
}

async function subtractCredit(locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();
  await locals.supabase.rpc("Decrement_credit_by_1", {
    row_id: user.id,
  });
}
async function addCredit(locals) {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();
  await locals.supabase.rpc("Increment_credit_by_1", {
    row_id: user.id,
  });
}
