import React from 'react';
import {
  ChurnDistributionChart,
  ChurnByContractChart,
  TenureAnalysisChart,
  RiskDistributionChart,
} from '../components/Charts';
import MetricCard from '../components/MetricCard';
import { Users, TrendingDown, AlertTriangle, Clock, BarChart3 } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time customer churn analysis and insights</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={Users}
            label="Total Customers"
            value="7,043"
            subtext="Active subscribers"
            color="blue"
          />
          <MetricCard
            icon={TrendingDown}
            label="Churn Rate"
            value="26.5%"
            subtext="1,869 customers"
            color="red"
          />
          <MetricCard
            icon={AlertTriangle}
            label="High Risk"
            value="1,743"
            subtext="Churn probability >70%"
            color="orange"
          />
          <MetricCard
            icon={Clock}
            label="Avg Tenure"
            value="32 months"
            subtext="Retained customers"
            color="green"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Churn Distribution */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-center leading-8 text-sm font-bold">
                📊
              </span>
              Churn Distribution
            </h2>
            <ChurnDistributionChart />
          </div>

          {/* Risk Distribution */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center leading-8 text-sm font-bold">
                ⚡
              </span>
              Risk Segmentation
            </h2>
            <RiskDistributionChart />
          </div>

          {/* Churn by Contract */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white text-center leading-8 text-sm font-bold">
                📈
              </span>
              Churn by Contract Type
            </h2>
            <ChurnByContractChart />
          </div>

          {/* Tenure Analysis */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-center leading-8 text-sm font-bold">
                📅
              </span>
              Tenure Analysis
            </h2>
            <TenureAnalysisChart />
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* By Contract Type */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">By Contract Type</h3>
            <div className="space-y-5">
              {[
                { label: 'Month-to-month', percentage: 42.7, color: 'from-red-500 to-rose-600' },
                { label: 'One year', percentage: 11.3, color: 'from-amber-500 to-orange-600' },
                { label: 'Two year', percentage: 3.2, color: 'from-emerald-500 to-teal-600' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Internet Service */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">By Internet Service</h3>
            <div className="space-y-5">
              {[
                { label: 'Fiber optic', percentage: 41.9, color: 'from-red-500 to-rose-600' },
                { label: 'DSL', percentage: 19.5, color: 'from-amber-500 to-orange-600' },
                { label: 'No Internet', percentage: 7.6, color: 'from-emerald-500 to-teal-600' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <span className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Services */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">By Services</h3>
            <div className="space-y-3">
              {[
                { label: 'Phone Service', percentage: 90 },
                { label: 'Online Security', percentage: 48 },
                { label: 'Tech Support', percentage: 43 },
                { label: 'Online Backup', percentage: 37 },
                { label: 'Device Protection', percentage: 35 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-colors">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="font-bold text-indigo-600">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;


