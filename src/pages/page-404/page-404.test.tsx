import Page404 from './page-404';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 page not found';
    const expectedLinkText = 'Вернуться на главную страницу';
    const { withStoreComponent } = withStore(<Page404 />, {
      Data: {
        ...testInitialState
      },
      Basket: {
        ...testInitialStateBasket
      }
    });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
