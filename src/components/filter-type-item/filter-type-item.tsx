import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/use-query';


type FilterTypeItemProps = {
  type: string,
  name: string,
}

function FilterTypeItem({type, name}: FilterTypeItemProps): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const checkedTypes = query.getAll('type');
  const [isChecked, setIsChecked] = useState<boolean>(checkedTypes.includes(type));

  const onChange = (evt: any) => {
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
    history.push({pathname: pathname, search: query.toString()});
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
      />
      <label htmlFor={type}>{name}</label>
    </div>
  );
}


export default FilterTypeItem;
