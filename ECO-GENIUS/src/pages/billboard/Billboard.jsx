import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/billboardApi.js";
import PostCard from "../../components/billboard/PostCard.jsx";
import { Loader2, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Select from "react-select";
import BackToDashboard from '@/components/common/BackToDashboard';

export default function Billboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    categories: ["Appliance", "Furniture", "Others"],
    suburb: "",
    search: ""
  });

  const [suburbs, setSuburbs] = useState([]);
  const [selectedSuburb, setSelectedSuburb] = useState(null);

  // Load suburb CSV
  useEffect(() => {
    Papa.parse("/public/Mel_Urban_Suburb.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const suburbNames = Array.from(
          new Set(results.data.map((row) => row.suburb).filter(Boolean))
        ).sort();
        setSuburbs(suburbNames.map((name) => ({ value: name, label: name })));
      },
    });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const categories = filters.categories || [];
    const suburb = filters.suburb || "";
    const search = filters.search ? filters.search.toLowerCase() : "";

    const matchesCategory = categories.includes(post.category);
    const matchesSuburb = !suburb || post.suburb === suburb;
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search) ||
      post.description?.toLowerCase().includes(search);

    return matchesCategory && matchesSuburb && matchesSearch;
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const resetFilters = () => {
    setFilters({
      categories: ["Appliance", "Furniture", "Others"],
      suburb: "",
      search: ""
    });
    setSelectedSuburb(null);
  };

  const handleSuburbChange = (selected) => {
    setSelectedSuburb(selected);
    setFilters(prev => ({ ...prev, suburb: selected ? selected.value : "" }));
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header / Title Section: back button is placed inside the page container to align left */}
      <div className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <BackToDashboard />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Billboard</h1>
            <p className="text-lg text-gray-600 mb-6">
              Share and discover reusable kerbside items within your neighbourhood
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/billboard/posts/new")}
                className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                + Create Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full bg-green-800 text-white px-6 py-3 rounded-lg font-semibold mb-4"
        >
          🔍 {showFilters ? 'Hide' : 'Show'} Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-72 bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-4 h-fit`}>
            <h3 className="text-green-800 text-xl font-bold mb-6">Filters</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-gray-800 text-sm">Category</label>
              <div className="space-y-2.5">
                {['Appliance', 'Furniture', 'PLACEHOLDER (Pet things)','Others'].map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 accent-green-700 cursor-pointer rounded border-gray-300"
                      />
                    </div>
                    <span className="text-gray-700 text-sm group-hover:text-green-700 transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Suburb Filter */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-gray-800 text-sm">Suburb</label>
              <Select
                options={suburbs}
                value={selectedSuburb}
                onChange={handleSuburbChange}
                placeholder="Select or search..."
                isSearchable
                isClearable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: '42px',
                    borderRadius: '0.5rem',
                    borderWidth: '2px',
                    borderColor: state.isFocused ? '#2d6a4f' : '#e5e7eb',
                    boxShadow: state.isFocused ? '0 0 0 3px rgba(45, 106, 79, 0.1)' : 'none',
                    '&:hover': {
                      borderColor: '#2d6a4f',
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    backgroundColor: state.isSelected ? '#2d6a4f' : state.isFocused ? '#f0fdf4' : 'white',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    fontSize: '0.875rem',
                  }),
                }}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-lg focus:border-green-800 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl h-80 shadow-md"></div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl">
                {error}
              </div>
            )}

            {/* No Posts */}
            {!loading && filteredPosts.length === 0 && (
              <div className="text-center text-gray-600 bg-white p-8 rounded-xl shadow-md">
                No posts available. Be the first to create one!
              </div>
            )}

            {/* Posts Grid */}
            {!loading && filteredPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map((post) => {
                  // Ensure consistent author display
                  const postWithAuthor = {
                    ...post,
                    author: post.author || 'Anonymous'
                  };
                  
                  return (
                    <Link key={post.id} to={`/billboard/posts/${post.id}`}>
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer h-full">
                        <PostCard post={postWithAuthor} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}