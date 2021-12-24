import cn from 'classnames';


type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps): JSX.Element {
  const logoClasses = cn(className, 'logo');

  return (
    <a className={logoClasses}>
      <img
        className="logo__img"
        width="70"
        height="70"
        src="./img/svg/logo.svg"
        alt="Логотип"
      />
    </a>
  );
}

export default Logo;
