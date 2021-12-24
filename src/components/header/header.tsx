import CartLink from '../cart-link/cart-link';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import Search from '../search/search';


function Header(): JSX.Element {

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo className={'header__logo'} />
        <Nav />
        <Search />
        <CartLink />
      </div>
    </header>
  );
}

export default Header;
