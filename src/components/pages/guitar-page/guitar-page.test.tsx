import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockState } from '../../../utils/test-utils';
import GuitarPage from './guitar-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <GuitarPage />
    </Router>
  </Provider>
);

describe('Component: GuitarPage', () => {
  it('should render correctly', () => {
    history.push('/guitars/1');
    render(fakeApp);
    expect(screen.getByText('Товар')).toBeInTheDocument();
  });
});
