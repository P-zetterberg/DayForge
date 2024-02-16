import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  let { data: generations, error: err } = await locals.supabase
    .from("generations")
    .select("id, created_at, user_id, metadata")
    .order("created_at", { ascending: false });

  if (!err) {
    return { generations };
  }

  error(404, "Not found");
}
