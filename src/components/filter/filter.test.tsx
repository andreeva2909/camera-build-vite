import { render, screen } from '@testing-library/react';
import Filter from './filter';

describe('Component: Filter', () => {
  it('should render correctly', () => {
    const filterTestId = 'filter';

    render(<Filter />);

    const filterContainer = screen.getByTestId(filterTestId);

    expect(filterContainer).toBeInTheDocument();
  });
});
