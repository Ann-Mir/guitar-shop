import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FILTER_GUITAR_TYPES, QueryParams, STRINGS } from '../../const';
import useQuery from '../../hooks/use-query';
import { resetPagination } from '../../store/actions';
import { getAvailableStringsByTypes } from '../../utils/filter-utils';


type StringsFilterItemProps = {
  stringsCount: number
}

function StringsFilterItem(
  {
    stringsCount,
  }: StringsFilterItemProps) : JSX.Element {

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();

  const checkedTypes = query.getAll(QueryParams.Type)
    .filter((item) => FILTER_GUITAR_TYPES.includes(item));
  const checkedStrings = query.getAll(QueryParams.StringCount)
    .filter((item) => STRINGS.includes(Number(item)));

  const availableStringsByCheckedTypes = getAvailableStringsByTypes(checkedTypes);

  const isDisabled = availableStringsByCheckedTypes.length > 0
    &&!availableStringsByCheckedTypes.includes(stringsCount);

  const isChecked = checkedStrings.includes(stringsCount.toString());


  const handleInputChange = () => {
    const stringIndex = checkedStrings.findIndex(
      (item) => Number(item) === stringsCount);
    if (stringIndex === -1) {
      checkedStrings.push(stringsCount.toString());
    } else {
      checkedStrings.splice(stringIndex, 1);
    }

    query.delete(QueryParams.Type);
    query.delete(QueryParams.StringCount);
    checkedTypes.forEach((item) => query.append(QueryParams.Type, item));
    checkedStrings.forEach((item) => query.append(QueryParams.StringCount, item));

    dispatch(resetPagination());
    history.push({pathname: pathname, search: query.toString()});
  };


  return (
    <div
      className="form-checkbox catalog-filter__block-item"
      data-testid="strings-filter-item"
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id={`${stringsCount}-strings`}
        name={`${stringsCount}-strings`}
        disabled={isDisabled}
        checked={isChecked}
        onChange={handleInputChange}
        data-testid="strings-checkbox"
      />
      <label htmlFor={`${stringsCount}-strings`}>{stringsCount}</label>
    </div>
  );
}

export default StringsFilterItem;
