import { useHistory, useLocation } from 'react-router-dom';
import { OrderOption, SortOption } from '../../const';
import useQuery from '../../hooks/use-query';


function CatalogueSort(): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const sortType = query.get('_sort');
  const orderType = query.get('_order');

  const onSortTypeClick = (evt: any) => {
    const type = evt.target.getAttribute('data-type');
    if (type) {
      query.set('_sort', type);
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
          className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active"
          aria-label="По возрастанию"
          tabIndex={-1}
          data-order="asc"
        />
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          data-order="desc"
        />
      </div>
    </div>
  );
}

export default CatalogueSort;
