# BeVivia Frontend

Professional React + Recharts dashboard for customer churn prediction.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- **Real-time Prediction**: Single customer churn prediction
- **Analytics Dashboard**: Comprehensive data visualizations with Recharts
- **Model Comparison**: Multi-model performance metrics
- **Business Insights**: Actionable recommendations
- **Professional UI**: Tailwind CSS styling for production-grade appearance

## Components

- `Sidebar`: Navigation component
- `Header`: Top navigation bar
- `MetricCard`: Reusable metric display
- `Charts`: Recharts components (Pie, Bar, Radar)

## Pages

1. **Prediction**: Real-time churn prediction interface
2. **Analytics**: Data analysis and visualization dashboard
3. **Models**: Model performance comparison
4. **Insights**: Business intelligence and recommendations
5. **About**: Platform information

## API Integration

All API calls are made through `services/api.js` using axios.
Custom hooks in `hooks/useApi.js` provide easy access to API functions.

## Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8000
```
