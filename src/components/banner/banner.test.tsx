import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import Banner from './banner';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const expectedTest = 'banner';
    const { withStoreComponent } = withStore(<Banner />, {
      Data: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
  });
});
