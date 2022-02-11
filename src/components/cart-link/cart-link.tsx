import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getQuantityInCart } from '../../store/cart/selectors';

const MIN_QUANTITY = 0;

function CartLink(): JSX.Element {

  const quantity = useSelector(getQuantityInCart);

  return (
    <Link className="header__cart-link" to={AppRoute.Cart} data-testid="cart-link" aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      {
        quantity > MIN_QUANTITY && (
          <span className="header__cart-count">{quantity}</span>
        )
      }
    </Link>
  );
}

export default CartLink;
