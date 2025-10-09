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
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{
              textShadow: '0 2px 4px rgba(255, 255, 255, 0.8)'
            }}>
              Why EcoGenius
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
              Making waste disposal smarter for Melbourne
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

        {/* How EcoGenius Helps Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EcoGenius Helps
            </h2>
            <p className="text-lg text-gray-600">
              Our tools are designed for sustainable, practical, everyday choices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Lens */}
            <a href="/scanner" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                {/* Image with Background */}
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/ailen-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      AI Lens
                    </h3>
                  </div>
                  
                  {/* Description - Hidden by default, shown on hover */}
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      Get instant disposal advice by snapping a photo of any item.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Search Guide */}
            <a href="/searchguide" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/guide-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                        <path strokeWidth="2" d="m21 21-4.35-4.35"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Search Guide
                    </h3>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      Quickly find the right bin or disposal method for thousands of items.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Billboard */}
            <a href="/billboard" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/billboard-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                        <path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Billboard
                    </h3>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      Share and discover reusable items in your community. Reduce waste together.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Pet Parks */}
            <a href="/petparks" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/pets-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M11 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                        <path strokeWidth="2" d="M12 17c-3 0-5-2-5-4 0-1 0-3 2-4 3-1 6-1 6 0 2 1 2 3 2 4 0 2-2 4-5 4z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Pet Parks
                    </h3>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      Find pet-friendly parks and disposal facilities for your furry friends.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Data Analytics */}
            <a href="/visualization" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/data-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M12 20V10M18 20V4M6 20v-4"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Data Analytics
                    </h3>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      View waste disposal statistics and trends across Melbourne councils.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Council */}
            <a href="/council" className="group">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="h-32 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('/council-3.jpg')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <path strokeWidth="2" d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Council
                    </h3>
                  </div>
                  
                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 ease-in-out">
                    <p className="text-gray-600 leading-relaxed">
                      Access council-specific waste disposal information and schedules.
                    </p>
                  </div>
                </div>
              </div>
            </a>
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
              EcoGenius is a smart digital platform tackling Melbourne&apos;s bulky waste problem by making disposal affordable, clear, and community-driven. Newcomers often face confusing rules and high costs, leading to reusable items ending up in landfill.
            </p>
            
            <p className="text-lg">
              Our AI-powered tool helps residents identify disposal options, share costs, post free pickups, and access local council info via an interactive map.
            </p>
            
            <p className="text-lg">
              Developed by – ChaiStix, EcoGenius promotes sustainability, reduces illegal dumping, and strengthens community support.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}