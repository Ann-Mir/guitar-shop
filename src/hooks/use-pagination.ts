import { useMemo } from 'react';
import { DEFAULT_PAGE } from '../const';

const PAGINATION_INTERVAL = 1;

function getArrayInRange(startAt: number, finishAt: number): ReadonlyArray<number> {
  return [...Array(finishAt - startAt + 1).keys()].map((i) => i + startAt);
}

export const usePagination = (
  totalPages: number,
  pageSize: number,
  maxPagesShown: number,
  currentPage: number,
): ReadonlyArray<number> => {

  const paginationRange = useMemo(() => {

    if (maxPagesShown > totalPages) {
      return getArrayInRange(DEFAULT_PAGE, totalPages);
    }

    if (currentPage === DEFAULT_PAGE) {
      return getArrayInRange(currentPage, maxPagesShown);
    }

    if (currentPage === totalPages) {
      return getArrayInRange(currentPage - maxPagesShown + DEFAULT_PAGE, currentPage);
    }

    const leftSiblingIndex = currentPage - PAGINATION_INTERVAL;
    const rightSiblingIndex = currentPage + PAGINATION_INTERVAL;

    return getArrayInRange(leftSiblingIndex, rightSiblingIndex);

  }, [totalPages, pageSize, maxPagesShown, currentPage]);

  return paginationRange;
};
