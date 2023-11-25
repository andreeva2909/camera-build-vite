import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';
    const { withStoreComponent } = withStore(<Header />, {
      Data: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const headerContainer = screen.getByTestId(headerTestId);
    expect(headerContainer).toBeInTheDocument();
  });
});
