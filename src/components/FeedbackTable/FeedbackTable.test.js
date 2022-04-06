import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FeedbackTable } from './FeedbackTable';
import { PartyContextProvider } from '../contexts/PartyContext';


describe('FeedbackTable ', () => {
  it('render component', async () => {
    render(
      <PartyContextProvider>
        <FeedbackTable />
      </PartyContextProvider>
    );
    const feedbackTable = await screen.getByTestId('feedback-table');
    const refreshBtn = await screen.getByTestId('refresh-button');
    const guestsList = await screen.getByTestId('guests-list');

    expect(feedbackTable).toBeInTheDocument();
    expect(refreshBtn).toBeInTheDocument();
    expect(guestsList).toBeInTheDocument();
  });
  it('FeedbackTable snapshot', () => {
    const FeedbackTableSnapshot = render(
      <PartyContextProvider>
        <FeedbackTable />
      </PartyContextProvider>
    );
    expect(FeedbackTableSnapshot).toMatchSnapshot();
  });
});
