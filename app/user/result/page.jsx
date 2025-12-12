"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Result() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const interest = searchParams.get("interest");

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (destination && interest) {
      const fetchRecommendations = async () => {
        try {
          const res = await fetch(
            `/api/recommendations?destination=${encodeURIComponent(
              destination
            )}&interest=${encodeURIComponent(interest)}`
          );
          const data = await res.json();

          if (Array.isArray(data.recommendations)) {
            setRecommendations(data.recommendations);
          } else {
            setRecommendations([]);
          }
        } catch (err) {
          console.error(err);
          setRecommendations([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [destination, interest]);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-[#020914] min-h-screen text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-10 text-center">
        Recommendations for {destination}
      </h1>
      <h2 className="text-xl mt-4 mb-6 text-center">
        Based on your interest in {interest}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {recommendations.map((place, index) => (
          <div
            key={index}
            className="bg-[#111827] rounded-lg shadow-lg hover:shadow-xl transition p-4 flex flex-col gap-3"
          >
            <h3 className="text-xl font-semibold">{place.name}</h3>

            <p className="text-yellow-400 font-bold">
              Rating: {place.rating}
            </p>

            <p className="text-gray-300">{place.description}</p>

            <a
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-400 hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
