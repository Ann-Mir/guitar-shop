import { ChangeEvent, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/use-query';


type FilterTypeItemProps = {
  type: string,
  name: string,
  disabled: boolean,
}

function FilterTypeItem({type, name, disabled}: FilterTypeItemProps): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const checkedTypes = query.getAll('type');
  const [isChecked, setIsChecked] = useState<boolean>(checkedTypes.includes(type));

  if (disabled && checkedTypes.includes(type)) {
    query.delete('type');
    const checkedTypesOptions = checkedTypes.filter((item) => item !== type);
    checkedTypesOptions.forEach((option) => query.append('type', option));

    return <Redirect to={{pathname: pathname, search: query.toString()}} />;
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {checked, id} = evt.target;
    setIsChecked((prevState) => !prevState);

    query.delete('type');

    if (checked) {
      checkedTypes.push(type);
      checkedTypes.forEach((item) => query.append('type', item));
    } else {
      const types = checkedTypes.filter((item) => id !== item);
      types.forEach((item) => query.append('type', item));
    }
    const search = query.toString();
    history.push({pathname: pathname, search: search});
  };

  return (
    <div key={type} className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        onChange={onChange}
        checked={isChecked}
        disabled={disabled}
      />
      <label htmlFor={type}>{name}</label>
    </div>
  );
}


export default FilterTypeItem;
