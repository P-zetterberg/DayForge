import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  return {
    locals: JSON.stringify(locals),
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  update: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const { data, error: err } = await locals.supabase.auth.updateUser({
      password: body.password,
    });

    if (err) {
      return fail(500, {
        message: "Something went wrong",
      });
    }

    redirect(303, "/generate");
  },
};
