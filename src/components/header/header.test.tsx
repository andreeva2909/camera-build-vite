import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory } from '../../test-mocks/test-component';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';
    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    const headerContainer = screen.getByTestId(headerTestId);

    expect(headerContainer).toBeInTheDocument();
  });
});
