export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/melbourne-bg.jpg')",
          }}
        >
          {/* Gradient Overlay - darker at bottom for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          {/* Title with better text shadow and backdrop */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
            }}>
              Welcome to EcoGenius
            </h1>
            <div className="inline-block bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-4">
              <p className="text-xl md:text-2xl text-white font-medium">
                Helping Melbourne residents dispose smarter, save money, and build stronger communities.
              </p>
            </div>
          </div>

          {/* Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
              </svg>
              <span>Explore Features</span>
            </a>
            <a 
              href="/about"
              className="bg-white/95 hover:bg-white text-gray-900 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transform backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path strokeWidth="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
              </svg>
              <span>Why EcoGenius</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator (optional) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>

      {/* Feature Images Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - Recycling Station */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/recycling-station.jpg" 
                alt="Recycling Station"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Smart Sorting</h3>
              <p className="text-sm text-gray-600 mt-1">Easy-to-use recycling suggestions</p>
            </div>
          </div>

          {/* Card 2 - AI Scanning */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/ai-scanning.jpg" 
                alt="AI Scanning"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">AI Lens</h3>
              <p className="text-sm text-gray-600 mt-1">Instant disposal guidance</p>
            </div>
          </div>

          {/* Card 3 - Community Sharing */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/community-sharing.jpg" 
                alt="Community Sharing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Share & Reuse</h3>
              <p className="text-sm text-gray-600 mt-1">Give items a second life</p>
            </div>
          </div>

          {/* Card 4 - Sustainable Living */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/sustainable-living.jpg" 
                alt="Sustainable Living"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">Pets Friendly</h3>
              <p className="text-sm text-gray-600 mt-1">Building greener communities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}