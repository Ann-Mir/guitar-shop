import FilterTypeItem from '../filter-type-item/filter-type-item';


export const GUITAR_TYPES = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
};

function TypeFilter(): JSX.Element {

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {
        Object.entries(GUITAR_TYPES)
          .map(([type, name]) => (
            <FilterTypeItem key={type} type={ type} name={name} />))
      }
    </fieldset>
  );
}

export default TypeFilter;
