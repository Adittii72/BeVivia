import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export const ChurnDistributionChart = ({ data }) => {
  const chartData = [
    { name: 'No Churn', value: data?.no_churn || 5174 },
    { name: 'Churn', value: data?.churn || 1869 },
  ];

  const COLORS = ['#2ca02c', '#d62728'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => value.toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const ChurnByContractChart = ({ data }) => {
  const chartData = [
    { contract: 'Month-to-month', churnRate: 42.7 },
    { contract: 'One year', churnRate: 11.3 },
    { contract: 'Two year', churnRate: 3.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="contract" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="churnRate" fill="#ff7f0e" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const TenureAnalysisChart = ({ data }) => {
  const chartData = [
    { months: '0-6', churnCount: 1000, retainCount: 500 },
    { months: '6-12', churnCount: 600, retainCount: 700 },
    { months: '12-24', churnCount: 150, retainCount: 1200 },
    { months: '24+', churnCount: 119, retainCount: 2774 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="months" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="churnCount" fill="#d62728" radius={[8, 8, 0, 0]} />
        <Bar dataKey="retainCount" fill="#2ca02c" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ModelPerformanceChart = ({ data }) => {
  const chartData = [
    { model: 'Logistic Regression', accuracy: 0.80, precision: 0.78, recall: 0.72 },
    { model: 'Random Forest', accuracy: 0.82, precision: 0.81, recall: 0.75 },
    { model: 'XGBoost', accuracy: 0.81, precision: 0.80, recall: 0.73 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="accuracy" fill="#1f77b4" radius={[8, 8, 0, 0]} />
        <Bar dataKey="precision" fill="#ff7f0e" radius={[8, 8, 0, 0]} />
        <Bar dataKey="recall" fill="#2ca02c" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const RiskDistributionChart = ({ data }) => {
  const chartData = [
    { risk: 'Low Risk', count: 3500 },
    { risk: 'Medium Risk', count: 1800 },
    { risk: 'High Risk', count: 1743 },
  ];

  const COLORS_RISK = ['#2ca02c', '#ff7f0e', '#d62728'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ risk, percent }) => `${risk}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS_RISK[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const ChurnRiskGauge = ({ probability }) => {
  const percentage = (probability * 100).toFixed(1);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center" style={{
        background: `conic-gradient(from 0deg, 
          #2ca02c 0deg ${Math.min(probability * 360, 120)}deg, 
          #ff7f0e ${Math.min(probability * 360, 120)}deg ${Math.min(probability * 360, 240)}deg, 
          #d62728 ${Math.min(probability * 360, 240)}deg 360deg)`,
      }}>
        <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center flex-col">
          <p className="text-3xl font-bold text-gray-800">{percentage}%</p>
          <p className="text-sm text-gray-600">Churn Probability</p>
        </div>
      </div>
    </div>
  );
};
