import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Truck, 
  CheckCircle,
  Clock,
  PlusCircle
} from 'lucide-react';
import { cargoAPI } from '../../utils/api';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await cargoAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Cargo',
      value: stats?.total || 0,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'In China',
      value: stats?.china || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'On Air',
      value: stats?.onAir || 0,
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'On Sea',
      value: stats?.onSea || 0,
      icon: Truck,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-600'
    },
    {
      title: 'Arrived',
      value: stats?.arrived || 0,
      icon: Package,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Delivered',
      value: stats?.delivered || 0,
      icon: CheckCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  const pieData = [
    { name: 'China', value: stats?.china || 0, color: '#EAB308' },
    { name: 'On Air', value: stats?.onAir || 0, color: '#3B82F6' },
    { name: 'On Sea', value: stats?.onSea || 0, color: '#06B6D4' },
    { name: 'Arrived', value: stats?.arrived || 0, color: '#10B981' },
    { name: 'Delivered', value: stats?.delivered || 0, color: '#8B5CF6' }
  ];

  const barData = [
    { name: 'China', count: stats?.china || 0 },
    { name: 'On Air', count: stats?.onAir || 0 },
    { name: 'On Sea', count: stats?.onSea || 0 },
    { name: 'Arrived', count: stats?.arrived || 0 },
    { name: 'Delivered', count: stats?.delivered || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Overview of cargo system statistics</p>
        </div>
        <Link to="/admin/add-cargo" className="btn-primary flex items-center space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span>Add Cargo</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => 
                  percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cargo Count by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/add-cargo"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
          >
            <PlusCircle className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-gray-900">Add New Cargo</p>
              <p className="text-sm text-gray-600">Create a new cargo entry</p>
            </div>
          </Link>
          <Link
            to="/admin/cargo"
            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
          >
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-gray-900">View All Cargo</p>
              <p className="text-sm text-gray-600">Manage existing cargo entries</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

