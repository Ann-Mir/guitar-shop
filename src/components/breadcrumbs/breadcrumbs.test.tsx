import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {

  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Breadcrumbs />
      </Router>,
    );

    expect(screen
      .getByText(/Главная/i))
      .toBeInTheDocument();
    expect(screen
      .getByText(/Каталог/i))
      .toBeInTheDocument();
  });
});
