import CartItemsList from '../cart-items-list/cart-items-list';
import CartTotalPrice from '../cart-total-price/cart-total-price';
import PromoCode from '../promo-code/promo-code';


function Cart(): JSX.Element {
  return (
    <div className="cart" data-testid="cart">
      <CartItemsList />
      <div className="cart__footer">
        <PromoCode />
        <CartTotalPrice />
      </div>
    </div>
  );
}


export default Cart;
