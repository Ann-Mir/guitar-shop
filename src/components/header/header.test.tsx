import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { mockState } from '../../test-utils';
import Header from './header';

const history = createBrowserHistory();
const mockStore = configureMockStore([thunk]);

const store = mockStore(mockState);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);
    expect(screen
      .getByTestId('header'))
      .toBeInTheDocument();
  });
});
