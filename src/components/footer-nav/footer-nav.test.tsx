import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import FooterNav from './footer-nav';

const history = createBrowserHistory();

describe('Component: FooterNav', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <FooterNav />
      </Router>);
    expect(screen
      .getByTestId('footer-nav'))
      .toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByText('Вопрос - ответ')).toBeInTheDocument();
    expect(screen.getByText('Возврат')).toBeInTheDocument();
  });
});
