import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_DISCOUNT } from '../../const';
import { postOrder } from '../../store/api-actions';
import {
  getCoupon,
  getDiscountAmount,
  getGuitarsInCart,
  getPriceWithDiscount,
  getTotalCartPrice
} from '../../store/cart/selectors';
import { formatPrice } from '../../utils/common';


function CartTotalPrice(): JSX.Element {

  const totalPrice = useSelector(getTotalCartPrice);
  const priceWithDiscount = useSelector(getPriceWithDiscount);
  const discount = useSelector(getDiscountAmount);
  const coupon = useSelector(getCoupon);
  const guitarsInCart = useSelector(getGuitarsInCart);

  const dispatch = useDispatch();

  const handlePostOrderClick = () => {
    const guitarIds: Array<number> = [];

    guitarsInCart.forEach(({ quantity, id }) => {
      for (let i = 0; i < Number(quantity); i++) {
        guitarIds.push(id);
      }
    });

    const promoCode = discount > DEFAULT_DISCOUNT ? coupon : null;

    const order = {
      guitarsIds: guitarIds,
      coupon: promoCode,
    };

    dispatch(postOrder(order));
  };

  return (
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{formatPrice(totalPrice)} ₽</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        <span
          className={`cart__total-value ${discount > DEFAULT_DISCOUNT ? 'cart__total-value--bonus' : ''}`}
        >
          {
            discount > DEFAULT_DISCOUNT ?
              `- ${formatPrice(discount)} ₽`
              : '0 ₽'
          }
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">
          {formatPrice(priceWithDiscount)} ₽
        </span>
      </p>
      <button
        className="button button--red button--big cart__order-button"
        onClick={handlePostOrderClick}
        data-testid="post-order-button"
      >
        Оформить заказ
      </button>
    </div>
  );
}


export default CartTotalPrice;
