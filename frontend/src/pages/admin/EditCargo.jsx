import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { cargoAPI, categoryAPI } from '../../utils/api';

const EditCargo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    category: '',
    date: '',
    estimatedDate: '',
    status: 'China'
  });
  const [truckNumbers, setTruckNumbers] = useState([
    { name: '', number: '', quantity: 1 }
  ]);

  const statuses = ['China', 'On Air', 'On Sea', 'Arrived', 'Delivered'];

  useEffect(() => {
    fetchCategories();
    fetchCargo();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      await categoryAPI.create({ name: newCategory.trim() });
      await fetchCategories();
      setFormData(prev => ({ ...prev, category: newCategory.trim().toLowerCase() }));
      setNewCategory('');
      setShowNewCategory(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category. It may already exist.');
    }
  };

  const fetchCargo = async () => {
    try {
      const response = await cargoAPI.getById(id);
      const cargo = response.data.data;
      setFormData({
        customerName: cargo.customerName,
        phoneNumber: cargo.phoneNumber,
        category: cargo.category || cargo.productName || '',
        date: new Date(cargo.date).toISOString().split('T')[0],
        estimatedDate: cargo.estimatedDate ? new Date(cargo.estimatedDate).toISOString().split('T')[0] : '',
        status: cargo.status
      });
      
      // Handle both old format (single truckNumber) and new format (truckNumbers array)
      if (cargo.truckNumbers && cargo.truckNumbers.length > 0) {
        setTruckNumbers(cargo.truckNumbers);
      } else if (cargo.truckNumber) {
        // Convert old format to new format
        setTruckNumbers([{ 
          name: 'Main Truck', 
          number: cargo.truckNumber, 
          quantity: 1 
        }]);
      }
    } catch (error) {
      console.error('Error fetching cargo:', error);
      alert('Failed to load cargo data');
      navigate('/admin/cargo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTruckNumberChange = (index, field, value) => {
    const updatedTruckNumbers = [...truckNumbers];
    updatedTruckNumbers[index][field] = value;
    setTruckNumbers(updatedTruckNumbers);
  };

  const addTruckNumber = () => {
    setTruckNumbers([...truckNumbers, { name: '', number: '', quantity: 1 }]);
  };

  const removeTruckNumber = (index) => {
    if (truckNumbers.length > 1) {
      const updatedTruckNumbers = truckNumbers.filter((_, i) => i !== index);
      setTruckNumbers(updatedTruckNumbers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Validate truck numbers
    const validTruckNumbers = truckNumbers.filter(
      tn => tn.name.trim() && tn.number.trim() && tn.quantity > 0
    );

    if (validTruckNumbers.length === 0) {
      alert('Please add at least one truck number with name and quantity.');
      setSaving(false);
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        truckNumbers: validTruckNumbers
      };
      await cargoAPI.update(id, dataToSubmit);
      alert('Cargo updated successfully!');
      navigate('/admin/cargo');
    } catch (error) {
      console.error('Error updating cargo:', error);
      alert('Failed to update cargo. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/cargo"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Edit Cargo</h2>
          <p className="text-gray-600 mt-1">Update cargo information</p>
        </div>
      </div>

      {/* Form */}
      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter customer name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter phone number"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="flex gap-2">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === '__new__') {
                    setShowNewCategory(true);
                    setFormData(prev => ({ ...prev, category: '' }));
                  } else {
                    setShowNewCategory(false);
                    handleChange(e);
                  }
                }}
                required={!showNewCategory}
                className="input-field flex-1"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
                <option value="__new__">+ Add New Category</option>
              </select>
              {showNewCategory && (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    className="input-field flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategory(false);
                      setNewCategory('');
                      setFormData(prev => ({ ...prev, category: formData.category }));
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Truck Numbers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Truck Numbers * (You can add up to 20+)
              </label>
              <button
                type="button"
                onClick={addTruckNumber}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span>Add Truck</span>
              </button>
            </div>

            {truckNumbers.map((truck, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-700">Truck #{index + 1}</h4>
                  {truckNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTruckNumber(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Truck Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name/Description *
                    </label>
                    <input
                      type="text"
                      value={truck.name}
                      onChange={(e) => handleTruckNumberChange(index, 'name', e.target.value)}
                      required
                      className="input-field text-sm"
                      placeholder="e.g., Container A"
                    />
                  </div>

                  {/* Truck Number */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Truck Number *
                    </label>
                    <input
                      type="text"
                      value={truck.number}
                      onChange={(e) => handleTruckNumberChange(index, 'number', e.target.value)}
                      required
                      className="input-field text-sm"
                      placeholder="e.g., TRK-12345"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={truck.quantity}
                      onChange={(e) => handleTruckNumberChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      required
                      min="1"
                      className="input-field text-sm"
                      placeholder="1"
                    />
                  </div>
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-500 mt-2">
              💡 You can add as many truck numbers as needed (20+ supported)
            </p>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* Estimated Date */}
          <div>
            <label htmlFor="estimatedDate" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Date
            </label>
            <input
              type="date"
              id="estimatedDate"
              name="estimatedDate"
              value={formData.estimatedDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="input-field"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? 'Saving...' : 'Update Cargo'}</span>
            </button>
            <Link to="/admin/cargo" className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCargo;

