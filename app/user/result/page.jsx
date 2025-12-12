"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Recommendation from "../../components/recommendation";

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

  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      {loading ? (
        <div className="text-white p-4">Loading...</div>
      ) : (
        <div className="bg-[#020914] min-h-screen text-white p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mt-10 text-center">
            Recommendations for {destination}
          </h1>

          <h2 className="text-xl mt-4 mb-6 text-center">
            Based on your interest in {interest}
          </h2>

          <div className="flex flex-col gap-6 w-full max-w-5xl">
            {recommendations.map((place, index) => (
              <Recommendation key={index} place={place} />
            ))}
          </div>
        </div>
      )}
    </Suspense>
  );
}
