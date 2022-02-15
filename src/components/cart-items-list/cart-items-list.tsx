import { useSelector } from 'react-redux';
import { getGuitarsInCart } from '../../store/cart/selectors';
import CartItem from '../cart-item/cart-item';


function CartItemsList(): JSX.Element {

  const guitarsInCart = useSelector(getGuitarsInCart);

  return (
    <>
      {
        guitarsInCart.length === 0 && (
          <div style={{fontSize: '24px', fontWeight: 'bold', height: '200px'}}>
            В корзине пока пусто
          </div>
        )
      }
      {
        guitarsInCart.length > 0 && guitarsInCart.map((item) => <CartItem key={item.id} guitar={item} />)
      }
    </>
  );
}


export default CartItemsList;
