import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import Nav from './nav';

const history = createBrowserHistory();

describe('Component: Nav', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Nav />
      </Router>);
    expect(screen
      .getByTestId('nav'))
      .toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Где купить?')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicks the link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Guitars}>
            <p>test page</p>
          </Route>
          <Route>
            <Nav />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText('test page')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('catalog-link'));
    expect(screen.getByText('test page')).toBeInTheDocument();
  });
});
