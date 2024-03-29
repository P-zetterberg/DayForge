import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.supabase.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status == 400) {
        redirect(303, "/login");
      }
    }
    redirect(303, "/dashboard");
  },
};
