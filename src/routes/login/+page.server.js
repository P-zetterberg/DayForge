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
  login: async ({ request, locals, url }) => {
    const provider = url.searchParams.get("provider");

    if (provider) {
      const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `http://localhost:5173/auth/callback`,
        },
      });
      if (err) {
        return fail(400, {
          message: "Something went wrong.",
        });
      }
      redirect(303, data.url);
    }

    const body = Object.fromEntries(await request.formData());
    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status == 400) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      return fail(500, {
        message: "Something went wrong",
      });
    }

    redirect(303, "/generate");
  },
};
