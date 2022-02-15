import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { mockGuitar, mockState } from '../../utils/test-utils';
import Card from './card';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

describe('Component: Card', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history} >
          <Card guitar={mockGuitar} />
        </Router>,
      </Provider>,
    );

    expect(screen
      .getByText(/Честер Bass/i))
      .toBeInTheDocument();
    expect(screen
      .getByText(/17 500/i))
      .toBeInTheDocument();
    expect(screen.getByText(/рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/купить/i)).toBeInTheDocument();
  });
});
