import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { cargoAPI } from '../utils/api';
import Logo from '../components/Logo';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const response = await cargoAPI.search(searchQuery);
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'China': 'bg-yellow-100 text-yellow-800',
      'On Air': 'bg-blue-100 text-blue-800',
      'On Sea': 'bg-cyan-100 text-cyan-800',
      'Arrived': 'bg-green-100 text-green-800',
      'Delivered': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo showText={true} className="h-10 w-10" />
            <div className="flex items-center space-x-4">
              <a
                href="https://wa.me/252637778986"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Contact Us</span>
              </a>
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Cargo
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search by first 4 digits of your Phone Number
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter first 4 digits of phone number..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Features */}
        {!searched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card text-center">
              <Package className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Track your cargo status in real-time</p>
            </div>
            <div className="card text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600">Check your cargo anytime, anywhere</p>
            </div>
            <div className="card text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Your data is safe with us</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searched && (
          <div className="card max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({searchResults.length})
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No cargo found</p>
                <p className="text-gray-500">Try searching with a different term</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Truck Number</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Est. Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((cargo) => (
                      <tr key={cargo._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{cargo.customerName}</td>
                        <td className="py-4 px-4 text-gray-700">{cargo.phoneNumber}</td>
                        <td className="py-4 px-4 text-gray-700">{cargo.category || cargo.productName || 'N/A'}</td>
                        <td className="py-4 px-4">
                          {cargo.truckNumbers && cargo.truckNumbers.length > 0 ? (
                            <div className="space-y-1">
                              {cargo.truckNumbers.map((tn, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="font-semibold text-gray-900">{tn.name}</span>
                                  <span className="text-gray-500 mx-1">•</span>
                                  <span className="font-mono text-gray-700">{tn.number}</span>
                                  <span className="text-gray-500 mx-1">×</span>
                                  <span className="text-blue-600 font-medium">{tn.quantity}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="font-mono text-gray-900">{cargo.truckNumber || 'N/A'}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-700">{formatDate(cargo.date)}</td>
                        <td className="py-4 px-4 text-gray-700">
                          {cargo.estimatedDate ? formatDate(cargo.estimatedDate) : '-'}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cargo.status)}`}>
                            {cargo.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/252637778986"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
        title="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-bold text-primary">Snapsuuq</span>
              </div>
              <p className="text-gray-600 text-sm">
                Your trusted cargo tracking system for reliable shipment monitoring.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                    Track Cargo
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
              <a
                href="https://wa.me/252637778986"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: +252 63 7778986</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              © 2025 <span className="text-primary font-semibold">Snapsuuq</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

