import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { mockGuitar } from '../../utils/test-utils';
import Card from './card';

const history = createMemoryHistory();

describe('Component: Card', () => {

  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Card guitar={mockGuitar} />
      </Router>,
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
