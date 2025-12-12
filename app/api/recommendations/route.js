import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const interest = searchParams.get("interest");

  if (!destination || !interest) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    // Step 1 — Get places from OpenAI
    const prompt = `
      Suggest 5 popular places to visit in ${destination} for people interested in ${interest}.
      Each item should include:
        - name
        - short description
        - rating
        - mapsUrl
      Output JSON array only.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let text = response.choices[0].message.content.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "");

    let recommendations = JSON.parse(text);

    // Step 2 — Fetch Google images for each place
    const enhanced = await Promise.all(
      recommendations.map(async (place) => {
        try {
          // Search place to get place_id
          const searchURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
            place.name
          )}&inputtype=textquery&fields=place_id&key=${GOOGLE_KEY}`;

          const searchRes = await fetch(searchURL).then((r) => r.json());

          if (!searchRes.candidates?.length) return { ...place, imageUrl: null };

          const placeId = searchRes.candidates[0].place_id;

          // Get photos from place details
          const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${GOOGLE_KEY}`;

          const details = await fetch(detailsURL).then((r) => r.json());
          const photos = details.result?.photos;

          if (!photos?.length)
            return { ...place, imageUrl: null };

          const photoRef = photos[0].photo_reference;

          // Generate the image URL
          const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${GOOGLE_KEY}`;

          return { ...place, imageUrl };
        } catch {
          return { ...place, imageUrl: null };
        }
      })
    );

    return NextResponse.json({ recommendations: enhanced });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}