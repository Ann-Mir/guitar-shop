import {NavLink} from 'react-router-dom';
import { AppRoute } from '../../const';


function Nav(): JSX.Element {

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <NavLink
            className="link main-nav__link"
            activeClassName="link--current"
            to={AppRoute.Guitars}
          >
            Каталог
          </NavLink>
        </li>
        <li>
          <NavLink
            className="link main-nav__link"
            activeClassName="link--current"
            to={AppRoute.UnderConstruction}
          >
            Где купить?
          </NavLink>
        </li>
        <li>
          <NavLink
            className="link main-nav__link"
            activeClassName="link--current"
            to={AppRoute.UnderConstruction}
          >
            О компании
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
