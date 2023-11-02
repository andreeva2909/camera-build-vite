import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../test-mocks/test-component';
window.scrollTo = vi.fn().mockImplementation(() => null);
describe('Component: Footer', () => {
  it('should render correctly', () => {
    const footerTestId = 'footer';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    const footerContainer = screen.getByTestId(footerTestId);

    expect(footerContainer).toBeInTheDocument();
  });
});
