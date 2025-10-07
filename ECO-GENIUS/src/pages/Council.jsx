export default function CouncilPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">Council</h2>

      {/* Image Area */}
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
        <span className="text-gray-500">📷 Photo / Council Map</span>
      </div>

      {/* Select Council */}
      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">
          Select your council
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Latrobe", "Morpeth", "Indigo", "Tucson"].map((c, i) => (
            <button
              key={i}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Recovery Center */}
      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">
          Recovery Center
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="h-32 bg-gray-100 flex items-center justify-center rounded mb-3">
                <span className="text-gray-500">Recovery Card {n}</span>
              </div>
              <p className="text-sm text-gray-600">
                Details about the recovery center will appear here.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Council Rules */}
      <section>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">
          Council Rules
        </h3>
        <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 italic">
            Council rules and regulations will be displayed here...
          </p>
        </div>
      </section>
    </div>
  );
}
