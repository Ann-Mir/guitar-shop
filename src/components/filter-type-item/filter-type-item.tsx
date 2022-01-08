import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/use-query';
import { setCurrentPage } from '../../store/actions';


type FilterTypeItemProps = {
  type: string,
  name: string,
  disabled: boolean,
}

function FilterTypeItem(
  {
    type,
    name,
    disabled,
  }: FilterTypeItemProps): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const checkedTypes = query.getAll('type');
  const [isChecked, setIsChecked] = useState<boolean>(
    checkedTypes.includes(type) && !disabled);

  useEffect(() => {
    if (disabled && checkedTypes.includes(type)) {
      query.delete('type');
      const checkedTypesOptions = checkedTypes.filter((item) => item !== type);
      checkedTypesOptions.forEach((option) => query.append('type', option));
      history.replace({pathname: pathname, search: query.toString()});
    }
    setIsChecked(checkedTypes.includes(type) && !disabled);
  }, [query]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {checked, id} = evt.target;
    setIsChecked(checked);

    query.delete('type');

    if (checked) {
      checkedTypes.push(type);
      checkedTypes.forEach((item) => query.append('type', item));
    } else {
      const types = checkedTypes.filter((item) => id !== item);
      types.forEach((item) => query.append('type', item));
    }
    const search = query.toString();
    dispatch(setCurrentPage(1));
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
