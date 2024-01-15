import { AuthApiError } from "@supabase/supabase-js"
import { fail } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData())
    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    })

    if (err) {
      if (err instanceof AuthApiError && err.status == 400) {
        return fail(400, {
          error: "Invalid credentials",
        })
      }
      return fail(500, {
        message: "Something went wrong",
      })
    }

    throw redirect(303, "/dashboard")
  },
}
