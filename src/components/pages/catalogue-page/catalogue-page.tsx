import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { QueryParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchGuitarsAction } from '../../../store/api-actions';
import { getLoadedDataStatus } from '../../../store/guitars-data/selectors';
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
  const isDataLoaded = useSelector(getLoadedDataStatus);

  const dispatch = useDispatch();

  const {pathname} = useLocation();

  useEffect(() => {
    query.set(QueryParams.Start, start.toString());
    query.set(QueryParams.Limit, limit.toString());
    history.replace({pathname: pathname, search: query.toString()});
    dispatch(fetchGuitarsAction(query.toString()));
  }, [query, dispatch, start, limit, history, pathname]);

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <Breadcrumbs />
      <div className="catalog" data-testid="catalogue-page">
        <CatalogueFilter />
        <CatalogueSort />
        <CardsList />
        {isDataLoaded && <Pagination />}
      </div>
    </MainLayout>
  );
}

export default CataloguePage;
