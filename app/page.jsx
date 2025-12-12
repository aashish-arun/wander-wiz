"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete } from "@react-google-maps/api";

export default function Home() {
  const [autoComplete, setAutoComplete] = useState(null); 
  const [destination, setDestination] = useState("");
  const [interest, setInterest] = useState("");
  const router = useRouter();

  const onLoad = (ac) => {
    setAutoComplete(ac);
  };

  const onPlaceChanged = () => {
    if (autoComplete) {
      const place = autoComplete.getPlace();
      const name = place.name || "";
      const address = place.formatted_address || "";
      setDestination(name || address);

      console.log("Name:", place.name);
      console.log("Address:", place.formatted_address);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `user/result?destination=${encodeURIComponent(
      destination
    )}&interest=${encodeURIComponent(interest)}`;

    router.push(url);
  };

  return (
    <div className="bg-[#020914] min-h-screen flex flex-col items-center p-4 text-white">
      <h1 className="text-2xl font-bold mt-10 text-center">
        AI-powered travel recommendations
      </h1>

      {/* Destination Form */}
      <div className="bg-[#020914] p-6 rounded-lg mt-6 mb-20 border border-white w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          
          {/* Destination Input */}
          <div className="flex flex-col w-full">
            <label className="font-medium italic mb-2">
              Where are you going?
            </label>

            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              options={{
                fields: [
                  "name",
                  "formatted_address",
                  "geometry",
                  "opening_hours",
                  "utc_offset_minutes",
                ],
              }}
            >
              <input
                type="text"
                placeholder="Enter a destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </Autocomplete>
          </div>

          {/* Interest Dropdown */}
          <div className="flex flex-col w-full">
            <label className="font-medium italic mb-2">
              What would you like to do?
            </label>

            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="border p-2 rounded w-full bg-[#020914] text-white"
              required
            >
              <option value="">Choose one...</option>
              <option value="nightlife">Nightlife</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="restaurants">Restaurants</option>
              <option value="shopping">Shopping</option>
              <option value="nature">Nature</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto text-white p-2 rounded bg-[#0E74C5] hover:bg-[#FDB700] mt-4"
          >
            Conjure Adventures
          </button>

        </form>
      </div>
    </div>
  );
}
