"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RecommendationCard from "./recommendationCard";
import { saveSearch } from "../lib/saveSearch";
import { useUser } from "../context/userContext";

export default function Content() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const interest = searchParams.get("interest");

  const { authUser } = useUser();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destination || !interest) return;

    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(
        `/api/recommendations?destination=${destination}&interest=${interest}`
      );

      const data = await res.json();
      setRecommendations(data.recommendations || []);
      setLoading(false);
    };

    fetchData();
  }, [destination, interest]);

  // ✅ THIS IS WHAT YOU WERE MISSING
  useEffect(() => {
    if (!authUser) return;
    if (recommendations.length === 0) return;

    saveSearch(
      authUser.uid,
      destination,
      interest,
      recommendations
    );
  }, [recommendations]);

  if (loading) {
    return <p className="text-white p-4">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {recommendations.map((place, i) => (
        <RecommendationCard key={i} place={place} />
      ))}
    </div>
  );
}
