import { render, screen } from '@testing-library/react';
import { fakeComment } from '../../utils/test-utils';
import Review from './review';


describe('Component: Review', () => {
  it('should render correctly', () => {
    render(<Review review={fakeComment} />);
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('28 сентября 2021 г.')).toBeInTheDocument();
    expect(screen.getByText('Цена=качество.')).toBeInTheDocument();
    expect(screen.getByText('Покрытие.')).toBeInTheDocument();
    expect(screen.getByText('Максим')).toBeInTheDocument();
  });
});
