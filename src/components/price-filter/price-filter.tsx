import { useSelector } from 'react-redux';
import { getMaxPrice, getMinPrice } from '../../store/filter/selectors';


function PriceFilter(): JSX.Element {

  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input type="number" placeholder={minPrice.toString()} id="priceMin" name="от" />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input type="number" placeholder={maxPrice.toString()} id="priceMax" name="до" />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
