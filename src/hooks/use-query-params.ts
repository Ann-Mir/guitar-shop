import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TQueryParams } from '../types/query';


function useQueryParams(): TQueryParams {
  const { search } = useLocation();
  const queryParams: TQueryParams = {};
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  if (search) {
    for(const [key, value] of searchParams.entries()) {
      (queryParams as any)[key] = value;
    }
  }
  return queryParams;
}

export default useQueryParams;
