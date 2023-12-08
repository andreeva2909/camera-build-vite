import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';
import PopupOrderSuccess from './popup-order-success';

describe('Component: PopupAddProductToBasketSuccess', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const expectedHeaderText = 'Спасибо за покупку';
    const expectedTest = 'popup_order_success';
    const withHistoryComponent = withHistory(<PopupOrderSuccess />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState,
        },
        Basket: {
          ...testInitialStateBasket
        }
      }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
