import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    const loaderContainer = screen.getByTestId(loaderTestId);

    expect(loaderContainer).toBeInTheDocument();
  });
});
