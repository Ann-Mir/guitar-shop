import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchGuitarsAction, fetchMaxPriceAction, fetchMinPriceAction } from '../../../store/api-actions';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CardsList from '../../cards-list/cards-list';
import CatalogueFilter from '../../catalogue-filter/catalogue-filter';
import CatalogueSort from '../../catalogue-sort/catalogue-sort';
import MainLayout from '../../main-layout/main-layout';
import Pagination from '../../pagination/pagination';


function CataloguePage(): JSX.Element {

  const dispatch = useDispatch();

  const {search} = useLocation();

  useEffect(() => {
    dispatch(fetchMinPriceAction());
    dispatch(fetchMaxPriceAction());
  }, []);

  useEffect(() => {
    dispatch(fetchGuitarsAction(search));
  }, [search, dispatch]);

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
