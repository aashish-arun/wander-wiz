import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const interest = searchParams.get("interest");

  if (!destination || !interest) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const prompt = `
      Suggest 5 popular places to visit in ${destination} for people interested in ${interest}.
      For each place, provide:
        - name
        - a short 2-3 sentence AI-generated description
        - rating (number between 0 and 5)
        - a Google Maps URL
      Return the result as JSON only, without backticks or extra text. Recheck the result again. Example format:
      [
        {
          "name": "Place Name",
          "description": "Short description",
          "rating": 4.7,
          "mapsUrl": "https://www.google.com/maps/place/Place+Name"
        }
      ]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let recommendations = [];
    try {
      recommendations = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", e, "\nOriginal text:", text);
    }

    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
