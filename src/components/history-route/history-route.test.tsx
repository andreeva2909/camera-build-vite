import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';
import { render, screen } from '@testing-library/react';

describe('Component: HistoryRouter', () => {
  it('should render correctly with HOC', () => {
    const expectedText = 'History Router child';
    const mockComponent = <span>{expectedText}</span>;
    const mockHistory = createMemoryHistory();
    const preparedComponent = (
      <HistoryRouter history={mockHistory}>{mockComponent}</HistoryRouter>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
