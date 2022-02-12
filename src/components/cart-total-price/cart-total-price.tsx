import { useSelector } from 'react-redux';
import { getTotalCartPrice } from '../../store/cart/selectors';
import { formatPrice } from '../../utils/common';


function CartTotalPrice(): JSX.Element {

  const totalPrice = useSelector(getTotalCartPrice);

  return (
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{formatPrice(totalPrice)} ₽</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        <span className="cart__total-value cart__total-value--bonus">
          - 3000 ₽
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">
          К оплате:
        </span>
        <span className="cart__total-value cart__total-value--payment">
          49 000 ₽
        </span>
      </p>
      <button className="button button--red button--big cart__order-button">
        Оформить заказ
      </button>
    </div>
  );
}


export default CartTotalPrice;
