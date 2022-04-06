import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { FeedbackWindow } from './FeedbackWindow';
import { PartyContextProvider } from '../contexts/PartyContext';


describe('FeedbackWindow ', () => {
  it('render component', async () => {
    render(
      <MemoryRouter>
        <PartyContextProvider>
          <FeedbackWindow />
        </PartyContextProvider>
      </MemoryRouter>
    );
    const feedbackForm = await screen.getByTestId('feedback-form');
    const addInputBtn = await screen.getByTestId('add-input-btn');
    const nameInput = await screen.getByTestId('name-input');
    const formItems = await screen.getAllByTestId('form-item');
    const cancelBtn = await screen.getByTestId('cancel-btn');

    expect(feedbackForm).toBeInTheDocument();
    expect(addInputBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(formItems).toHaveLength(3);
  });
  it('FeedbackWindow snapshot', () => {
    const FeedbackWindowSnapshot = render(
      <MemoryRouter>
        <PartyContextProvider>
          <FeedbackWindow />
        </PartyContextProvider>
      </MemoryRouter>
    );
    expect(FeedbackWindowSnapshot).toMatchSnapshot();
  });
});
