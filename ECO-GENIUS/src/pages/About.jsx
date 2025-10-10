export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Page Title */}
        <section className="relative text-center py-20 rounded-3xl overflow-hidden shadow-xl">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/melbourne-city.jpg')",
            }}
          >
            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/40 to-white/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}>
              Why EcoGenius
            </h1>
            <p className="text-xl text-gray-900 font-medium max-w-3xl mx-auto">
              Making bulky waste disposal smarter for Melbourne.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Melbourne&apos;s Growing Waste Challenge
            </h2>
            <p className="text-lg text-gray-600">
              The problem we are committed to solving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeWidth="2" d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">72% rise</div>
              <p className="text-sm text-gray-600">
                in illegal dumping in Melbourne&apos;s north (2024).
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">Up to $800</div>
              <p className="text-sm text-gray-600">
                average cost of private bulky waste removal.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">40,000+</div>
              <div className="text-lg font-semibold text-emerald-600 mb-2">tonnes</div>
              <p className="text-sm text-gray-600">
                of reusable goods sent to landfill each year.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4" strokeWidth="2"/>
                  <path strokeWidth="2" d="M20 8v6M23 11h-6"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">68% of</div>
              <div className="text-lg font-semibold text-emerald-600 mb-2">newcomers</div>
              <p className="text-sm text-gray-600">
                said they&apos;d use a cost-sharing or donation feature.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              EcoGenius is a smart digital platform tackling Melbourne's bulky waste problem by making disposal affordable, clear, and resident-focused. Newcomers often face confusing rules and high costs, causing reusable items to end up in landfill.
            </p>
            
            <p className="text-lg">
              Our AI-powered tool helps residents identify disposal options, share costs, post free pickups, and access local council info via an interactive map.
            </p>
            
            <p className="text-lg">
              Developed by ChaiStix, EcoGenius promotes sustainability, reduces illegal dumping, and builds stronger neighbourhood connections.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}