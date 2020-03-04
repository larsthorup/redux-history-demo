import { render, fireEvent } from '@testing-library/react';
import { createRootElement } from './root';

test('app', () => {
  // When: render
  const { queryByText } = render(createRootElement());

  // Then: initially show home page
  expect(queryByText('See your latest transactions')).not.toBeNull();

  // When: click to see latest transactions
  fireEvent.click(queryByText('See your latest transactions'));

  // Then: initially show all transactions
  expect(queryByText('DK SuperB Gentofte B')).not.toBeNull();
  expect(queryByText('DK BlackSwan')).not.toBeNull();

  // When: click on row
  fireEvent.click(queryByText('DK BlackSwan'));

  // Then: only transactions from that account is shown
  expect(queryByText('DK SuperB Gentofte B')).toBeNull();
  expect(queryByText('DK BlackSwan')).not.toBeNull();

  // When: navigate home
  fireEvent.click(queryByText('Home'));

  // Then: initially show home page
  expect(queryByText('See your latest transactions')).not.toBeNull();
});
