import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { QueryParams } from '../../const';
import useQuery from '../../hooks/use-query';
import { resetPagination } from '../../store/actions';


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
  const checkedTypes = query.getAll(QueryParams.Type);
  const [isChecked, setIsChecked] = useState<boolean>(
    checkedTypes.includes(type) && !disabled);

  useEffect(() => {
    if (disabled && checkedTypes.includes(type)) {
      query.delete(QueryParams.Type);
      const checkedTypesOptions = checkedTypes.filter((item) => item !== type);
      checkedTypesOptions.forEach((option) => query.append(QueryParams.Type, option));
      history.replace({pathname: pathname, search: query.toString()});
    }
    setIsChecked(checkedTypes.includes(type) && !disabled);
  }, [query]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {checked, id} = evt.target;
    setIsChecked(checked);

    query.delete(QueryParams.Type);

    if (checked) {
      checkedTypes.push(type);
      checkedTypes.forEach((item) => query.append(QueryParams.Type, item));
    } else {
      const types = checkedTypes.filter((item) => id !== item);
      types.forEach((item) => query.append(QueryParams.Type, item));
    }
    const search = query.toString();
    dispatch(resetPagination());
    history.push({pathname: pathname, search: search});
  };

  return (
    <div key={type} className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        onChange={handleInputChange}
        checked={isChecked}
        disabled={disabled}
        data-testid="type-checkbox"
      />
      <label htmlFor={type}>{name}</label>
    </div>
  );
}


export default FilterTypeItem;
