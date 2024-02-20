export function promptCreator(formValues) {
  return `
    The ${formValues.date} i am going to ${formValues.city} in ${formValues.country.name} i am staying close to the area ${formValues.area}, my day starts ${formValues.dayStart} in the morning and end around ${formValues.dayEnd}.
  I want you to come up with and plan some activities / sightseeing i can do throughout the day, the activities should be within walking or short cab ride distance of the area i am staying in. If there are any holiday or special events happening during this date try to includes one of those.
   The size of our group is ${formValues.groupSize}, take this into account. You should include atleast one of the following activities: ${formValues.includes}. These includes should start with: "As per your request".
   & you should exclude activities based on all of the following: ${formValues.excludes}. There shall be planned breaks for breakfast, lunch & dinner but you dont give suggestions where to eat. The breaks should not be longer than an hour and never shorter than 30minutes. Your response should be in markdown, this is important! You dont need to confirm or greet at the start of your response just give back the generated day. The format should follow along the line of: ### start time - end time: "activity" followed by newline for the content.
    at the end you should add the following in bold: "NOTE: Be sure to confirm the opening times of all attractions as they may vary or be affected by public holidays."
   `;
}
