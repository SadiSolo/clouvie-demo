import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
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
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Upload, label: 'Your Uploaded Files', path: '/files' },
  { icon: DollarSign, label: 'Price Optimization', path: '/price-optimization' },
  { icon: TrendingUp, label: 'Sales Forecasting', path: '/sales-forecasting' },
  { icon: Activity, label: 'Demand Forecasting', path: '/demand-forecasting' },
  { icon: Package, label: 'Inventory Intelligence', path: '/inventory-intelligence' },
  { icon: CreditCard, label: 'Subscription', path: '/subscription' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Setting', path: '/settings' },
  { icon: Phone, label: 'Contact us', path: '/contact' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-2xl font-bold text-gray-800">Clouvie</span>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg'
                      : 'hover:bg-gray-100'
                  )
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            {bottomMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
