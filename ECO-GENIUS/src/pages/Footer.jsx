export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    features: [
      { name: "AI Lens", href: "/scanner" },
      { name: "Search Guide", href: "/searchguide" },
      { name: "Billboard", href: "/billboard" },
      { name: "Pet Parks", href: "/petparks" },
    ],
    resources: [
      { name: "Data Analytics", href: "/visualization" },
      { name: "Council Info", href: "/council" },
      { name: "Why EcoGenius", href: "/about" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="EcoGenius Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  EcoGenius
                </h2>
                <p className="text-xs text-gray-500">Dispose Smarter</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Making waste disposal smarter, more affordable, and community-driven for Melbourne residents.
            </p>
            <p className="text-sm text-gray-500">
              Developed by Group 12 – ChaiStix (FIT5120)
            </p>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} EcoGenius. All rights reserved.
          </p>
          
          {/* Social or Additional Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
              About Us
            </a>
            <a href="/home" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
              Home
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}