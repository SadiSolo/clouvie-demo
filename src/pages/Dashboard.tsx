import { Target, TrendingUp, Package, Activity, Upload, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, Asif</h1>
        <p className="text-gray-600 mt-1">Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">47</div>
          <div className="text-indigo-100">Opportunities Found</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">₹44594.47</div>
          <div className="text-cyan-100">Potential Profit Uplift</div>
        </div>

        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">48</div>
          <div className="text-orange-100">Products Optimized</div>
        </div>

        <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">-1.200</div>
          <div className="text-pink-100">Average Elasticity</div>
        </div>
      </div>

      {/* CSV Upload Section */}
      <div className="bg-gradient-to-r from-red-400 via-orange-400 to-orange-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">CSV File Upload</h2>
              <p className="text-white/90">Upload your product data to analyze pricing optimization opportunities</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <span className="text-white font-semibold">Max 50MB</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-dashed border-red-300 p-12 text-center hover:border-red-400 transition-colors">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Drag & Drop your CSV file here</h3>
              <p className="text-gray-600 mb-6">or click to browse files</p>
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-colors inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Choose File
              </button>
              <p className="text-sm text-gray-500 mt-4">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Supported formats: .csv, .xlsx (max 10MB)
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors inline-flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              Upload & Analyze
            </button>
            <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Template
            </button>
          </div>
        </div>

        {/* Upload Tips */}
        <div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-gray-900">Upload Tips</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Include product name, SKU, current price</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Add historical sales data if available</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Ensure data is clean and formatted</p>
                </div>
              </div>

              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Maximum file size: 10MB</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-900 rounded-xl">
              <h4 className="text-sm font-semibold text-white mb-2">Sample CSV Structure</h4>
              <pre className="text-xs text-pink-400 font-mono overflow-x-auto">
<span className="text-purple-400">Product_Name</span>,<span className="text-purple-400">SKU</span>,<span className="text-purple-400">Current_Price</span>,<span className="text-purple-400">Category</span>,<span className="text-purple-400">Sales_Volume</span>
{'\n'}
<span className="text-blue-300">Sample{'\n'}Product</span>,<span className="text-blue-300">SKU001</span>,<span className="text-blue-300">29.99</span>,<span className="text-blue-300">Electronics</span>,<span className="text-blue-300">1000</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
