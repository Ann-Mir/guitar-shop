import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FILTER_GUITAR_TYPES, QueryParams, STRINGS } from '../../const';
import useQuery from '../../hooks/use-query';
import { resetPagination } from '../../store/actions';
import { getAvailableStringsByTypes } from '../../utils/filter-utils';


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
  const checkedTypes = query.getAll(QueryParams.Type).filter(
    (item) => FILTER_GUITAR_TYPES.includes(item));
  const checkedStrings = query.getAll(QueryParams.StringCount)
    .filter((item) => STRINGS.includes(Number(item)));

  const isChecked = checkedTypes.includes(type);

  const handleInputChange = () => {
    const currentTypeIndex = checkedTypes.findIndex(
      (item) => item === type);
    if (currentTypeIndex === -1) {
      checkedTypes.push(type);
    } else {
      checkedTypes.splice(currentTypeIndex, 1);
    }

    const availableStrings = getAvailableStringsByTypes(checkedTypes);
    if (availableStrings.length === 0) {
      STRINGS.forEach((item) => availableStrings.push(item));
    }
    const checkedStringOptions = checkedStrings
      .filter((item) => availableStrings.includes(Number(item)));
    query.delete(QueryParams.Type);
    query.delete(QueryParams.StringCount);
    checkedTypes.forEach((item) => query.append(QueryParams.Type, item));
    checkedStringOptions.forEach((item) => query.append(QueryParams.StringCount, item));
    dispatch(resetPagination());
    history.push({pathname: pathname, search: query.toString()});
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
