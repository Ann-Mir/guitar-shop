import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';
import CataloguePage from '../pages/catalogue-page/catalogue-page';
import GuitarPage from '../pages/guitar-page/guitar-page';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import UnderConstructionPage from '../pages/under-construction-page/under-construction-page';
import './app.css';

function App(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route exact path={AppRoute.Root} component={MainPage} />
        <Route exact path={AppRoute.Guitars} component={CataloguePage} />
        <Route
          exact
          path={AppRoute.UnderConstruction}
          component={UnderConstructionPage}
        />
        <Route path={AppRoute.Guitar} component={GuitarPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
