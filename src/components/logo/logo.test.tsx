import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import Logo from './logo';

const history = createBrowserHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>);
    expect(screen
      .getByTestId('logo'))
      .toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicks the link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
