import React from 'react';
import { useModelInfo } from '../hooks/useApi';
import { ModelPerformanceChart } from '../components/Charts';
import { BarChart3, TrendingUp, Target, Zap, Brain } from 'lucide-react';

const ModelsPage = () => {
  const { data: modelData, loading, error } = useModelInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading models...</p>
        </div>
      </div>
    );
  }

  const models = [
    { 
      name: 'Logistic Regression', 
      accuracy: 0.80, 
      precision: 0.78, 
      recall: 0.72, 
      rocAuc: 0.8449,
      selected: true,
      icon: '✓'
    },
    { 
      name: 'Random Forest', 
      accuracy: 0.82, 
      precision: 0.81, 
      recall: 0.75, 
      rocAuc: 0.8390,
      selected: false,
      icon: '🌲'
    },
    { 
      name: 'XGBoost', 
      accuracy: 0.81, 
      precision: 0.80, 
      recall: 0.73, 
      rocAuc: 0.85,
      selected: false,
      icon: '⚡'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Model Comparison</h1>
            <p className="text-gray-600 mt-1">Performance metrics and analysis across all trained models</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Model Performance Chart */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center leading-8 text-sm font-bold">
              📊
            </span>
            Performance Comparison
          </h2>
          <ModelPerformanceChart />
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl bg-white/70 backdrop-blur-xl border p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                model.selected 
                  ? 'border-indigo-300 ring-2 ring-indigo-200' 
                  : 'border-white/50'
              }`}
            >
              {/* Background Gradient */}
              {model.selected && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-30 pointer-events-none"></div>
              )}

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-1">Model {idx + 1}</p>
                    <h3 className="font-bold text-gray-900 text-lg">{model.name}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                    model.selected 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {model.icon}
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Accuracy', value: model.accuracy, color: 'from-blue-500 to-cyan-600' },
                    { label: 'Precision', value: model.precision, color: 'from-orange-500 to-red-600' },
                    { label: 'Recall', value: model.recall, color: 'from-emerald-500 to-teal-600' }
                  ].map((metric, midx) => (
                    <div key={midx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                        <span className={`font-bold text-sm bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {(metric.value * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${metric.value * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROC-AUC Score */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">ROC-AUC Score</span>
                    <span className="text-2xl font-bold text-purple-600">{(model.rocAuc * 100).toFixed(2)}%</span>
                  </div>
                </div>

                {/* Badge */}
                {model.selected && (
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg border border-indigo-300">
                    <Zap size={18} className="text-indigo-600" />
                    <p className="text-sm font-semibold text-indigo-700">Production Model</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Explanation & Model Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Metrics */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Key Metrics</h3>
            </div>
            <div className="space-y-5">
              {[
                { 
                  title: 'Accuracy', 
                  desc: 'Percentage of correct predictions overall',
                  icon: '✓'
                },
                { 
                  title: 'Precision', 
                  desc: 'Of predicted churners, how many actually churn',
                  icon: '🎯'
                },
                { 
                  title: 'Recall', 
                  desc: 'Of actual churners, how many we caught',
                  icon: '📍'
                },
                { 
                  title: 'ROC-AUC', 
                  desc: 'Overall discrimination ability (0.5-1.0, higher is better)',
                  icon: '📊'
                }
              ].map((metric, idx) => (
                <div key={idx} className="p-4 bg-white/50 rounded-lg backdrop-blur-sm border border-white/60 hover:bg-white/70 transition-colors">
                  <div className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{metric.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{metric.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{metric.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Model Selection</h3>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6">
              <p className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Selected: <span className="text-indigo-600">Logistic Regression</span>
              </p>
              <ul className="space-y-3">
                {[
                  'Highest ROC-AUC score (0.8449)',
                  'Optimal balance of precision and recall',
                  'Interpretable feature coefficients',
                  'Fast inference for real-time predictions',
                  'Production-ready and reliable',
                  'Lower memory footprint'
                ].map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-indigo-600 mt-1 font-bold">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;

