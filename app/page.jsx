 "use client";

import Link from "next/link";
import DestinationForm from "./components/destination-form";

export default function Home() {
  return (
    <div className="bg-[#020914] flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-xl font-bold mt-10">AI-powered travel recommendations</h1>

      {/* Destination form */}
          <div className="bg-[#020914] p-6 rounded-lg mt-6 mb-40 border border-white">
            <DestinationForm />
          </div>
    </div>
  );
}