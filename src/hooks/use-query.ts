import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';


function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;

// from https://v5.reactrouter.com/web/example/query-parameters
