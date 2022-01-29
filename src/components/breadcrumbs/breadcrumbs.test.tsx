import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { BREADCRUMBS_LINKS } from '../../const';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {

  const fakeBreadcrumbs = [BREADCRUMBS_LINKS.main, BREADCRUMBS_LINKS.catalogue];

  it('should render correctly', () => {
    render(
      <Router history={history} >
        <Breadcrumbs breadcrumbs={fakeBreadcrumbs} />
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
