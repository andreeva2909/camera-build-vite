import { render, screen } from '@testing-library/react';
import Filter from './filter';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: Filter', () => {
  it('should render correctly', () => {
    const filterTestId = 'filter';

    const { withStoreComponent } = withStore(<Filter />, {
      Data: {
        ...testInitialState
      }
    });

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const filterContainer = screen.getByTestId(filterTestId);

    expect(filterContainer).toBeInTheDocument();
  });
});
