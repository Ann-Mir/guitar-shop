import { MouseEvent, KeyboardEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { OrderOption, QueryParams, SortOption } from '../../const';
import useQuery from '../../hooks/use-query';


function CatalogueSort(): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const sortType = query.get(QueryParams.Sort);
  const orderType = query.get(QueryParams.Order);

  const handleSortTypeClick = (evt: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {

    const type = (evt.target as HTMLButtonElement).getAttribute('data-type');
    if (type) {
      query.set(QueryParams.Sort, type);
      history.push({pathname: pathname, search: query.toString()});
    }
  };

  const handleOrderTypeClick = (evt: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
    const order = (evt.target as HTMLButtonElement).getAttribute('data-order');
    if (order) {
      query.set(QueryParams.Order, order);
      history.push({pathname: pathname, search: query.toString()});
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sortType === SortOption.Price
            ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          data-type="price"
          onClick={handleSortTypeClick}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${sortType === SortOption.Rating
            ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          data-type="rating"
          onClick={handleSortTypeClick}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up
           ${orderType === OrderOption.Asc
      ? 'catalog-sort__order-button--active' : null}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          data-order="asc"
          onClick={handleOrderTypeClick}
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down
           ${orderType === OrderOption.Desc
      ? 'catalog-sort__order-button--active' : null}`}
          aria-label="По убыванию"
          data-order="desc"
          onClick={handleOrderTypeClick}
        />
      </div>
    </div>
  );
}

export default CatalogueSort;
