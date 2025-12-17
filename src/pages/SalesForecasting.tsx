import { useState } from 'react';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SalesForecasting() {
  const [forecastPeriod, setForecastPeriod] = useState('30');
  const [modelType, setModelType] = useState('prophet');
  const [activeView, setActiveView] = useState('forecast');

  const forecastData = [
    { month: 'Jan', actual: 12500, forecast: 12450 },
    { month: 'Feb', actual: 13200, forecast: 13100 },
    { month: 'Mar', actual: 14100, forecast: 14300 },
    { month: 'Apr', actual: null, forecast: 15200 },
    { month: 'May', actual: null, forecast: 16100 },
    { month: 'Jun', actual: null, forecast: 17300 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Forecasting</h1>
        <p className="text-gray-600 mt-1">Predict future sales trends with AI-powered forecasting</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Forecast Period</h3>
          </div>
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
            <option value="180">180 Days</option>
          </select>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Model Selection</h3>
          </div>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="prophet">Prophet (Recommended)</option>
            <option value="arima">ARIMA</option>
            <option value="lstm">LSTM Neural Network</option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="text-sm text-green-100 mb-2">Forecast Accuracy</div>
          <div className="text-4xl font-bold mb-1">4.2%</div>
          <div className="text-sm text-green-100">MAPE Score</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="text-sm text-blue-100 mb-2">Confidence Level</div>
          <div className="text-4xl font-bold mb-1">92%</div>
          <div className="text-sm text-blue-100">Model Confidence</div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'forecast', icon: TrendingUp, label: 'Forecast View' },
          { id: 'seasonality', icon: Calendar, label: 'Seasonality' },
          { id: 'products', icon: BarChart3, label: 'Product Forecasts' },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeView === view.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <view.icon className="w-5 h-5" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Forecast Chart */}
      {activeView === 'forecast' && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sales Forecast - Next 6 Months</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual Sales" />
              <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" name="Forecasted Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Product Forecasts Table */}
      {activeView === 'products' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-1">Product-Level Forecasts</h2>
            <p className="text-purple-100">Comprehensive overview of your product data</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Current (Monthly)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Forecast (Next Month)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Growth</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Latte', current: 12500, forecast: 13200, growth: 5.6, confidence: 92 },
                  { name: 'Cappuccino', current: 10800, forecast: 11502, growth: 6.5, confidence: 92 },
                  { name: 'Flat White', current: 8900, forecast: 9603, growth: 7.9, confidence: 92 },
                  { name: 'Espresso', current: 7200, forecast: 7402, growth: 2.8, confidence: 92 },
                  { name: 'Americano', current: 6500, forecast: 7098, growth: 9.2, confidence: 92 },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{product.current.toLocaleString()} units</td>
                    <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{product.forecast.toLocaleString()} units</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        ↑ {product.growth}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${product.confidence}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{product.confidence}%</span>
                      </div>
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
