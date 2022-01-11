import { STRINGS } from '../../const';
import StringsFilterItem from '../strings-filter-item/strings-filter-item';


function StringsFilter(): JSX.Element {

  return (
    <fieldset className="catalog-filter__block" data-testid="strings-filter">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {STRINGS.map((guitarString) => (
        <StringsFilterItem
          key={guitarString}
          stringsCount={guitarString}
        />),
      )}
    </fieldset>
  );
}

export default StringsFilter;
