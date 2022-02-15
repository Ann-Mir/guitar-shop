import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DEFAULT_DISCOUNT,
  PromoCode as PromoCodeEnum,
  PromoCodeStatus
} from '../../const';
import {
  setCoupon,
  setDiscount,
  setPromoCodeStatus
} from '../../store/actions';
import { postPromoCodeAction } from '../../store/api-actions';
import { getCoupon, getPromoCodeStatus } from '../../store/cart/selectors';

function PromoCode(): JSX.Element {
  const promoCodes: Array<string> = Array.from(Object.values(PromoCodeEnum));
  const dispatch = useDispatch();
  const coupon = useSelector(getCoupon);
  const promoCodeStatus = useSelector(getPromoCodeStatus);
  const [promo, setPromo] = useState<PromoCodeEnum | string>(coupon);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (promoCodeStatus !== PromoCodeStatus.Unknown) {
      dispatch(setPromoCodeStatus(PromoCodeStatus.Unknown));
    }
    const value = evt.target.value.replace(/\s/g, '');
    setPromo(value);
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (promoCodes.includes(promo) && promo !== PromoCodeEnum.Default) {
      dispatch(postPromoCodeAction({ coupon: promo as PromoCodeEnum }));
    } else {
      dispatch(setPromoCodeStatus(PromoCodeStatus.Error));
      dispatch(setDiscount(DEFAULT_DISCOUNT));
      dispatch(setCoupon(PromoCodeEnum.Default));
    }
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        className="coupon__form"
        id="coupon-form"
        method="post"
        action="/"
        onSubmit={handleFormSubmit}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={promo}
            onChange={handleInputChange}
            data-testid="promo-input"
          />
          {promoCodeStatus === PromoCodeStatus.Success && (
            <p className="form-input__message form-input__message--success">
              Промокод принят
            </p>
          )}
          {promoCodeStatus === PromoCodeStatus.Error && (
            <p className="form-input__message form-input__message--error">
              неверный промокод
            </p>
          )}
        </div>
        <button
          className="button button--big coupon__button"
          disabled={promoCodeStatus === PromoCodeStatus.Posting}
          data-testid="apply-promo-button"
        >
          Применить
        </button>
      </form>
    </div>
  );
}


export default PromoCode;
