import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  const { data: day, error: err } = await locals.supabase
    .from("generations")
    .select()
    .single()
    .eq("id", params.id);
  if (!err) {
    return { day };
  }

  error(404, "Not found");
}
