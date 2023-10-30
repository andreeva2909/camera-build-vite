import { render, screen } from '@testing-library/react';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sotringTestId = 'sorting';

    render(<Sorting />);

    const sortingContainer = screen.getByTestId(sotringTestId);

    expect(sortingContainer).toBeInTheDocument();
  });
});
