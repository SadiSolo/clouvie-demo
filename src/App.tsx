import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import PriceOptimization from './pages/PriceOptimization';
import BulkOptimization from './pages/BulkOptimization';
import ProductDetail from './pages/ProductDetail';
import SalesForecasting from './pages/SalesForecasting';
import DemandForecasting from './pages/DemandForecasting';
import InventoryIntelligence from './pages/InventoryIntelligence';
import Settings from './pages/Settings';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/files" element={<Files />} />
            <Route path="/price-optimization" element={<PriceOptimization />} />
            <Route path="/bulk-optimization" element={<BulkOptimization />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/sales-forecasting" element={<SalesForecasting />} />
            <Route path="/demand-forecasting" element={<DemandForecasting />} />
            <Route path="/inventory-intelligence" element={<InventoryIntelligence />} />
            <Route path="/subscription" element={<ComingSoon title="Subscription" />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
            <Route path="/support" element={<ComingSoon title="Support" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
