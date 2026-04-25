import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const predict = async (customerData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.predict(customerData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { predict, loading, error, data };
};

export const useModelInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const response = await api.getModelInfo();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch model info');
      } finally {
        setLoading(false);
      }
    };

    fetchModelInfo();
  }, []);

  return { data, loading, error };
};

export const useHealth = () => {
  const [healthy, setHealthy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.health();
        setHealthy(true);
      } catch {
        setHealthy(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return { healthy, loading };
};
