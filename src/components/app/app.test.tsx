import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import thunk from 'redux-thunk';
import { mockState } from '../../utils/test-utils';
import App from './app';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const TEST_ID = 1;

const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);


describe('Application Routing', () => {
  it('should render "MainPage" when user navigates to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/Cтраница в разработке. Перейдите на страницу каталога./i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigates to "/guitars"', () => {
    history.push(AppRoute.Guitars);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render "GuitarPage" when user navigate to "/guitars/:id"', () => {
    history.push(`/guitars/${TEST_ID}`);
    render(fakeApp);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
