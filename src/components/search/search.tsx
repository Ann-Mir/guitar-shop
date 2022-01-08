import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { QueryParams } from '../../const';
import { AppRoute } from '../../const';
import { loadSearchResults } from '../../store/actions';
import { searchGuitarsWithParams } from '../../store/api-actions';
import { getSearchResults } from '../../store/search-results/selectors';
import { Guitars } from '../../types/guitar';
import debounce from 'lodash.debounce';

const RENDER_DELAY = 600;

function Search(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useState<string>('');

  const setDebouncedSearchParams = debounce(() => setSearchParams(searchValue), RENDER_DELAY);

  const searchResults: Guitars = useSelector(getSearchResults);

  const getSearch = () => {
    if (searchParams) {
      dispatch(searchGuitarsWithParams({[QueryParams.NameLike]: searchParams }));
    } else {
      dispatch(loadSearchResults([]));
    }
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearchValue(value);
    setDebouncedSearchParams();
  };

  useEffect(() => {
    getSearch();
  }, [dispatch, searchParams]);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
    if (!isHovered) {
      setSearchValue('');
      dispatch(loadSearchResults([]));
    }
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    if (!isFocused) {
      setSearchValue('');
      dispatch(loadSearchResults([]));
    }
  };

  const onItemClick = (id: number) => {
    history.push(`${AppRoute.Guitars}/${id}`);
    dispatch(loadSearchResults([]));
    setSearchValue('');
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg
            className="form-search__icon"
            width="14"
            height="15"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          onChange={onInputChange}
          value={searchValue}
          onFocus={onFocus}
          onBlur={onBlur}
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      {(searchResults.length > 0 && (isFocused || isHovered)) && (
        <ul
          className="form-search__select-list"
          style={{ zIndex: '1' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {searchResults.map((guitar) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              style={{ color: '#FFFFFF' }}
              key={guitar.id}
              onClick={() => onItemClick(guitar.id)}
            >
              {guitar.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
