import { KeyboardEventHandler, MouseEventHandler, SyntheticEvent } from 'react';
import { MouseEvent, KeyboardEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { OrderOption, SortOption } from '../../const';
import useQuery from '../../hooks/use-query';


function CatalogueSort(): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const sortType = query.get('_sort');
  const orderType = query.get('_order');

  const onSortTypeClick = (evt: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {

    const type = (evt.target as HTMLButtonElement).getAttribute('data-type');
    if (type) {
      query.set('_sort', type);
      history.push({pathname: pathname, search: query.toString()});
    }
  };

  const onOrderTypeClick = (evt: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
    const order = (evt.target as HTMLButtonElement).getAttribute('data-order');
    if (order) {
      query.set('_order', order);
      history.push({pathname: pathname, search: query.toString()});
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sortType === SortOption.PRICE ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          data-type="price"
          onClick={onSortTypeClick}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${sortType === SortOption.RATING ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          data-type="rating"
          onClick={onSortTypeClick}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          // className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active"
          className={`catalog-sort__order-button catalog-sort__order-button--up ${orderType === OrderOption.ASC ? 'catalog-sort__order-button--active' : null}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          data-order="asc"
          onClick={onOrderTypeClick}
        />
        <button
          // className="catalog-sort__order-button catalog-sort__order-button--down"
          className={`catalog-sort__order-button catalog-sort__order-button--down ${orderType === OrderOption.DESC ? 'catalog-sort__order-button--active' : null}`}
          aria-label="По убыванию"
          data-order="desc"
          onClick={onOrderTypeClick}
        />
      </div>
    </div>
  );
}

export default CatalogueSort;
