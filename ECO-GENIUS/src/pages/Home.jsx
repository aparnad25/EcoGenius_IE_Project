export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to EcoGenius
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Helping Melbourne residents dispose smarter, save money, and build stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
              </svg>
              <span>Explore Features</span>
            </a>
            <a 
              href="/about"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path strokeWidth="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
              </svg>
              <span>Why EcoGenius</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}