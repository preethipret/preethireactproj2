import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import CurrencyExchangeRates from './CurrencyExchangeRates';

jest.mock('axios');

describe('CurrencyExchangeRates Component', () => {
  describe('when API call is successful', () => {
    const mockExchangeRates = [
      { symbol: 'USDCAD', rate: 2.55 },
      { symbol: 'USDJPY', rate: 2.45 },
    ];

    beforeEach(() => {
      axios.get.mockResolvedValueOnce({ data: mockExchangeRates });
      render(<CurrencyExchangeRates />);
    });

    test('renders the exchange rates', async () => {
      await waitFor(() => {
        expect(screen.getByText('USDCAD')).toBeInTheDocument();
        expect(screen.getByText('USDJPY')).toBeInTheDocument();
      });
    });

    test('triggers the manual refresh on button click', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });

      userEvent.click(screen.getByText('Refresh'));

      await waitFor(() => {
        expect(screen.queryByText('USDCAD')).not.toBeInTheDocument();
      });
    });
  });

  describe('when API call is unsuccessful', () => {
    beforeEach(() => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));
      render(<CurrencyExchangeRates />);
    });

    test('renders error message', async () => {
      await waitFor(() => {
        expect(
          screen.getByText('Error in fetching the exchange rates. Please try again later.')
        ).toBeInTheDocument();
      });
    });
  });
});
