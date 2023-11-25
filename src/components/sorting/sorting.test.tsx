import { render, screen } from '@testing-library/react';
import Sorting from './sorting';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const sotringTestId = 'sorting';

    const { withStoreComponent } = withStore(<Sorting />, {
      Data: {
        ...testInitialState
      }
    });

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const sortingContainer = screen.getByTestId(sotringTestId);

    expect(sortingContainer).toBeInTheDocument();
  });
});
