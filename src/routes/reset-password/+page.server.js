import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  reset_password: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const { data, error: err } =
      await locals.supabase.auth.resetPasswordForEmail(body.Email, {
        redirectTo: "http://localhost:5173/auth/callback?next=/update-password",
      });
    if (err) {
      return fail(500, {
        error: "Server error. Please try again later.",
      });
    }
  },
};
