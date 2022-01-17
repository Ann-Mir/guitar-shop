import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ENTER_KEY_CODE, QueryParams } from '../../const';
import useQuery from '../../hooks/use-query';
import { resetPagination } from '../../store/actions';
import { getMaxPrice, getMinPrice } from '../../store/filter/selectors';


const MIN_PRICE_LENGTH = 1;
const ZERO_PRICE = '0';
const EMPTY_PRICE = '';

function PriceFilter(): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const minValue = query.get(QueryParams.PriceGte) ? Number(query.get(QueryParams.PriceGte)) : '';
  const maxValue = query.get(QueryParams.PriceLte) ? Number(query.get(QueryParams.PriceLte)) : '';
  const [minPriceValue, setMinPriceValue] = useState<string>(minValue.toString());
  const [maxPriceValue, setMaxPriceValue] = useState<string>(maxValue.toString());

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (value.length > MIN_PRICE_LENGTH) {
      value.replace(/^0+/, '');
    }
    setMinPriceValue(value);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (value.length > MIN_PRICE_LENGTH) {
      value.replace(/^0+/, '');
    }
    setMaxPriceValue(value);
  };

  const handleMinPriceBlur = () => {
    if (minPriceValue !== ZERO_PRICE && minPriceValue === EMPTY_PRICE) {
      if (query.has(QueryParams.PriceGte)) {
        dispatch(resetPagination());
        query.delete(QueryParams.PriceGte);
        history.push({pathname: pathname, search: query.toString()});
      }
      return;
    }
    if (minPriceValue || Number(minPriceValue) === 0) {
      let min = parseInt(minPriceValue, 10);
      if (min < minPrice) {
        min = minPrice;
      }
      setMinPriceValue(min.toString());
      query.set(QueryParams.PriceGte, String(min));
      dispatch(resetPagination());
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete(QueryParams.PriceGte);
    history.push({pathname: pathname, search: query.toString()});
  };

  const handleMaxPriceBlur = () => {
    if (maxPriceValue !== ZERO_PRICE && maxPriceValue === EMPTY_PRICE) {
      if (query.has(QueryParams.PriceLte)) {
        query.delete(QueryParams.PriceLte);
        dispatch(resetPagination());
        history.push({pathname: pathname, search: query.toString()});
      }
      return;
    }
    if (maxPriceValue || Number(maxPriceValue) === 0) {
      let max = parseInt(maxPriceValue, 10);
      if (max > maxPrice) {
        max = maxPrice;
      }
      if (max < minPrice) {
        max = minPrice;
      }
      setMaxPriceValue(max.toString());
      query.set(QueryParams.PriceLte, String(max));
      dispatch(resetPagination());
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete(QueryParams.PriceLte);
    history.push({pathname: pathname, search: query.toString()});
  };

  const handleMinPriceKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === ENTER_KEY_CODE) {
      handleMinPriceBlur();
    }
  };

  const handleMaxPriceKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === ENTER_KEY_CODE) {
      handleMaxPriceBlur();
    }
  };

  return (
    <fieldset className="catalog-filter__block" data-testid="price-filter">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={minPrice.toString()}
            id="priceMin"
            name="от"
            min={minPrice}
            max={maxPrice}
            value={minPriceValue}
            onChange={handleMinPriceChange}
            onBlur={handleMinPriceBlur}
            data-testid="min-price-input"
            onKeyPress={handleMinPriceKeyPress}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id="priceMax"
            name="до"
            min={minPriceValue}
            max={maxPriceValue}
            value={maxPriceValue}
            onChange={handleMaxPriceChange}
            onBlur={handleMaxPriceBlur}
            data-testid="max-price-input"
            onKeyPress={handleMaxPriceKeyPress}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
