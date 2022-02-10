import { BREADCRUMBS_LINKS } from '../../../const';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import Cart from '../../cart/cart';
import MainLayout from '../../main-layout/main-layout';


const CART_PAGE_BREADCRUMBS = [
  BREADCRUMBS_LINKS.main,
  BREADCRUMBS_LINKS.catalogue,
  BREADCRUMBS_LINKS.cart,
];

function CartPage(): JSX.Element {
  return (
    <MainLayout>
      <Breadcrumbs breadcrumbs={CART_PAGE_BREADCRUMBS} />
      <Cart />
    </MainLayout>
  );
}


export default CartPage;
