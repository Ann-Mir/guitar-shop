import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { QueryParams } from '../../const';
import useQuery from '../../hooks/use-query';
import { resetPagination } from '../../store/actions';
import { getMaxPrice, getMinPrice } from '../../store/filter/selectors';


function PriceFilter(): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const minValue = query.get(QueryParams.PriceGte) ? Number(query.get(QueryParams.PriceGte)) : '';
  const maxValue = query.get(QueryParams.PriceLte) ? Number(query.get(QueryParams.PriceLte)) : '';
  const [minPriceValue, setMinPriceValue] = useState<number | string>(minValue);
  const [maxPriceValue, setMaxPriceValue] = useState<number | string>(maxValue);

  const onMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setMinPriceValue(value);
  };

  const onMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setMaxPriceValue(value);
  };

  const onMinPriceBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/^0+/, '');
    if (value) {
      let min = parseInt(value, 10);
      if (min < minPrice) {
        min = minPrice;
      }
      setMinPriceValue(min);
      query.set(QueryParams.PriceGte, String(min));
      dispatch(resetPagination());
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete(QueryParams.PriceGte);
    history.push({pathname: pathname, search: query.toString()});
  };

  const onMaxPriceBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value.replace(/^0+/, '');
    if (value) {
      let max = parseInt(value, 10);
      if (max > maxPrice) {
        max = maxPrice;
      }
      if (max < minPrice) {
        max = minPrice;
      }
      setMaxPriceValue(max);
      query.set(QueryParams.PriceLte, String(max));
      dispatch(resetPagination());
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete(QueryParams.PriceLte);
    history.push({pathname: pathname, search: query.toString()});
  };

  return (
    <fieldset className="catalog-filter__block">
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
            onChange={onMinPriceChange}
            onBlur={onMinPriceBlur}
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
            onChange={onMaxPriceChange}
            onBlur={onMaxPriceBlur}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
