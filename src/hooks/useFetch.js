import { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const aboetController = new AbortController();
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.eu/rest/v2/all", {
          signal: AbortController.signal,
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();

    return () => {
      aboetController.abort();
    };
  }, []);

  return { data, loading, error };
}
