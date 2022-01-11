import cn from 'classnames';
import {NavLink} from 'react-router-dom';
import { AppRoute } from '../../const';


type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps): JSX.Element {
  const logoClasses = cn(className, 'logo');

  return (
    <NavLink
      className={logoClasses}
      to={AppRoute.Root}
      data-testid="logo"
    >
      <img
        className="logo__img"
        width="70"
        height="70"
        src="./img/svg/logo.svg"
        alt="Логотип"
      />
    </NavLink>
  );
}

export default Logo;
