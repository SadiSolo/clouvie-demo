import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  TrendingUp, Target, Zap, BarChart3, Sliders, DollarSign, 
  AlertTriangle, CheckCircle, Users, ShoppingCart, Calendar,
  Package, Activity, TrendingDown, ArrowUp, ArrowDown, Sparkles,
  Settings, LineChart as LineChartIcon, Box, Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { topMoversData } from '../data/mockData';

// Demand Curve Component for What-If Analysis
function DemandCurveChart({ 
  selectedProduct, 
  promotionLevel, 
  priceChangePercent, 
  marketingIntensity, 
  seasonalityFactor 
}: { 
  selectedProduct: any;
  promotionLevel: number;
  priceChangePercent: number;
  marketingIntensity: number;
  seasonalityFactor: number;
}) {
  // Product-specific parameters
  const productCost = selectedProduct.productCost;
  const currentPrice = selectedProduct.currentPrice;
  const elasticity = selectedProduct.elasticity || selectedProduct.bpe || -1.2;
  const baseDemand = 100; // Base demand at optimal price point

  // Calculate scenario adjustments (matching What-If Analysis logic)
  const promotionImpact = (promotionLevel / 100) * 0.3; // 30% boost at max discount
  const marketingImpact = ((marketingIntensity - 50) / 50) * 0.2; // ±20% at extremes
  const seasonalImpact = ((seasonalityFactor - 100) / 100) * 0.25; // ±25% at extremes
  const scenarioMultiplier = 1 + promotionImpact + marketingImpact + seasonalImpact;

  // Generate demand curve data based on product elasticity and scenario factors
  const demandCurveData = Array.from({ length: 60 }, (_, i) => {
    const price = Math.max(productCost * 0.5, currentPrice * 0.5 + (i * (currentPrice * 1.5) / 60));
    
    // Calculate base demand using elasticity formula
    const priceRatio = price / currentPrice;
    const baseDemandAtPrice = baseDemand * Math.pow(priceRatio, elasticity);
    
    // Apply scenario adjustments to the demand
    const adjustedDemand = baseDemandAtPrice * scenarioMultiplier;
    
    return { 
      price: Math.round(price), 
      demand: Math.max(0, Math.round(adjustedDemand * 10) / 10)
    };
  });

  return (
    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <BarChart3 size={20} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Demand Curve - {selectedProduct.name}</h3>
          <p className="text-sm opacity-90">Real-time curve reflecting your scenario adjustments</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={demandCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="price" 
              stroke="#6b7280"
              label={{ value: 'Price (₹)', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              stroke="#6b7280"
              label={{ value: 'Demand (Units/Day)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DemandForecasting() {
  const [activeTab, setActiveTab] = useState<'overview' | 'forecast' | 'whatif' | 'drivers'>('overview');
  
  // State for Interactive Forecasting
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [timeHorizon, setTimeHorizon] = useState('90');
  const [granularity, setGranularity] = useState('daily');
  
  // State for What-If Analysis
  const [selectedProduct, setSelectedProduct] = useState(topMoversData[0]);
  const [promotionLevel, setPromotionLevel] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [marketingIntensity, setMarketingIntensity] = useState(50);
  const [seasonalityFactor, setSeasonalityFactor] = useState(100);

  // Reset product when changing
  useEffect(() => {
    setPromotionLevel(0);
    setPriceChangePercent(0);
    setMarketingIntensity(50);
    setSeasonalityFactor(100);
  }, [selectedProduct]);

  // Model performance metrics
  const modelMetrics = {
    ensemble: { accuracy: 96.5, mape: 3.2, rmse: 184, mae: 142, confidence: 97 },
    prophet: { accuracy: 94.2, mape: 4.8, rmse: 235, mae: 189, confidence: 94 },
    arima: { accuracy: 91.5, mape: 6.5, rmse: 298, mae: 245, confidence: 89 },
    lstm: { accuracy: 95.8, mape: 3.9, rmse: 201, mae: 165, confidence: 96 },
    transformer: { accuracy: 97.2, mape: 2.8, rmse: 168, mae: 128, confidence: 98 }
  };

  const currentMetrics = modelMetrics[selectedModel as keyof typeof modelMetrics];

  // Generate historical demand data
  const historicalDemand = Array.from({ length: 12 }, (_, i) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
    const baseValue = 8000 + Math.random() * 2000;
    return {
      month,
      demand: Math.round(baseValue + (i * 150)),
      actual: Math.round(baseValue + (i * 150) + (Math.random() - 0.5) * 500)
    };
  });

  // Generate forecast data based on model
  const generateForecastData = (model: string, horizon: string) => {
    const periods = parseInt(horizon) / 30;
    const modelMultiplier = model === 'transformer' ? 1.08 : model === 'ensemble' ? 1.05 : model === 'lstm' ? 1.03 : model === 'prophet' ? 1.0 : 0.98;
    
    return Array.from({ length: Math.ceil(periods) }, (_, i) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const baseValue = 10000 + (i * 200) * modelMultiplier;
      return {
        month: monthNames[i % 12],
        forecast: Math.round(baseValue),
        lower: Math.round(baseValue * 0.92),
        upper: Math.round(baseValue * 1.08),
        actual: null
      };
    });
  };

  const forecastData = generateForecastData(selectedModel, timeHorizon);

  // What-If Analysis Calculations
  const baselineDemand = 10000;
  
  // Calculate demand impact from various factors
  const promotionImpact = promotionLevel * 15; // 15 units per % discount
  const priceImpact = priceChangePercent * -25 * (selectedProduct.elasticity || -1.2); // Elasticity effect
  const marketingImpact = (marketingIntensity - 50) * 20; // 20 units per intensity point
  const seasonalImpact = (seasonalityFactor - 100) * 30; // 30 units per % seasonality
  
  const scenarioDemand = Math.round(baselineDemand + promotionImpact + priceImpact + marketingImpact + seasonalImpact);
  const demandChange = scenarioDemand - baselineDemand;
  const demandChangePercent = ((demandChange / baselineDemand) * 100).toFixed(1);

  // Revenue impact
  const currentPrice = selectedProduct.currentPrice * (1 + priceChangePercent / 100);
  const scenarioRevenue = Math.round(scenarioDemand * currentPrice);
  const baselineRevenue = Math.round(baselineDemand * selectedProduct.currentPrice);
  const revenueChange = scenarioRevenue - baselineRevenue;

  // Demand drivers data
  const demandDrivers = [
    { factor: 'Price', impact: 35, color: '#ef4444' },
    { factor: 'Seasonality', impact: 25, color: '#3b82f6' },
    { factor: 'Promotions', impact: 20, color: '#10b981' },
    { factor: 'Marketing', impact: 12, color: '#f59e0b' },
    { factor: 'Trends', impact: 8, color: '#8b5cf6' }
  ];

  // Product volatility data
  const productVolatility = [
    { product: 'Latte', volatility: 15, avgDemand: 12500, category: 'Low' },
    { product: 'Cappuccino', volatility: 22, avgDemand: 10800, category: 'Medium' },
    { product: 'Flat White', volatility: 18, avgDemand: 8900, category: 'Low' },
    { product: 'Espresso', volatility: 35, avgDemand: 7200, category: 'High' },
    { product: 'Americano', volatility: 28, avgDemand: 6500, category: 'High' }
  ];

  // Inventory recommendations
  const inventoryData = [
    { 
      product: 'Latte', 
      currentStock: 15000, 
      optimalStock: 18500, 
      reorderPoint: 8000,
      safetyStock: 3500,
      stockoutRisk: 'Low',
      daysOfInventory: 45
    },
    { 
      product: 'Cappuccino', 
      currentStock: 9800, 
      optimalStock: 14200, 
      reorderPoint: 6500,
      safetyStock: 2800,
      stockoutRisk: 'High',
      daysOfInventory: 28
    },
    { 
      product: 'Flat White', 
      currentStock: 11200, 
      optimalStock: 12000, 
      reorderPoint: 5200,
      safetyStock: 2200,
      stockoutRisk: 'Medium',
      daysOfInventory: 38
    }
  ];

  // Summary metrics for overview
  const summaryMetrics = {
    totalForecast: 248500,
    yoyGrowth: 18.5,
    volatilityIndex: 22,
    accuracyScore: currentMetrics.accuracy,
    stockoutRisks: 3,
    overstockItems: 2
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName="Asif" currentPage="Demand Forecasting" />
      
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/30 flex items-center justify-center">
                  <Sparkles size={32} className="text-white" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">AI Demand Forecasting</h2>
                  <p className="text-sm opacity-90 mt-1">
                    God-level predictions with multi-model ensemble & scenario planning
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm font-medium">
                  🎯 {summaryMetrics.accuracyScore}% Accurate
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm font-medium">
                  📈 {summaryMetrics.totalForecast.toLocaleString()} Units
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={20} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'forecast'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp size={20} />
            Interactive Forecast
          </button>
          <button
            onClick={() => setActiveTab('whatif')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'whatif'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sliders size={20} />
            What-If Analysis
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'drivers'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity size={20} />
            Demand Drivers
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp size={24} />
                    <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded">Next 30 Days</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2">Total Forecast</div>
                  <div className="text-3xl font-bold">{summaryMetrics.totalForecast.toLocaleString()}</div>
                  <div className="text-xs opacity-75 mt-2">+{summaryMetrics.yoyGrowth}% YoY</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target size={24} />
                    <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded">Model Score</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2">Forecast Accuracy</div>
                  <div className="text-3xl font-bold">{summaryMetrics.accuracyScore}%</div>
                  <div className="text-xs opacity-75 mt-2">MAPE: {currentMetrics.mape}%</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity size={24} />
                    <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded">Volatility</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2">Demand Volatility</div>
                  <div className="text-3xl font-bold">{summaryMetrics.volatilityIndex}%</div>
                  <div className="text-xs opacity-75 mt-2">Medium Risk</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle size={24} />
                    <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded">Alerts</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2">Stock Risks</div>
                  <div className="text-3xl font-bold">{summaryMetrics.stockoutRisks}</div>
                  <div className="text-xs opacity-75 mt-2">Requires attention</div>
                </div>
              </Card>
            </div>

            {/* Demand Trend Chart */}
            <Card 
              className="shadow-sm mb-8"
              gradient="bg-gradient-to-r from-cyan-500 to-blue-600"
              title="Demand Trend Analysis"
              badge="Last 12 Months + Forecast"
              icon={<LineChartIcon size={24} />}
            >
              <div className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={[...historicalDemand, ...forecastData.slice(0, 6)]}>
                    <defs>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="upper" 
                      stroke="none" 
                      fill="#bae6fd" 
                      fillOpacity={0.3}
                      name="Confidence Range"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lower" 
                      stroke="none" 
                      fill="#bae6fd" 
                      fillOpacity={0.3}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      name="Actual Demand"
                      dot={{ fill: '#06b6d4', r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Forecasted Demand"
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-cyan-600" />
                    Smart Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-red-800 text-sm">High Stockout Risk</div>
                          <div className="text-xs text-red-700 mt-1">Cappuccino expected to run out in 8 days</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
                      <div className="flex items-start gap-2">
                        <TrendingUp size={16} className="text-amber-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-amber-800 text-sm">Demand Spike Expected</div>
                          <div className="text-xs text-amber-700 mt-1">Latte demand to increase 35% next week</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-green-800 text-sm">Optimal Stock Levels</div>
                          <div className="text-xs text-green-700 mt-1">Flat White inventory perfectly balanced</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Zap size={20} className="text-cyan-600" />
                    Top Demand Drivers
                  </h3>
                  <div className="space-y-4">
                    {demandDrivers.map((driver, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{driver.factor}</span>
                          <span className="text-sm font-bold text-gray-800">{driver.impact}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${driver.impact}%`,
                              backgroundColor: driver.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Interactive Forecast Tab */}
        {activeTab === 'forecast' && (
          <>
            {/* Configuration Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-cyan-600 mb-4">
                    <Settings size={20} />
                    <h3 className="font-bold">Model Selection</h3>
                  </div>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="ensemble">Ensemble (Best)</option>
                    <option value="transformer">Transformer</option>
                    <option value="lstm">LSTM Neural Net</option>
                    <option value="prophet">Prophet</option>
                    <option value="arima">ARIMA</option>
                  </select>
                </div>
              </Card>

              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Calendar size={20} />
                    <h3 className="font-bold">Time Horizon</h3>
                  </div>
                  <select 
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">6 Months</option>
                    <option value="365">1 Year</option>
                  </select>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm opacity-90 mb-2">Model Accuracy</div>
                  <div className="text-3xl font-bold">{currentMetrics.accuracy}%</div>
                  <div className="text-xs opacity-90 mt-1">Confidence: {currentMetrics.confidence}%</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm opacity-90 mb-2">MAPE Score</div>
                  <div className="text-3xl font-bold">{currentMetrics.mape}%</div>
                  <div className="text-xs opacity-90 mt-1">Lower is better</div>
                </div>
              </Card>
            </div>

            {/* Forecast Visualization */}
            <Card 
              className="shadow-sm mb-8"
              gradient="bg-gradient-to-r from-blue-500 to-purple-600"
              title="Demand Forecast"
              badge={`${timeHorizon} Day Forecast - ${selectedModel.toUpperCase()}`}
              icon={<TrendingUp size={24} />}
            >
              <div className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorForecast2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="upper" 
                      stroke="none" 
                      fill="#bfdbfe" 
                      fillOpacity={0.3}
                      name="Upper Bound"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lower" 
                      stroke="none" 
                      fill="#bfdbfe" 
                      fillOpacity={0.3}
                      name="Lower Bound"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#colorForecast2)"
                      name="Forecasted Demand"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Model Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">RMSE</div>
                  <div className="text-3xl font-bold text-blue-600">{currentMetrics.rmse}</div>
                  <div className="text-xs text-gray-500 mt-2">Root Mean Square Error</div>
                </div>
              </Card>
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">MAE</div>
                  <div className="text-3xl font-bold text-purple-600">{currentMetrics.mae}</div>
                  <div className="text-xs text-gray-500 mt-2">Mean Absolute Error</div>
                </div>
              </Card>
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">MAPE</div>
                  <div className="text-3xl font-bold text-green-600">{currentMetrics.mape}%</div>
                  <div className="text-xs text-gray-500 mt-2">Mean Absolute % Error</div>
                </div>
              </Card>
              <Card className="bg-white shadow-sm">
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">Confidence</div>
                  <div className="text-3xl font-bold text-cyan-600">{currentMetrics.confidence}%</div>
                  <div className="text-xs text-gray-500 mt-2">Model Confidence Score</div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* What-If Analysis Tab */}
        {activeTab === 'whatif' && (
          <>
            {/* Product Selector */}
            <Card className="bg-white shadow-sm mb-8">
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Select Product for Scenario Analysis</h3>
                <select 
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const product = topMoversData.find(p => p.id === e.target.value);
                    if (product) setSelectedProduct(product);
                  }}
                  className="w-full px-6 py-3 border-2 border-cyan-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {topMoversData.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
            </Card>

            {/* Scenario Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <Card 
                  className="shadow-lg"
                  gradient="bg-gradient-to-r from-cyan-600 to-blue-600"
                  title="Demand Scenario Simulator"
                  icon={<Sliders size={24} />}
                >
                  <div className="p-8">
                    {/* Promotion Level Slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">Promotion Discount Level</label>
                        <div className="text-2xl font-bold text-cyan-600">{promotionLevel}%</div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        step={5}
                        value={promotionLevel}
                        onChange={(e) => setPromotionLevel(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-gray-300 to-green-400 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>No Discount</span>
                        <span>25% Off</span>
                        <span>50% Off</span>
                      </div>
                    </div>

                    {/* Price Change Slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">Price Change</label>
                        <div className="text-2xl font-bold text-cyan-600">{priceChangePercent > 0 ? '+' : ''}{priceChangePercent}%</div>
                      </div>
                      <input
                        type="range"
                        min={-30}
                        max={30}
                        step={5}
                        value={priceChangePercent}
                        onChange={(e) => setPriceChangePercent(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-red-300 via-gray-300 to-green-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>-30%</span>
                        <span>No Change</span>
                        <span>+30%</span>
                      </div>
                    </div>

                    {/* Marketing Intensity Slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">Marketing Campaign Intensity</label>
                        <div className="text-2xl font-bold text-cyan-600">{marketingIntensity}%</div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={10}
                        value={marketingIntensity}
                        onChange={(e) => setMarketingIntensity(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-300 to-purple-400 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>

                    {/* Seasonality Factor Slider */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">Seasonal Adjustment Factor</label>
                        <div className="text-2xl font-bold text-cyan-600">{seasonalityFactor}%</div>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        step={10}
                        value={seasonalityFactor}
                        onChange={(e) => setSeasonalityFactor(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-300 to-orange-400 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Off-Season</span>
                        <span>Normal</span>
                        <span>Peak Season</span>
                      </div>
                    </div>

                    {/* Live Impact Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
                        <div className="text-sm opacity-90 mb-2">Predicted Demand</div>
                        <div className="text-2xl font-bold">{scenarioDemand.toLocaleString()}</div>
                        <div className="text-xs opacity-75 mt-2">
                          {demandChange > 0 ? '↑' : '↓'} {Math.abs(parseFloat(demandChangePercent))}% vs baseline
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                        <div className="text-sm opacity-90 mb-2">Projected Revenue</div>
                        <div className="text-2xl font-bold">₹{scenarioRevenue.toLocaleString()}</div>
                        <div className="text-xs opacity-75 mt-2">
                          {revenueChange > 0 ? '↑' : '↓'} ₹{Math.abs(revenueChange).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                        <div className="text-sm opacity-90 mb-2">ROI Estimate</div>
                        <div className="text-2xl font-bold">
                          {((revenueChange / (baselineRevenue * 0.1)) * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs opacity-75 mt-2">Based on 10% campaign cost</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* AI Insights Panel */}
              <div className="space-y-6">
                <Card className="bg-white shadow-sm">
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Sparkles size={20} className="text-cyan-600" />
                      AI Insights
                    </h3>
                    <div className="space-y-4">
                      {promotionLevel > 30 && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={18} className="text-amber-600 mt-0.5" />
                            <div>
                              <div className="font-semibold text-amber-800 text-sm">High Discount Alert</div>
                              <div className="text-xs text-amber-700 mt-1">
                                {promotionLevel}% discount may erode profit margins significantly
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {demandChange > 2000 && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                          <div className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold text-green-800 text-sm">Strong Demand Growth</div>
                              <div className="text-xs text-green-700 mt-1">
                                Scenario shows {Math.abs(parseFloat(demandChangePercent))}% demand increase. Ensure inventory capacity.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {marketingIntensity > 70 && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <div className="flex items-start gap-2">
                            <TrendingUp size={18} className="text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold text-blue-800 text-sm">High Marketing Impact</div>
                              <div className="text-xs text-blue-700 mt-1">
                                Aggressive marketing at {marketingIntensity}% intensity will significantly boost awareness
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {priceChangePercent < -15 && (
                        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                          <div className="flex items-start gap-2">
                            <DollarSign size={18} className="text-purple-600 mt-0.5" />
                            <div>
                              <div className="font-semibold text-purple-800 text-sm">Price Sensitivity</div>
                              <div className="text-xs text-purple-700 mt-1">
                                {Math.abs(priceChangePercent)}% price reduction triggers strong elasticity response
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <div className="p-6">
                    <h3 className="font-bold mb-4">Scenario Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Baseline Demand</span>
                        <span className="font-bold">{baselineDemand.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Scenario Demand</span>
                        <span className="font-bold">{scenarioDemand.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Net Change</span>
                        <span className="font-bold">{demandChange > 0 ? '+' : ''}{demandChange.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Change %</span>
                        <span className="font-bold">{demandChange > 0 ? '+' : ''}{demandChangePercent}%</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button variant="success" className="w-full">
                  <CheckCircle size={20} />
                  Apply This Scenario
                </Button>
              </div>
            </div>

            {/* Demand Curve Chart */}
            <DemandCurveChart 
              selectedProduct={selectedProduct}
              promotionLevel={promotionLevel}
              priceChangePercent={priceChangePercent}
              marketingIntensity={marketingIntensity}
              seasonalityFactor={seasonalityFactor}
            />
          </>
        )}

        {/* Demand Drivers Tab */}
        {activeTab === 'drivers' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Factor Importance Chart */}
              <Card 
                className="shadow-sm"
                gradient="bg-gradient-to-r from-purple-500 to-pink-600"
                title="Demand Driver Impact"
                badge="Factor Importance"
                icon={<Activity size={24} />}
              >
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={demandDrivers} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="factor" type="category" stroke="#6b7280" width={100} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="impact" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Product Volatility Analysis */}
              <Card 
                className="shadow-sm"
                gradient="bg-gradient-to-r from-orange-500 to-red-600"
                title="Product Volatility Matrix"
                badge="Risk Assessment"
                icon={<AlertTriangle size={24} />}
              >
                <div className="p-6">
                  <div className="space-y-4">
                    {productVolatility.map((product, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800">{product.product}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            product.category === 'High' ? 'bg-red-100 text-red-700' :
                            product.category === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {product.category} Risk
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600 text-xs">Volatility</div>
                            <div className="font-bold text-gray-800">{product.volatility}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs">Avg Demand</div>
                            <div className="font-bold text-gray-800">{product.avgDemand.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Driver Analysis */}
            <Card className="bg-white shadow-sm">
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-6">Detailed Factor Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demandDrivers.slice(0, 3).map((driver, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-800">{driver.factor}</h4>
                        <div className="text-3xl font-bold" style={{ color: driver.color }}>
                          {driver.impact}%
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {driver.factor === 'Price' && 'Price elasticity shows strong negative correlation with demand. Lower prices significantly boost volume.'}
                        {driver.factor === 'Seasonality' && 'Seasonal patterns show 40% higher demand in December and 25% lower in February.'}
                        {driver.factor === 'Promotions' && 'Promotional campaigns average 18-25% demand lift during active periods.'}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full"
                          style={{ 
                            width: `${driver.impact}%`,
                            backgroundColor: driver.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}

      </div>
    </div>
  );
}
