/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  let session = await event.locals.getSession()
  let userData = event.locals.userData

  return {
    session: session,
    userData: userData,
  }
}
