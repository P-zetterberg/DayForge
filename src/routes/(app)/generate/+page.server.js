/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  try {
    // const response = await fetch(
    //   `http://localhost:3000/dashboard/list-widgets?dashboardId=${locals.userData.dashboardId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    // let res = await response.json()
    // return {
    //   widgets: res,
    // }
  } catch (error) {}
}
