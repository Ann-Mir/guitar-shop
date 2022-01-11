import PriceFilter from '../price-filter/price-filter';
import StringsFilter from '../strings-filter/strings-filter';
import TypeFilter from '../type-filter/type-filter';


function CatalogueFilter(): JSX.Element {

  return (
    <form className="catalog-filter" data-testid="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceFilter />
      <TypeFilter />
      <StringsFilter />
    </form>
  );
}

export default CatalogueFilter;
