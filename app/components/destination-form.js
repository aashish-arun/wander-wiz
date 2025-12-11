"use client";
import { useState } from "react";

export default function DestinationForm() {
  const [destination, setDestination] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Destination:", destination);
    console.log("Interest:", interest);
    // ADD API CALL HERE
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 flex flex-col items-center"
    >
      {/* Destination Input */}
      <div className="flex flex-col items-center w-80">
        <label className="font-medium italic mb-2">Where are you going?</label>
        <input
          type="text"
          placeholder="Enter a destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Interest Dropdown */}
      <div className="flex flex-col items-center w-80">
        <label className="font-medium italic mb-2 mt-2">What would you like to do?</label>
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

      {/* Submit */}
      <button
        type="submit"
        className="text-white p-2 rounded bg-[#0E74C5] hover:bg-[#FDB700] mt-6"
      >
        Conjure Adventures
      </button>
    </form>
  );
}
