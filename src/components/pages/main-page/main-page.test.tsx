import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import MainPage from './main-page';
import { mockState } from '../../../test-utils';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <MainPage />
    </Router>
  </Provider>
);

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });
});
