import { useState, useEffect } from 'react';

export function useMockFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: loadData,
    setData,
  };
}
