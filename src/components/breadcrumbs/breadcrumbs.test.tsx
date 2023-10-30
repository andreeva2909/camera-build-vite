import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import Breadcrumbs from './breadcrumbs';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const expectedTest = 'breadcrumbs';
    const expectedLinkText = 'Главная';
    const { withStoreComponent } = withStore(<Breadcrumbs />, {
      Data: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
