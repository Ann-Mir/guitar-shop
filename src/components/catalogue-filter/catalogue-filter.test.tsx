import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import CatalogueFilter from './catalogue-filter';
import { mockState } from '../../test-utils';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CatalogueFilter />
    </Router>
  </Provider>
);

describe('Component: CatalogueFilter', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
