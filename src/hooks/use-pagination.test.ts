import {renderHook} from '@testing-library/react-hooks';
import { usePagination } from './use-pagination';


describe('Hook: usePagination', () => {

  it('should return correct array if maxPageShown > totalPages', () => {
    const totalPages = 12;
    const pageSize = 5;
    const maxPageShown = 3;
    const currentPage = 2;
    const {result} = renderHook(() => usePagination(totalPages, pageSize, maxPageShown, currentPage));

    expect(result.current).toHaveLength(maxPageShown);
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should return correct array if current page equals last page', () => {
    const totalPages = 12;
    const pageSize = 5;
    const maxPageShown = 3;
    const currentPage = 12;
    const {result} = renderHook(() => usePagination(totalPages, pageSize, maxPageShown, currentPage));

    expect(result.current).toHaveLength(maxPageShown);
    expect(result.current).toEqual([10, 11, 12]);
  });
});

