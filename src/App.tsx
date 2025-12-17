import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import PriceOptimization from './pages/PriceOptimization';
import DemandForecasting from './pages/DemandForecasting';
import SalesForecasting from './pages/SalesForecasting';
import InventoryIntelligence from './pages/InventoryIntelligence';
import ProductDetail from './pages/ProductDetail';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/files" element={<Files />} />
              <Route path="/price-optimization" element={<PriceOptimization />} />
              <Route path="/demand-forecasting" element={<DemandForecasting />} />
              <Route path="/sales-forecasting" element={<SalesForecasting />} />
              <Route path="/inventory" element={<InventoryIntelligence />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/reporting" element={<ComingSoon title="Reporting & Analytics" />} />
              <Route path="/settings" element={<ComingSoon title="Settings" />} />
              <Route path="/help" element={<ComingSoon title="Help & Support" />} />
              <Route path="/account" element={<ComingSoon title="Account Settings" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
