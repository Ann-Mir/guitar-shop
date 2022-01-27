import { render, screen } from '@testing-library/react';
import Rating from './rating';

const MAX_STARTS = 5;

describe('Component: Rating', () => {
  const fakeRating = 3;
  it('should render correctly', () => {
    render(<Rating rating={fakeRating} />);
    const emptyStars = screen.getAllByTestId('empty-star');
    const fullStars = screen.getAllByTestId('full-star');
    expect(emptyStars.length).toEqual(MAX_STARTS - fakeRating);
    expect(fullStars.length).toEqual(fakeRating);
  });
});
