import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  FileUp, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Package,
  CreditCard,
  Settings,
  Phone,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/files', icon: FileUp, label: 'Your Uploaded Files' },
    { path: '/price-optimization', icon: DollarSign, label: 'Price Optimization' },
    { path: '/sales-forecasting', icon: TrendingUp, label: 'Sales Forecasting' },
    { path: '/demand-forecasting', icon: Activity, label: 'Demand Forecasting' },
    { path: '/inventory-intelligence', icon: Package, label: 'Inventory Intelligence' },
    { path: '/subscription', icon: CreditCard, label: 'Subscription' },
    { path: '/settings', icon: Settings, label: 'Setting' },
    { path: '/contact', icon: Phone, label: 'Contact us' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent transform rotate-45"></div>
        </div>
        <span className="text-2xl font-bold text-gray-800 dark:text-white">Clouvie</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
