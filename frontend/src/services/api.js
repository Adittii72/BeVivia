import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const api = {
  // Health Check
  health: () => apiClient.get('/health'),

  // Predictions
  predict: (customerData) => apiClient.post('/predict', customerData),
  batchPredict: (customers) => apiClient.post('/batch-predict', customers),

  // Model Info
  getModelInfo: () => apiClient.get('/model-info'),

  // Data (if needed)
  getDataSummary: () => apiClient.get('/data-summary'),
  getChurnAnalysis: () => apiClient.get('/churn-analysis'),
};

export default apiClient;
