import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

function Breadcrumbs(): JSX.Element {

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <NavLink className="link" to={AppRoute.Root}>Главная</NavLink>
      </li>
      <li className="breadcrumbs__item">
        <NavLink to={AppRoute.Guitars} className="link">
          Каталог
        </NavLink>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
