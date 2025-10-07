import React from "react";

export default function Dashboard() {
  const features = [
    {
      title: "AI Lens",
      description: "Scan any item with your camera and get instant disposal advice powered by AI.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4" strokeWidth="2"/>
        </svg>
      ),
      link: "/scanner",
      bgColor: "from-emerald-400 to-teal-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Search Guide",
      description: "Search our comprehensive database to find the right disposal method for any item.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeWidth="2"/>
          <path strokeWidth="2" d="m21 21-4.35-4.35"/>
        </svg>
      ),
      link: "/searchguide",
      bgColor: "from-indigo-400 to-purple-500",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Billboard",
      description: "Share and discover reusable items in your community. Reduce waste together.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4" strokeWidth="2"/>
          <path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      link: "/billboard",
      bgColor: "from-purple-400 to-pink-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Pet Parks",
      description: "Find pet-friendly parks and disposal facilities for your furry friends.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M11 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path strokeWidth="2" d="M12 17c-3 0-5-2-5-4 0-1 0-3 2-4 3-1 6-1 6 0 2 1 2 3 2 4 0 2-2 4-5 4z"/>
        </svg>
      ),
      link: "/petparks",
      bgColor: "from-green-400 to-emerald-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Data Analytics",
      description: "View waste disposal statistics and trends across Melbourne councils.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M12 20V10M18 20V4M6 20v-4"/>
        </svg>
      ),
      link: "/visualization",
      bgColor: "from-orange-400 to-red-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Council",
      description: "Access council-specific waste disposal information and schedules.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path strokeWidth="2" d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      ),
      link: "/council",
      bgColor: "from-sky-400 to-blue-500",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore EcoGenius Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a tool below to start making smarter, more sustainable disposal decisions.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.link}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${feature.bgColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-xl flex items-center justify-center shadow-lg ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* CTA Button */}
                <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                  <span>Explore</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure where to start?
            </h2>
            <p className="text-gray-600 mb-6">
              Try our AI Lens to get instant disposal advice, or learn more about why EcoGenius exists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/scanner"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4" strokeWidth="2"/>
                </svg>
                Try AI Lens
              </a>
              <a
                href="/about"
                className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeWidth="2" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
                </svg>
                Why EcoGenius
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}