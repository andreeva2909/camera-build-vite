import Page404 from './page-404';
import { withHistory } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';

describe('Component: Page404', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 page not found';
    const expectedLinkText = 'Вернуться на главную страницу';
    const preparedComponent = withHistory(<Page404 />);

    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
