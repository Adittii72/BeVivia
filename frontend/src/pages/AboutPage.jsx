import React from 'react';
import { ArrowRight, Zap, BarChart3, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="px-8 pt-12 pb-16 max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100/60 rounded-full border border-blue-200/80">
            <span className="text-sm font-semibold text-blue-700">Next-Generation AI Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Customer Intelligence<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            BeVivia leverages advanced machine learning to predict customer behavior, prevent churn, and maximize lifetime value with unprecedented accuracy.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="text-sm font-medium">84.49% ROC-AUC</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <span className="text-sm font-medium">Production Deployment Ready</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
              <span className="text-sm font-medium">Enterprise-Grade Security</span>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Real-Time Predictions</h3>
            <p className="text-gray-600 leading-relaxed">
              Instantly identify at-risk customers with millisecond-level response times powered by optimized ML models.
            </p>
          </div>

          <div className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Actionable Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Transform raw data into strategic recommendations that directly impact retention and revenue.
            </p>
          </div>

          <div className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Enterprise Ready</h3>
            <p className="text-gray-600 leading-relaxed">
              Certified for production deployment with comprehensive monitoring, security, and scalability.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { number: '0.8449', label: 'Best Model ROC-AUC' },
            { number: '82%', label: 'Accuracy Rate' },
            { number: '75%', label: 'Recall Score' },
            { number: '1.0.0', label: 'Production Version' }
          ].map((stat, idx) => (
            <div key={idx} className="rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 p-6 text-center hover:bg-white/70 transition-all">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-12 text-center text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Retention?</h2>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-8">
              Start making data-driven decisions today with BeVivia's intelligent churn prediction engine.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-lg">
              Get Started <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

