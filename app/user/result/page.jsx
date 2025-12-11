"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export default function Result() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const [coords, setCoords] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#020914] text-white">
      <h1 className="text-2xl font-bold mt-10 mb-6 text-center">
        {destination ? `Your Destination: ${destination}` : "No destination selected"}
      </h1>

      {destination ? (
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          {coords ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", maxWidth: "800px", height: "500px" }}
              center={coords}
              zoom={14}
            >
              <Marker position={coords} />
            </GoogleMap>
          ) : (
            <GeocodeMap destination={destination} setCoords={setCoords} />
          )}
        </LoadScript>
      ) : (
        <p>Please enter a destination first.</p>
      )}
    </div>
  );
}

// Separate component to handle geocoding inside LoadScript
function GeocodeMap({ destination, setCoords }) {
  useEffect(() => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === "OK" && results[0]) {
        setCoords({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        console.error("Geocode failed:", status);
      }
    });
  }, [destination, setCoords]);

  return <p>Loading map...</p>;
}
