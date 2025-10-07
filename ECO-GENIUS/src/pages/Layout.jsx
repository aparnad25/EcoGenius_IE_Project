import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Scan,
  Search,
  Users,
  LayoutDashboard,
  BarChart3,
  FileText
  PawPrint,
} from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600",
    },
    {
      title: "EcoGenius AI Lens",
      url: "/scanner",
      icon: Scan,
      color: "text-emerald-600",
    },
    {
      title: "Search Guide",
      url: "/searchguide",
      icon: Search,
      color: "text-indigo-600",
    },
    {
      title: "Billboard",
      url: "/billboard",
      icon: Users,
      color: "text-purple-600",
    },
    {
    title: "Pet Parks",
    url: "/petparks",
    icon: PawPrint,
    color: "text-green-600",
    },
    {
      title: "Data Analytics",
      url: "/visualization",
      icon: BarChart3,
      color: "text-orange-600",
    },
    {
      title: "Council",
      url: "/council",
      icon: FileText,
      color: "text-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/Dashboard" className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="EcoGenius Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  EcoGenius
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Dispose Smarter</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    // Highlight navbar item if current path starts with the item's URL, including subroutes
                    location.pathname
                      .toLowerCase()
                      .startsWith(item.url.toLowerCase())
                      ? `bg-emerald-100 ${item.color}`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 ${
                // Highlight navbar item if current path starts with the item's URL, including subroutes
                location.pathname
                  .toLowerCase()
                  .startsWith(item.url.toLowerCase())
                  ? `${item.color} bg-emerald-50`
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate max-w-full">
                {item.title.replace("EcoGenius ", "").replace("Data ", "")}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile bottom padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
}

// PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};