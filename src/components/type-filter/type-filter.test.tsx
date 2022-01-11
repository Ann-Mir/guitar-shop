import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import TypeFilter from './type-filter';
import { mockState } from '../../utils/test-utils';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <TypeFilter />
    </Router>
  </Provider>
);

describe('Component: TypeFilter', () => {

  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Тип гитар')).toBeInTheDocument();
  });
});
