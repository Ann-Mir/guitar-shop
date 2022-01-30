import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, ENTER_KEY_CODE } from '../../const';
import useDebounce from '../../hooks/use-debounce';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { loadSearchResults } from '../../store/actions';
import { searchGuitarsWithParams } from '../../store/api-actions';
import { getSearchResults } from '../../store/search-results/selectors';
import { Guitars } from '../../types/guitar';


function Search(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const searchRef = useRef(null);

  const debouncedSearchParams = useDebounce(searchValue);
  const searchResults: Guitars = useSelector(getSearchResults);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (debouncedSearchParams) {
      dispatch(searchGuitarsWithParams(debouncedSearchParams));
    } else {
      dispatch(loadSearchResults([]));
    }
  }, [debouncedSearchParams, dispatch]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleOutsideClick = () => {
    if (isFocused) {
      setIsFocused(false);
      if (!isHovered) {
        setSearchValue('');
        dispatch(loadSearchResults([]));
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isFocused) {
      setSearchValue('');
      dispatch(loadSearchResults([]));
    }
  };

  const handleItemClick = (id: number) => {
    history.push(`${AppRoute.Guitars}/${id}`);
    dispatch(loadSearchResults([]));
    setSearchValue('');
  };

  const handleSearchResultKeyPress = (
    evt: KeyboardEvent<HTMLElement>,
    id: number,
  ) => {
    if (evt.key === ENTER_KEY_CODE) {
      handleItemClick(id);
    }
  };

  useOnClickOutside(searchRef, handleOutsideClick);

  return (
    <div className="form-search" data-testid="form-search" ref={searchRef}>
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
          onChange={handleInputChange}
          value={searchValue}
          onFocus={handleInputFocus}
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          data-testid="search-input"
        />
        <label className="visually-hidden" htmlFor="search">
          Поиск
        </label>
      </form>
      {(searchResults.length > 0 && (isFocused || isHovered)) && (
        <ul
          className="form-search__select-list"
          style={{ zIndex: '1' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {searchResults.map((guitar) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              style={{ color: '#FFFFFF' }}
              key={guitar.id}
              onClick={() => handleItemClick(guitar.id)}
              onKeyPress={(evt) => handleSearchResultKeyPress(evt, guitar.id)}
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
