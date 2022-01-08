import { useEffect } from 'react';
import { QueryParams, STRINGS } from '../../const';
import useQuery from '../../hooks/use-query';
import StringsFilterItem from '../strings-filter-item/strings-filter-item';
import { STRINGS_BY_TYPE } from '../../const';


function StringsFilter(): JSX.Element {

  const query = useQuery();
  const availableStrings = new Set();

  const setAvailableStrings = () => {
    const checkedTypes = query.getAll(QueryParams.Type);
    if (checkedTypes.length > 0) {
      checkedTypes.forEach((type) => {
        STRINGS_BY_TYPE[type].forEach((guitarString) => availableStrings.add(guitarString));
      });
    } else {
      STRINGS.forEach((guitarString) => availableStrings.add(guitarString));
    }
  };
  setAvailableStrings();

  const isDisabled = (count: number) => !availableStrings.has(count);

  useEffect(() => {
    setAvailableStrings();
  }, [query, availableStrings]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {STRINGS.map((guitarString) => (
        <StringsFilterItem
          key={guitarString}
          stringsCount={guitarString}
          disabled={isDisabled(guitarString)}
        />),
      )}
    </fieldset>
  );
}

export default StringsFilter;
