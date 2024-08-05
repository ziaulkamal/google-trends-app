'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [queries, setQueries] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQueries() {
      try {
        const response = await fetch('/api/trends');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data from API:', data);

        // Modifikasi data: ganti setiap spasi dengan tanda minus
        const modifiedData = data.map((query: string) => query.replace(/\s+/g, '-'));
        setQueries(modifiedData);
      } catch (error: any) {
        console.error('Failed to fetch queries', error);
        setError(error.message);
      }
    }
    fetchQueries();
  }, []);

  if (error) {
    return <pre>{JSON.stringify({ error }, null, 2)}</pre>;
  }

  if (queries === null) {
    return <pre>No data available</pre>;
  }

  return <pre>{JSON.stringify(queries, null, 2)}</pre>;
}
