import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewSuccess from './review-success';

const fakeHandler = jest.fn();

describe('Component: ReviewSuccess', () => {
  it('should render correctly', () => {
    render(<ReviewSuccess onClose={fakeHandler} />);
    expect(screen
      .getByTestId('success-modal'))
      .toBeInTheDocument();
  });

  it('should handle close button correctly', () => {
    render(<ReviewSuccess onClose={fakeHandler} />);
    const closeButton = screen.getByTestId('success-close-button');

    userEvent.click(closeButton);
    expect(fakeHandler).toBeCalled();
  });
});
