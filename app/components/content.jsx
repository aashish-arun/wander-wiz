"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecommendationCard from "./recommendation";

export default function Content() {
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
          setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
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

      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {recommendations.map((place, index) => (
          <RecommendationCard key={index} place={place} />
        ))}
      </div>
    </div>
  );
}
