import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Target, Package, Lightbulb, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [showProfitCurve, setShowProfitCurve] = useState(true);

  // Sample data
  const profitData = [];
  for (let price = 200; price <= 700; price += 10) {
    const optimalPrice = 450;
    const maxProfit = 11000;
    const profit = maxProfit - Math.pow((price - optimalPrice) / 10, 2) * 50;
    profitData.push({ price, profit });
  }

  const demandData = [];
  for (let price = 200; price <= 700; price += 10) {
    const demand = 1.0 - ((price - 200) / 500) * 0.85;
    demandData.push({ price, demand: Math.max(0.1, demand) });
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chicken Pepperoni & Cheese Bagel</h1>
        <p className="text-gray-600 mt-1">Detailed analysis and recommendations</p>
      </div>

      {/* Product Analysis Tab */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Product Analysis</h2>
              <p className="text-indigo-100">Comprehensive overview and model information</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image Placeholder */}
            <div>
              <div className="bg-gray-100 rounded-xl p-12 text-center mb-4">
                <svg className="w-24 h-24 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 mt-2">Product Image</p>
              </div>
            </div>

            {/* Model Information */}
            <div className="lg:col-span-2">
              <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-bold text-indigo-900">Model Information</h3>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">R²:</div>
                    <div className="text-2xl font-bold text-gray-900">0.067</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Adj. R²:</div>
                    <div className="text-2xl font-bold text-gray-900">0.043</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">F-statistic:</div>
                    <div className="text-2xl font-bold text-gray-900">2.8</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Observations:</div>
                    <div className="text-2xl font-bold text-gray-900">122</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Model Type:</div>
                    <div className="text-2xl font-bold text-gray-900">OLS</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Method:</div>
                    <div className="text-lg font-bold text-gray-900">Least Squares</div>
                  </div>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Elasticity:</div>
                    <div className="text-3xl font-bold text-indigo-600">-0.9181</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Current Price:</div>
                    <div className="text-3xl font-bold text-orange-600">₹393.70</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Product Cost:</div>
                    <div className="text-2xl font-bold text-gray-900">₹275.59</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Analysis Date:</div>
                    <div className="text-lg font-semibold text-gray-900">22 Jun, 2025</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Recommended Price:</div>
                    <div className="text-3xl font-bold text-green-600">₹343.08</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Profit Uplift:</div>
                    <div className="text-3xl font-bold text-green-600">₹6.21</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Price Optimization</h2>
            <p className="text-green-100">AI-powered recommendations for maximum profitability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5" />
              <h3 className="font-semibold">Product Cost</h3>
            </div>
            <div className="text-3xl font-bold mb-1">₹275.59</div>
            <p className="text-sm text-green-100">The baseline cost for producing one unit</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" />
              <h3 className="font-semibold">Current Price</h3>
            </div>
            <div className="text-3xl font-bold mb-1">₹393.70</div>
            <p className="text-sm text-green-100">Current market selling price</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5" />
              <h3 className="font-semibold">Recommended Price</h3>
            </div>
            <div className="text-3xl font-bold mb-1">₹343.08</div>
            <p className="text-sm text-green-100">Optimized for maximum profit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white text-green-600 rounded-xl p-6">
            <div className="text-sm mb-1">Predicted Profit</div>
            <div className="text-2xl font-bold mb-1">₹92.01</div>
            <div className="text-sm text-gray-600">+7.2%</div>
          </div>

          <div className="bg-white text-green-600 rounded-xl p-6">
            <div className="text-sm mb-1">Expected Profit Uplift</div>
            <div className="text-2xl font-bold mb-1">₹6.21 (7.2%)</div>
          </div>

          <div className="bg-white text-green-600 rounded-xl p-6">
            <div className="text-sm mb-1">Demand Change</div>
            <div className="text-2xl font-bold mb-1">0.19 units (44.4%)</div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <div>
              <h4 className="font-bold text-lg mb-2">Model Confidence: Low (R² = 0.067)</h4>
              <p className="text-sm text-green-100">
                The model explains only 6.7% of price variation. Consider collecting more data points or additional features to improve accuracy. Recommendations should be validated with market testing.
              </p>
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
              <h2 className="text-xl font-bold">Analytical Charts</h2>
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
          <ResponsiveContainer width="100%" height={400}>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <h3 className="font-semibold">Price Elasticity</h3>
            </div>
            <div className="text-3xl font-bold mb-1">-0.9181</div>
            <p className="text-sm text-blue-100">(Elastic) Price change has a strong effect on demand</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <DollarSign className="w-6 h-6" />
              <h3 className="font-semibold">Product Cost</h3>
            </div>
            <div className="text-3xl font-bold mb-1">₹275.59</div>
            <p className="text-sm text-blue-100">The baseline cost for producing one unit</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Target className="w-6 h-6" />
              <h3 className="font-semibold">Model Quality</h3>
            </div>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">R² = 0.067</span>
              <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-semibold">Low</span>
            </div>
            <p className="text-sm text-blue-100 mt-2">Based on 92 observations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
