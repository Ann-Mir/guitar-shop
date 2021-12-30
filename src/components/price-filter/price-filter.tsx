import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/use-query';
import { getMaxPrice, getMinPrice } from '../../store/filter/selectors';


function PriceFilter(): JSX.Element {

  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const minValue = query.get('price_gte') ? Number(query.get('price_gte')) : undefined;
  const maxValue = query.get('price_lte') ? Number(query.get('price_lte')) : undefined;
  const [minPriceValue, setMinPriceValue] = useState<number | string | undefined>(minValue);
  const [maxPriceValue, setMaxPriceValue] = useState<number | string | undefined>(maxValue);

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
        min = minPriceValue as number;
      }
      setMinPriceValue(min);
      query.set('price_gte', String(min));
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete('price_gte');
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
      query.set('price_lte', String(max));
      history.push({pathname: pathname, search: query.toString()});
      return;
    }
    query.delete('price_lte');
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
