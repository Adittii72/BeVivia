import React, { useState } from 'react';
import { usePrediction } from '../hooks/useApi';
import MetricCard from '../components/MetricCard';
import { ChurnRiskGauge } from '../components/Charts';
import { Zap, AlertCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const PredictionPage = () => {
  const { predict, loading, error, data } = usePrediction();
  const [formData, setFormData] = useState({
    tenure: 12,
    MonthlyCharges: 65.0,
    TotalCharges: 780.0,
    Contract: 'Month-to-month',
    gender: 'Male',
    InternetService: 'DSL',
    SeniorCitizen: 0,
    PhoneService: 'Yes',
    OnlineSecurity: 'No',
    OnlineBackup: 'Yes',
    DeviceProtection: 'No',
    TechSupport: 'No',
    StreamingTV: 'No',
    StreamingMovies: 'No',
    Partner: 'No',
    Dependents: 'No',
    MultipleLines: 'No',
    PaperlessBilling: 'Yes',
    PaymentMethod: 'Electronic check',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value) || value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await predict(formData);
    } catch (err) {
      console.error('Prediction failed:', err);
    }
  };

  const getRiskColor = (prob) => {
    if (prob < 0.30) return { 
      color: 'emerald', 
      text: 'Low Risk', 
      bg: 'bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-600',
      icon: '✓'
    };
    if (prob < 0.70) return { 
      color: 'amber', 
      text: 'Medium Risk', 
      bg: 'bg-amber-50',
      gradient: 'from-amber-500 to-orange-600',
      icon: '!'
    };
    return { 
      color: 'red', 
      text: 'High Risk', 
      bg: 'bg-red-50',
      gradient: 'from-red-500 to-rose-600',
      icon: '⚠'
    };
  };

  const riskInfo = data ? getRiskColor(data.churn_probability) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Churn Prediction Engine</h1>
            <p className="text-gray-600 mt-1">Predict customer churn probability with AI-powered intelligence</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Input Form - Prediction Card */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                📋
              </div>
              Customer Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tenure */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tenure <span className="text-gray-400">(months)</span>
                </label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  min="0"
                  max="72"
                  className="input-field"
                />
              </div>

              {/* Monthly Charges */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Charges <span className="text-gray-400">($)</span>
                </label>
                <input
                  type="number"
                  name="MonthlyCharges"
                  value={formData.MonthlyCharges}
                  onChange={handleChange}
                  step="0.01"
                  className="input-field"
                />
              </div>

              {/* Total Charges */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Charges <span className="text-gray-400">($)</span>
                </label>
                <input
                  type="number"
                  name="TotalCharges"
                  value={formData.TotalCharges}
                  onChange={handleChange}
                  step="0.01"
                  className="input-field"
                />
              </div>

              {/* Contract Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contract Type
                </label>
                <select
                  name="Contract"
                  value={formData.Contract}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </div>

              {/* Internet Service */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Internet Service
                </label>
                <select
                  name="InternetService"
                  value={formData.InternetService}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option>DSL</option>
                  <option>Fiber optic</option>
                  <option>No</option>
                </select>
              </div>

              {/* Tech Support */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tech Support
                </label>
                <select
                  name="TechSupport"
                  value={formData.TechSupport}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              {/* Online Security */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Online Security
                </label>
                <select
                  name="OnlineSecurity"
                  value={formData.OnlineSecurity}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 mt-8 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={18} /> Predict Churn
                  </span>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {data ? (
            <>
              {/* Risk Assessment Card */}
              <div className="rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Risk Assessment</p>
                    <h2 className="text-3xl font-bold text-gray-900">Prediction Result</h2>
                  </div>
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${riskInfo.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                    {riskInfo.icon}
                  </div>
                </div>

                <div className="flex justify-center mb-8">
                  <ChurnRiskGauge probability={data.churn_probability} />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/40">
                  {[
                    { label: 'Risk Level', value: riskInfo.text, icon: '📊' },
                    { label: 'Confidence', value: `${(data.confidence * 100).toFixed(1)}%`, icon: '✓' },
                    { label: 'Prediction', value: data.churn_prediction === 1 ? 'Churn' : 'Retain', icon: data.churn_prediction === 1 ? '⚠' : '✓' }
                  ].map((metric, idx) => (
                    <div key={idx} className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/60">
                      <p className="text-2xl mb-2">{metric.icon}</p>
                      <p className="text-xs text-gray-500 font-medium mb-1">{metric.label}</p>
                      <p className={`text-lg font-bold ${
                        metric.label === 'Risk Level' && riskInfo.color === 'emerald' ? 'text-emerald-600' :
                        metric.label === 'Risk Level' && riskInfo.color === 'amber' ? 'text-amber-600' :
                        metric.label === 'Risk Level' ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Factors */}
                <div className="rounded-2xl bg-gradient-to-br from-red-50/70 to-rose-50/70 backdrop-blur-xl border border-red-100/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                      <AlertCircle size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Risk Factors</h3>
                  </div>
                  <ul className="space-y-3">
                    {formData.Contract === 'Month-to-month' && (
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-red-500 mt-1 text-lg">•</span>
                        <span>Flexible contract increases churn risk</span>
                      </li>
                    )}
                    {formData.tenure < 6 && (
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-red-500 mt-1 text-lg">•</span>
                        <span>New customer - high churn probability</span>
                      </li>
                    )}
                    {formData.MonthlyCharges > 80 && (
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-red-500 mt-1 text-lg">•</span>
                        <span>High charges may indicate cost sensitivity</span>
                      </li>
                    )}
                    {formData.TechSupport === 'No' && (
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-red-500 mt-1 text-lg">•</span>
                        <span>No technical support subscribed</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/70 backdrop-blur-xl border border-emerald-100/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Recommendations</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Offer tech support add-on or bundle',
                      'Suggest annual/2-year contract upgrade',
                      'Provide loyalty discount (10-15%)',
                      'Schedule personalized outreach within 48h'
                    ].map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-emerald-500 mt-1 text-lg">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-12 shadow-lg flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-600 text-lg font-medium">Awaiting Prediction</p>
                <p className="text-gray-500 text-sm mt-2">Fill in customer information and click "Predict Churn" to analyze</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;


