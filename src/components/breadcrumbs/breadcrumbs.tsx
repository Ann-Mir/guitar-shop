import { NavLink } from 'react-router-dom';
import { Breadcrumb } from '../../types/nav';


type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps): JSX.Element {

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {
        breadcrumbs.map(({ title, route }) => (
          <li className="breadcrumbs__item" key={title}>
            <NavLink className="link" to={route}>{title}</NavLink>
          </li>
        ))
      }
    </ul>
  );
}

export default Breadcrumbs;
