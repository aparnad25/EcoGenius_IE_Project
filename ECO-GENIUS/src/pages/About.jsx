export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Page Title */}
        <section className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why EcoGenius
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our mission to make waste disposal smarter and more sustainable for Melbourne.
          </p>
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
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Lens */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Lens</h3>
              <p className="text-gray-600 mb-6">
                Get instant disposal advice by snapping a photo of any item.
              </p>
              <a 
                href="/scanner"
                className="block w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try the AI Lens
              </a>
            </div>

            {/* Search Guide */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path strokeWidth="2" d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Search Guide</h3>
              <p className="text-gray-600 mb-6">
                Quickly find the right bin or disposal method for thousands of items.
              </p>
              <a 
                href="/searchguide"
                className="block w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Open the Guide
              </a>
            </div>

            {/* Community Exchange */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                  <path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Waste Billboard</h3>
              <p className="text-gray-600 mb-6">
                Upload and share reusable kerbside items with neighbours.
              </p>
              <a 
                href="/billboard"
                className="block w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Billboard
              </a>
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
              EcoGenius is a smart digital platform tackling Melbourne&apos;s bulky waste problem by making disposal affordable, clear, and community-driven. Newcomers often face confusing rules and high costs, leading to reusable items ending up in landfill.
            </p>
            
            <p className="text-lg">
              Our AI-powered tool helps residents identify disposal options, share costs, post free pickups, and access local council info via an interactive map.
            </p>
            
            <p className="text-lg">
              Developed by Group 12 – ChaiStix (FIT5120), EcoGenius promotes sustainability, reduces illegal dumping, and strengthens community support.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}