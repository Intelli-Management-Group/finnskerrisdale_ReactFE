import { useEffect, useState } from 'react';

/** Run an API call when `key` changes; returns { data, meta, loading, error }. */
export default function useApi(fetcher, key) {
  const [state, setState] = useState({ data: null, meta: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetcher()
      .then((res) => alive && setState({ data: res.data, meta: res.meta || null, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, meta: null, loading: false, error }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
