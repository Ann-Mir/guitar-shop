import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import CardList from './cards-list';
import { mockGuitars, mockState } from '../../test-utils';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CardList />
    </Router>
  </Provider>
);

describe('Component: CardList', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(mockGuitars.length);
  });
});
