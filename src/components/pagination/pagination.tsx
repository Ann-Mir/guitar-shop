import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePagination } from '../../hooks/use-pagination';
import { setCurrentPage } from '../../store/actions';
import { getGuitarsCount } from '../../store/guitars-data/selectors';
import { getCurrentPage, getPageLimit } from '../../store/pagination/selectors';

const MAX_PAGES_SHOWN = 3;

function Pagination(): JSX.Element | null {

  const dispatch = useDispatch();

  const totalCount = useSelector(getGuitarsCount);
  const currentPage = useSelector(getCurrentPage);
  const pageLimit = useSelector(getPageLimit);

  const totalPages = Math.ceil(totalCount / pageLimit);

  const paginationRange = usePagination(totalPages, pageLimit, MAX_PAGES_SHOWN, currentPage);

  const onPrevPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage - 1));
  };

  const onNextPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage + 1));
  };

  const onPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const { id } = (evt.target as HTMLAnchorElement).dataset;
    dispatch(setCurrentPage(Number(id)));
  };

  if (totalCount <= pageLimit) {
    return null;
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          currentPage !== 1 && (
            <li className="pagination__page pagination__page--prev" id="prev">
              <a
                onClick={onPrevPageClick}
                className="link pagination__page-link"
                href="#"
              >
                Назад
              </a>
            </li>
          )
        }
        {paginationRange.map((page) => (
          <li
            key={page}
            className={
              `pagination__page
               ${page === currentPage ? 'pagination__page--active' : ''}`
            }
          >
            <a
              data-id={page}
              onClick={onPageClick}
              className="link pagination__page-link"
              href="#"
            >
              {page}
            </a>
          </li>
        ))}
        {
          currentPage !== totalPages && (
            <li className="pagination__page pagination__page--next" id="next">
              <a
                onClick={onNextPageClick}
                className="link pagination__page-link"
                href="#"
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
