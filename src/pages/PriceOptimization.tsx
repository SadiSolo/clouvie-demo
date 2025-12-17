import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Target, Sliders, Lightbulb, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const generateProfitCurve = () => {
  const data = [];
  for (let price = 200; price <= 700; price += 10) {
    const optimalPrice = 450;
    const maxProfit = 11000;
    const profit = maxProfit - Math.pow((price - optimalPrice) / 10, 2) * 50;
    data.push({ price, profit });
  }
  return data;
};

const generateDemandCurve = () => {
  const data = [];
  for (let price = 200; price <= 700; price += 10) {
    const demand = 1.0 - ((price - 200) / 500) * 0.85;
    data.push({ price, demand: Math.max(0.1, demand) });
  }
  return data;
};

export default function PriceOptimization() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGoal, setSelectedGoal] = useState('maxProfit');
  const [price, setPrice] = useState(394);
  const [showProfitCurve, setShowProfitCurve] = useState(true);

  const profitData = generateProfitCurve();
  const demandData = generateDemandCurve();

  const minPrice = 236;
  const maxPrice = 630;
  const optimalPrice = 622;
  const currentPrice = 394;

  // Calculate predictions based on price
  const calculatePredictions = (selectedPrice: number) => {
    const priceRatio = (selectedPrice - currentPrice) / currentPrice;
    const baseProfit = 118542.27;
    const baseRevenue = 357987.15;
    const baseDemand = 831;

    return {
      profit: baseProfit * (1 + priceRatio * 0.35),
      revenue: baseRevenue * (1 + priceRatio * 0.28),
      demand: Math.round(baseDemand * (1 - priceRatio * 0.45)),
      profitChange: (priceRatio * 35).toFixed(1),
      revenueChange: (priceRatio * 28).toFixed(1),
      demandChange: (-priceRatio * 45).toFixed(1),
    };
  };

  const predictions = calculatePredictions(price);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Price Optimization</h1>
        <p className="text-gray-600 mt-1">AI-powered pricing recommendations and analysis</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'simulator', label: 'Interactive Price Simulator' },
          { id: 'scenarios', label: 'Pricing Scenarios' },
          { id: 'topMovers', label: 'Top Movers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Overview</h2>
            <p className="text-gray-600 mb-8">
              Comprehensive pricing analysis and optimization recommendations for your product portfolio
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-sm font-semibold text-green-700 px-3 py-1 bg-green-100 rounded-full">
                    High Impact
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">₹44,594.47</div>
                <div className="text-green-700 font-medium">Total Potential Uplift</div>
                <p className="text-sm text-gray-600 mt-2">Across all optimized products</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-8 h-8 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700 px-3 py-1 bg-blue-100 rounded-full">
                    Active
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">48</div>
                <div className="text-blue-700 font-medium">Products Optimized</div>
                <p className="text-sm text-gray-600 mt-2">Out of 127 total products</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700 px-3 py-1 bg-purple-100 rounded-full">
                    Recommended
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">47</div>
                <div className="text-purple-700 font-medium">Opportunities Found</div>
                <p className="text-sm text-gray-600 mt-2">Ready to implement</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Price Simulator Tab */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Simulator Card */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sliders className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Interactive Price Simulator</h2>
                  <p className="text-indigo-100">Comprehensive overview of your product data</p>
                </div>
              </div>

              {/* Optimization Goal */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Optimization Goal</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'maxProfit', icon: DollarSign, label: 'Max Profit' },
                    { id: 'maxRevenue', icon: TrendingUp, label: 'Max Revenue' },
                    { id: 'maxVolume', icon: Users, label: 'Max Volume' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-6 rounded-xl transition-all ${
                        selectedGoal === goal.id
                          ? 'bg-white text-indigo-600 shadow-lg scale-105'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <goal.icon className="w-8 h-8 mx-auto mb-3" />
                      <div className="font-semibold">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Adjust Price</h3>
                  <div className="text-3xl font-bold">₹{price.toFixed(2)}</div>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-green-500 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #f87171 0%, #fbbf24 25%, #34d399 50%, #10b981 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm mt-2 text-indigo-100">
                  <span>₹{minPrice}</span>
                  <span>Current: ₹{currentPrice}</span>
                  <span>Optimal: ₹{optimalPrice}</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>

              {/* Predictions */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-500 rounded-xl p-6">
                  <div className="text-green-100 text-sm mb-1">Predicted Profit</div>
                  <div className="text-2xl font-bold mb-2">₹{predictions.profit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-green-100">{predictions.profitChange}% vs current</div>
                </div>

                <div className="bg-blue-500 rounded-xl p-6">
                  <div className="text-blue-100 text-sm mb-1">Predicted Revenue</div>
                  <div className="text-2xl font-bold mb-2">₹{predictions.revenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-blue-100">{predictions.revenueChange}% vs current</div>
                </div>

                <div className="bg-pink-500 rounded-xl p-6">
                  <div className="text-pink-100 text-sm mb-1">Predicted Demand</div>
                  <div className="text-2xl font-bold mb-2">{predictions.demand}</div>
                  <div className="text-sm text-pink-100">{predictions.demandChange}% vs current</div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="mt-6 p-6 bg-yellow-400 rounded-xl border-2 border-yellow-500">
                <div className="flex gap-4">
                  <Lightbulb className="w-8 h-8 text-yellow-900 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-yellow-900 text-lg">AI Recommended Optimal Price</h4>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                        Apply
                      </button>
                    </div>
                    <p className="text-yellow-900 text-sm">Based on demand elasticity and profit maximization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytical Charts */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Analytical Charts</h3>
                    <p className="text-blue-100">Visualize profit and demand curves</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowProfitCurve(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showProfitCurve ? 'bg-white text-blue-600' : 'bg-white/20 text-white'
                    }`}
                  >
                    Profit Curve
                  </button>
                  <button
                    onClick={() => setShowProfitCurve(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      !showProfitCurve ? 'bg-white text-blue-600' : 'bg-white/20 text-white'
                    }`}
                  >
                    Demand Curve
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <ResponsiveContainer width="100%" height={300}>
                  {showProfitCurve ? (
                    <AreaChart data={profitData}>
                      <defs>
                        <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="price" stroke="#6b7280" label={{ value: 'Price (₹)', position: 'insideBottom', offset: -5 }} />
                      <YAxis stroke="#6b7280" label={{ value: 'Profit', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fill="url(#profitGradient)" />
                    </AreaChart>
                  ) : (
                    <LineChart data={demandData}>
                      <defs>
                        <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="price" stroke="#6b7280" label={{ value: 'Price (₹)', position: 'insideBottom', offset: -5 }} />
                      <YAxis stroke="#6b7280" label={{ value: 'Demand (Units/Day)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={3} fill="url(#demandGradient)" />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">AI Recommendations</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Optimal Price Found</h4>
                      <p className="text-sm text-gray-600">Price at ₹622.05 maximizes profit at ₹227,646.52</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Elasticity Analysis</h4>
                      <p className="text-sm text-gray-600">Product is elastic (E= -0.92). Price changes have significant demand impact.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Premium Positioning</h4>
                      <p className="text-sm text-gray-600">Higher price positions product as premium. Ensure quality justifies increase.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-indigo-100">Product Cost</span>
                  <span className="font-bold">₹275.59</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-indigo-100">Min Viable Price</span>
                  <span className="font-bold">₹330.71</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-indigo-100">Selected Margin</span>
                  <span className="font-bold">34.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-100">Optimal Margin</span>
                  <span className="font-bold">55.7%</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Apply This Price
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Scenarios Tab */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Aggressive Growth',
              description: 'Lower prices to gain market share',
              risk: 'Medium Risk',
              riskColor: 'bg-yellow-100 text-yellow-700',
              priceChange: '-15%',
              revenue: '+24%',
              profit: '+8%',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Premium Positioning',
              description: 'Higher prices for quality perception',
              risk: 'Low Risk',
              riskColor: 'bg-blue-100 text-blue-700',
              priceChange: '+12%',
              revenue: '+18%',
              profit: '+32%',
              gradient: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Volume Maximizer',
              description: 'Optimize for maximum units sold',
              risk: 'Low Risk',
              riskColor: 'bg-blue-100 text-blue-700',
              priceChange: '-8%',
              revenue: '+15%',
              profit: '+12%',
              gradient: 'from-green-500 to-emerald-500',
            },
            {
              title: 'Profit Maximizer',
              description: 'AI-recommended optimal pricing',
              risk: 'Very Low Risk',
              riskColor: 'bg-green-100 text-green-700',
              priceChange: '-5.2%',
              revenue: '+22%',
              profit: '+45%',
              gradient: 'from-orange-500 to-red-500',
            },
          ].map((scenario, index) => (
            <div key={index} className={`bg-gradient-to-br ${scenario.gradient} rounded-2xl p-8 text-white`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{scenario.title}</h3>
                  <p className="text-white/80">{scenario.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scenario.riskColor}`}>
                  {scenario.risk}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Price Change</span>
                  <span className="text-2xl font-bold">{scenario.priceChange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Expected Revenue</span>
                  <span className="text-2xl font-bold">{scenario.revenue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Expected Profit</span>
                  <span className="text-2xl font-bold">{scenario.profit}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl font-semibold transition-colors">
                Apply Scenario
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Top Movers Tab */}
      {activeTab === 'topMovers' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-1">Top Movers</h2>
            <p className="text-indigo-100">Products with the highest potential profit gain or loss</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Current Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Recommended</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Predicted Profit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Profit Gain/Loss</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Demand Change</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">BPE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Chicken Pepperoni & Cheese Bagel 723', current: 393.70, recommended: 343.08, profit: 92.01, gain: 6.21, demand: 44.37, bpe: -0.918 },
                  { name: 'Chipotle Chicken Sandwich & Coffee Combo 734', current: 427.24, recommended: 341.79, profit: 91.30, gain: 187.56, demand: 3978.20, bpe: -2.333 },
                  { name: 'Iced Latte 720', current: 214.85, recommended: 171.88, profit: 795.91, gain: 144.70, demand: 104.33, bpe: -2.865 },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-yellow-600 font-semibold">₹{product.current.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-cyan-600 font-semibold">₹{product.recommended.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">₹{product.profit.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <ArrowUp className="w-4 h-4" />
                        ₹{product.gain.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                        <ArrowUp className="w-4 h-4" />
                        {product.demand.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-mono font-semibold">
                        {product.bpe.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
