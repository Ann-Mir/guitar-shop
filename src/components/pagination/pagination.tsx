import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PAGE } from '../../const';
import { usePagination } from '../../hooks/use-pagination';
import { setCurrentPage } from '../../store/actions';
import { getGuitarsCount } from '../../store/guitars-data/selectors';
import { getCurrentPage, getPageLimit } from '../../store/pagination/selectors';

const MAX_PAGES_SHOWN = 3;
const PAGINATION_INTERVAL = 1;

function Pagination(): JSX.Element | null {

  const dispatch = useDispatch();

  const totalCount = useSelector(getGuitarsCount);
  const currentPage = useSelector(getCurrentPage);
  const pageLimit = useSelector(getPageLimit);

  const totalPages = Math.ceil(totalCount / pageLimit);

  const paginationRange = usePagination(totalPages, pageLimit, MAX_PAGES_SHOWN, currentPage);

  const handlePrevPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage - PAGINATION_INTERVAL));
  };

  const handleNextPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage + PAGINATION_INTERVAL));
  };

  const handlePageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const { id } = (evt.target as HTMLAnchorElement).dataset;
    dispatch(setCurrentPage(Number(id)));
  };

  if (totalCount <= pageLimit) {
    return null;
  }

  return (
    <div className="pagination page-content__pagination" data-testid="pagination">
      <ul className="pagination__list">
        {
          currentPage !== DEFAULT_PAGE && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <a
                onClick={handlePrevPageClick}
                className="link pagination__page-link"
                href="/"
                data-testid="back-button"
              >
                Назад
              </a>
            </li>
          )
        }
        {paginationRange.map((page: number) => (
          <li
            key={page}
            data-testid={page.toString()}
            className={
              `pagination__page
               ${page === currentPage ? 'pagination__page--active' : ''}`
            }
          >
            <a
              data-id={page}
              onClick={handlePageClick}
              className="link pagination__page-link"
              href="/"
            >
              {page}
            </a>
          </li>
        ))}
        {
          currentPage !== totalPages && (
            <li className="pagination__page pagination__page--next" id="next">
              <a
                onClick={handleNextPageClick}
                className="link pagination__page-link"
                href="/"
                data-testid="next-button"
              >
                Далее
              </a>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default Pagination;
