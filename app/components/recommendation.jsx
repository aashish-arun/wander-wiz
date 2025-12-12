"use client";

export default function Recommendation({ place }) {
  return (
    <div
      className="bg-[#111827] rounded-lg shadow-lg hover:shadow-xl 
                 transition p-4 flex flex-col md:flex-row gap-4"
    >
      {/* IMAGE */}
      {place.imageUrl ? (
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full md:w-48 h-48 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full md:w-48 h-48 bg-gray-700 flex items-center justify-center rounded-lg">
          No Image Available
        </div>
      )}

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold">{place.name}</h3>

          <p className="text-yellow-400 font-bold mt-1">
            Rating: {place.rating}
          </p>

          <p className="text-gray-300 mt-2">
            {place.description}
          </p>
        </div>

        {/* MAPS LINK */}
        <a
          href={place.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-blue-400 hover:underline"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
