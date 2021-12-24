import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import CardsList from '../../cards-list/cards-list';
import CatalogueFilter from '../../catalogue-filter/catalogue-filter';
import CatalogueSort from '../../catalogue-sort/catalogue-sort';
import MainLayout from '../../main-layout/main-layout';
import Pagination from '../../pagination/pagination';


function CataloguePage(): JSX.Element {

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
