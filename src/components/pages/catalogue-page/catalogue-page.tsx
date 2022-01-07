import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../../hooks/use-query';
import { fetchGuitarsAction, fetchMaxPriceAction, fetchMinPriceAction } from '../../../store/api-actions';
import { getPageLimit, getStart } from '../../../store/pagination/selectors';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CardsList from '../../cards-list/cards-list';
import CatalogueFilter from '../../catalogue-filter/catalogue-filter';
import CatalogueSort from '../../catalogue-sort/catalogue-sort';
import MainLayout from '../../main-layout/main-layout';
import Pagination from '../../pagination/pagination';


function CataloguePage(): JSX.Element {

  const history = useHistory();
  const query = useQuery();
  const limit = useSelector(getPageLimit);
  const start = useSelector(getStart);

  const dispatch = useDispatch();

  const {pathname} = useLocation();

  useEffect(() => {
    dispatch(fetchMinPriceAction());
    dispatch(fetchMaxPriceAction());
  }, []);

  useEffect(() => {
    query.set('_start', start.toString());
    query.set('_limit', limit.toString());
    dispatch(fetchGuitarsAction(query.toString()));
    history.replace({pathname: pathname, search: query.toString()});
  }, [query, dispatch, start, limit]);

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <Breadcrumbs />
      <div className="catalog">
        <CatalogueFilter />
        <CatalogueSort />
        <CardsList />
        <Pagination />
      </div>
    </MainLayout>
  );
}

export default CataloguePage;
