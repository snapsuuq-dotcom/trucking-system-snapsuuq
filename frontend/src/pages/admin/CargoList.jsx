import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { cargoAPI } from '../../utils/api';

const CargoList = () => {
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const statuses = ['all', 'China', 'On Air', 'On Sea', 'Arrived', 'Delivered'];

  useEffect(() => {
    fetchCargos();
  }, [statusFilter]);

  const fetchCargos = async () => {
    setLoading(true);
    try {
      const params = {
        status: statusFilter !== 'all' ? statusFilter : undefined
      };
      const response = await cargoAPI.getAll(params);
      setCargos(response.data.data || []);
    } catch (error) {
      console.error('Error fetching cargos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await cargoAPI.delete(id);
      setCargos(cargos.filter(cargo => cargo._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting cargo:', error);
      alert('Failed to delete cargo');
    }
  };

  const filteredCargos = cargos.filter(cargo => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    
    // Check in truckNumbers array if it exists
    const truckNumberMatch = cargo.truckNumbers 
      ? cargo.truckNumbers.some(tn => 
          tn.name.toLowerCase().includes(search) || 
          tn.number.toLowerCase().includes(search)
        )
      : cargo.truckNumber?.toLowerCase().includes(search);
    
    return (
      cargo.customerName.toLowerCase().includes(search) ||
      cargo.phoneNumber.includes(search) ||
      (cargo.productName && cargo.productName.toLowerCase().includes(search)) ||
      (cargo.category && cargo.category.toLowerCase().includes(search)) ||
      truckNumberMatch
    );
  });

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Cargo Management</h2>
          <p className="text-gray-600 mt-1">Manage all cargo entries</p>
        </div>
        <Link to="/admin/add-cargo" className="btn-primary flex items-center space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span>Add Cargo</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, product, or truck number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredCargos.length} of {cargos.length} cargo entries
        </div>
      </div>

      {/* Cargo Table */}
      {loading ? (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : filteredCargos.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No cargo found</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Truck Number</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Est. Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCargos.map((cargo) => (
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
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/admin/edit-cargo/${cargo._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(cargo._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this cargo entry? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CargoList;

