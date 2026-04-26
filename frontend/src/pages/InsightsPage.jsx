import React from 'react';
import { AlertCircle, TrendingUp, Zap, Users, Lightbulb } from 'lucide-react';

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
            <Lightbulb className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Business Insights</h1>
            <p className="text-gray-600 mt-1">Actionable recommendations for customer retention</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Key Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: AlertCircle,
              title: 'Critical Finding: Month-to-Month Risk',
              desc: 'Customers on month-to-month contracts show 42.7% churn rate compared to just 3.2% for 2-year contracts. This is a 13x higher risk.',
              color: 'red',
              gradient: 'from-red-500 to-rose-600'
            },
            {
              icon: Zap,
              title: 'Fiber Optic Service Issue',
              desc: 'Fiber optic customers exhibit 41.9% churn rate — significantly higher than DSL customers at 19.5%. Possible quality or pricing concerns.',
              color: 'orange',
              gradient: 'from-amber-500 to-orange-600'
            },
            {
              icon: TrendingUp,
              title: 'Tenure is a Protective Factor',
              desc: 'Customers in their first 6 months have dramatically higher churn. After 24+ months, churn drops to nearly 5%. Early engagement is critical.',
              color: 'blue',
              gradient: 'from-blue-500 to-cyan-600'
            },
            {
              icon: Users,
              title: 'Tech Support Matters',
              desc: 'Only 43% of customers have tech support. Those without it show higher churn, indicating unmet support needs for complex services.',
              color: 'green',
              gradient: 'from-emerald-500 to-teal-600'
            }
          ].map((finding, idx) => {
            const Icon = finding.icon;
            return (
              <div key={idx} className={`rounded-2xl bg-gradient-to-br ${finding.gradient} text-white p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm flex-shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{finding.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{finding.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retention Strategies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              risk: 'High Risk',
              emoji: '🚨',
              threshold: '&gt;70%',
              gradient: 'from-red-50 to-rose-50',
              border: 'border-red-200',
              strategies: [
                {
                  title: 'Immediate Actions',
                  items: ['Call within 24 hours', 'Personalized retention offer', 'Executive escalation option']
                },
                {
                  title: 'Incentives',
                  items: ['20-30% service discount', 'Free premium support for 3mo', 'Contract upgrade bonus']
                }
              ]
            },
            {
              risk: 'Medium Risk',
              emoji: '🟠',
              threshold: '30-70%',
              gradient: 'from-amber-50 to-orange-50',
              border: 'border-amber-200',
              strategies: [
                {
                  title: 'Engagement Programs',
                  items: ['Introduce new services', 'Loyalty program enroll', 'Monthly check-ins']
                },
                {
                  title: 'Upgrades',
                  items: ['Contract upgrade incentive', 'Service bundling', 'Value communication']
                }
              ]
            },
            {
              risk: 'Low Risk',
              emoji: '🟢',
              threshold: '&lt;30%',
              gradient: 'from-emerald-50 to-teal-50',
              border: 'border-emerald-200',
              strategies: [
                {
                  title: 'Growth Opportunities',
                  items: ['Cross-sell premium features', 'Upsell new services', 'VIP loyalty benefits']
                },
                {
                  title: 'Retention Focus',
                  items: ['Quarterly business review', 'Advocacy program', 'Referral rewards']
                }
              ]
            }
          ].map((strategy, idx) => (
            <div key={idx} className={`rounded-2xl bg-gradient-to-br ${strategy.gradient} backdrop-blur-xl border ${strategy.border} border-opacity-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl">{strategy.emoji}</span>
                <h3 className="font-bold text-gray-900 text-lg">{strategy.risk}</h3>
              </div>
              <div className="space-y-4">
                {strategy.strategies.map((section, sidx) => (
                  <div key={sidx}>
                    <p className="font-semibold text-gray-800 mb-2 text-sm">{section.title}</p>
                    <ul className="space-y-2">
                      {section.items.map((item, iidx) => (
                        <li key={iidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Customer Segmentation */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center leading-8 text-sm font-bold">
              👥
            </span>
            Customer Segments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🆕',
                title: 'New Customers (0-6 months)',
                desc: 'Focus on excellent onboarding experience to establish loyalty early.',
                priority: 'Onboarding Excellence',
                risk: 'Very High (30%+ churn)',
                action: 'Proactive support & education',
                color: 'blue'
              },
              {
                icon: '⭐',
                title: 'Established (6-24 months)',
                desc: 'Expand relationship through service upsells and engagement.',
                priority: 'Relationship Building',
                risk: 'Medium (10-15% churn)',
                action: 'Cross-sell & loyalty programs',
                color: 'orange'
              },
              {
                icon: '💎',
                title: 'Loyal (24+ months)',
                desc: 'Nurture VIP relationships and leverage for advocacy.',
                priority: 'VIP Treatment',
                risk: 'Low (3-5% churn)',
                action: 'Premium services & referrals',
                color: 'green'
              }
            ].map((segment, idx) => (
              <div key={idx} className="rounded-xl border-l-4 border-transparent bg-white/50 p-4 backdrop-blur-sm hover:bg-white/70 transition-colors">
                <div className="text-3xl mb-3">{segment.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{segment.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{segment.desc}</p>
                <div className="space-y-2 text-xs">
                  <div><span className="font-semibold text-gray-800">Priority:</span> <span className="text-gray-600">{segment.priority}</span></div>
                  <div><span className="font-semibold text-gray-800">Risk:</span> <span className="text-gray-600">{segment.risk}</span></div>
                  <div><span className="font-semibold text-gray-800">Action:</span> <span className="text-gray-600">{segment.action}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default InsightsPage;
