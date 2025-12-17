export default function HistoryCard({ item }) {
  return (
    <div className="bg-[#111827] rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold text-white">
        {item.destination} — {item.interest}
      </h2>

      <p className="text-gray-400 text-sm mb-3">
        {item.createdAt?.toDate().toLocaleString()}
      </p>

      <div className="grid md:grid-cols-3 gap-3">
        {item.results?.map((place, i) => (
          <div key={i} className="bg-gray-800 rounded p-2">
            <p className="text-white font-medium truncate">
              {place.name}
            </p>
            <p className="text-yellow-400 text-sm">
              ⭐ {place.rating}
            </p>
            {place.mapsUrl && (
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
              >
                View Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
