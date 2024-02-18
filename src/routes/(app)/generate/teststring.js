import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
export const dayString = `
# Tokyo Day Trip Plan for 2024-02-21
Here's a schedule of suggested activities for your day in Tokyo, along with some recommended places to eat. 

## Morning
- **8:00 - Wake Up & Freshen Up** 
- **9:30 - Visit Tsukiji Fish Market**  
Start your morning with a visit to the Tsukiji Fish Market, the world's largest fish market. This popular tourist spot is also home to many sushi restaurants. 

    - Address: 5-2-1 Tsukiji, Chuo, Tokyo 104-0045, Japan
    - Estimated Cab Fare: 1,700JPY

- **10:30 - Breakfast at Sushi Dai**
Have your breakfast at Sushi Dai, one of the most famous sushi restaurants in Tokyo, located in Tsukiji Market.

    - Address: 5-2-1 Tsukiji, Chuo City, Tokyo 104-0045, Japan
    - Price: About 3,500JPY for Omakase Set

## Mid-Day
- **12:00 - Visit Senso-ji Temple**  
After breakfast, take a cab ride to Tokyo's oldest temple, Senso-ji.

    - Address: 2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan
    - Estimated Cab Fare: 1,600JPY

- **13:00 - Lunch at Kaminarimon Sabagin**
Located in Asakusa, enjoy your lunch at Kaminarimon Sabagin. They serve great grilled fish set meals.
  
    - Address: 1-39-11 Asakusa, Taito City, Tokyo 111-0032, Japan
    - Price: Around 1,600JPY for a set meal
   
## Afternoon 
- **14:30 - Visit Ueno Park** 
Ride to Ueno Park, where you can visit Ueno Zoo, the National Museum of Western Art, or just relax in the green spaces.
  
    - Address: Uenokoen, Taito City, Tokyo 110-0007, Japan
    - Estimated Cab Fare: 1,300JPY
    
## Evening
- **17:30 - Early Dinner at Gonpachi Nishiazabu**
For an early dinner, visit Gonpachi Nishiazabu, the restaurant that inspired the set of the movie "Kill Bill".
  
    - Address: Japan, 〒106-0031 Tokyo, Minato City, Nishiazabu, 1 Chome−13−11
    - Price: Around 4,000JPY for a meal

- **19:00 - Visit Tokyo Skytree**  
End your day with a magnificent view of Tokyo at night from the top of Tokyo Skytree, the tallest structure in Japan.
  
    - Address: 1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan
    - Admission Fee: 2,060JPY
    - Estimated Cab Fare: 3,500JPY
    
## Budget Breakdown
- Cab Fares: 9,100JPY
- Meals: 9,100JPY
- Skytree Admission: 2,060JPY
- **Total: 20,260JPY**

Note that the total is a little bit over the budget due to the cab fare to Skytree. If you need to fit the budget exactly, consider taking public transportation for some parts of your trip. Enjoy your day in Tokyo!
`;
export const otherString = `
## Barcelona Day Plan\n\nGood morning! Here's your day plan for exploring Barcelona, specifically around the area L'Esquerra de l'Eixample. We're starting the day at 8:00 and wrapping things up at 21:00. \n\n### 8:00 - 9:00: Morning Walk \nBegin your day with a serene morning walk through **L'Esquerra de l'Eixample** neighbourhood. This is a great way to get a feel for your local surroundings.\n\n### 9:00 - 10:00: Breakfast Break\nYou've got an hour set aside for breakfast. \n\n### 10:00 - 12:00: Visit Casa Milà\nCasa Milà, also known as **La Pedrera**, is a short walk away. Designed by Antonio Gaudi, it's a must-visit for its unique architecture. \n\n### 12:00 - 14:00: Stroll Passeig de Gracia\nTake a leisurely stroll back towards the **Passeig de Gracia**, one of the major avenues in Barcelona known for its shopping and noteworthy architecture. \n\n### 14:00 - 15:00: Lunch Break\nYou've got an hour set aside for lunch. Utilize this time to rest and revive for the second part of the day. \n\n### 15:00 - 17:00: Visit Casa Batlló\nAnother masterpiece by Gaudi, **Casa Batlló** is commonly known for its dragon-inspired design. It's an easy walk from Passeig de Gracia.\n\n### 17:00 - 18:30: Plaza de Catalonia and La Rambla\nMake your way down to **Plaza Catalonia**. It's one of Barcelona's busiest squares and just a short distance from La Rambla, the city's famous pedestrian street. \n\n### 18:30 - 20:00: Dinner Break\nAnother hour and a half for you to have dinner. \n\n### 20:00 - 21:00: Magic Fountain\nFinish the day with a cheerful note by attending the free **Magic Fountain show at Montjuic**. It's a short cab ride from Plaza Catalunya.\n\nRemember to always have a map handy to make sure you're heading in the right direction. Enjoy your day in Barcelona!
`;
export function promptFromFormData(formObject) {}
export function safeStringGenerator(string) {
  return DOMPurify.sanitize(marked.parse(string));
}
