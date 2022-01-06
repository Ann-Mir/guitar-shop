import { STRINGS_BY_TYPE } from '../../const';
import useQuery from '../../hooks/use-query';
import FilterTypeItem from '../filter-type-item/filter-type-item';


export const GUITAR_TYPES = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
};

function TypeFilter(): JSX.Element {

  const query = useQuery();
  const checkedStrings = query.getAll('stringCount');

  const isDisabled = (type: string) => {
    const intersection = checkedStrings
      .filter((guitarString) => STRINGS_BY_TYPE[type]
        .includes(Number(guitarString)));
    return intersection.length === 0 && checkedStrings.length > 0;
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {
        Object.entries(GUITAR_TYPES)
          .map(([type, name]) => (
            <FilterTypeItem key={type} type={type} name={name} disabled={isDisabled(type)}/>))
      }
    </fieldset>
  );
}

export default TypeFilter;
