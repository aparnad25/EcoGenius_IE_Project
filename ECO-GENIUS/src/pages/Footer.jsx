export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    councils: [
      { name: "City of Melbourne", href: "https://data.melbourne.vic.gov.au/pages/home/" },
      { name: "City of Yarra", href: "https://www.yarracity.vic.gov.au/" },
      { name: "City of Port Phillip", href: "https://www.portphillip.vic.gov.au/" },
      { name: "City of Monash", href: "https://www.monash.vic.gov.au/Home" },
    ],
    dataSources: [
      { name: "DCCEEW", href: "https://www.dcceew.gov.au/" },
      { name: "Victoria Government", href: "https://www.vic.gov.au/" },
      { name: "Australian Bureau of Statistics", href: "https://www.abs.gov.au/" },
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
              Cleaner streets, affordable solutions, and smarter disposal for Melbourne.
            </p>
            <p className="text-sm text-gray-500">
              Developed by ChaiStix
            </p>
          </div>

          {/* Council Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Council Resources</h3>
            <ul className="space-y-2">
              {footerLinks.councils.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Data Sources</h3>
            <ul className="space-y-2">
              {footerLinks.dataSources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
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
          
          {/* Additional Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-500 hover:text-emerald-600 text-sm transition-colors">
              About
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