import { useMemo } from 'react';


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
      return getArrayInRange(1, totalPages);
    }

    if (currentPage === 1) {
      return getArrayInRange(currentPage, maxPagesShown);
    }

    if (currentPage === totalPages) {
      return getArrayInRange(currentPage - maxPagesShown + 1, currentPage);
    }

    const leftSiblingIndex = currentPage - 1;
    const rightSiblingIndex = currentPage + 1;

    return getArrayInRange(rightSiblingIndex, leftSiblingIndex);

  }, [totalPages, pageSize, maxPagesShown, currentPage]);

  return paginationRange;
};
