import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';
import MainPage from './main';
import { TIME_TO_RENDER_PAGE } from '../../constants';
window.scrollTo = vi.fn().mockImplementation(() => null);
describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Каталог фото- и видеотехники';
    const expectedTest = 'main_page';
    const { withStoreComponent } = withStore(<MainPage />, {
      Data: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedHeaderText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
