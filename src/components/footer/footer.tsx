import About from '../about/about';
import Contacts from '../contacts/contacts';
import FooterNav from '../footer-nav/footer-nav';
import Logo from '../logo/logo';
import Socials from '../socials/socials';


function Footer(): JSX.Element {

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__container container">
        <Logo className={'footer__logo'} />
        <Socials />
        <About />
        <FooterNav />
        <Contacts />
      </div>
    </footer>
  );
}

export default Footer;
