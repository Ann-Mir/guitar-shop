import { ChangeEvent, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/use-query';


type StringsFilterItemProps = {
  stringsCount: number,
  disabled: boolean,
}

function StringsFilterItem({stringsCount, disabled}: StringsFilterItemProps) : JSX.Element {

  const query = useQuery();
  const checkedStringCount = query.getAll('stringCount');
  const {pathname} = useLocation();
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(checkedStringCount.includes(stringsCount.toString()) && !disabled);

  if (disabled && checkedStringCount.includes(stringsCount.toString())) {
    query.delete('stringCount');
    const checkedStrings = checkedStringCount.filter((item) => item !== stringsCount.toString());
    checkedStrings.forEach((option) => query.append('stringCount', option));

    return <Redirect to={{pathname: pathname, search: query.toString()}} />;
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {checked} = evt.target;
    setIsChecked((prevState) => !prevState);

    query.delete('stringCount');

    if (checked) {
      checkedStringCount.push(stringsCount.toString());
      checkedStringCount.forEach((item) => query.append('stringCount', item));
    } else {
      const strings = checkedStringCount.filter((item) => stringsCount.toString() !== item);
      strings.forEach((item) => query.append('stringCount', item));
    }
    history.push({pathname: pathname, search: query.toString()});
  };


  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={`${stringsCount}-strings`}
        name={`${stringsCount}-strings`}
        data-count="4"
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={`${stringsCount}-strings`}>{stringsCount}</label>
    </div>
  );
}

export default StringsFilterItem;
