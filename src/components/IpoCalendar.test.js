import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import IpoCalendar from './IpoCalendar';

jest.mock('axios');

describe('IpoCalendar Component', () => {
  const mockIpoData = [
    { id: 1, companyName: 'Company X', symbol: 'X' },
    { id: 2, companyName: 'Company Y', symbol: 'Y' },
  ];

  beforeEach(() => {
    axios.get.mockReset();
  });

  test('renders IPO data on successful API call', async () => {
    axios.get.mockResolvedValueOnce({ data: mockIpoData });

    render(<IpoCalendar />);

    await waitFor(() => {
      expect(screen.getByText('Company X')).toBeInTheDocument();
      expect(screen.getByText('Company Y')).toBeInTheDocument();
    });
  });

  test('renders the error message if API call is unsuccessful', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<IpoCalendar />);

    await waitFor(() => {
      expect(
        screen.getByText('Error in fetching the IPO data. Please try again later')
      ).toBeInTheDocument();
    });
  });

  test('triggers the manual refresh on button click', async () => {
    axios.get.mockResolvedValueOnce({ data: mockIpoData });

    render(<IpoCalendar />);

    await waitFor(() => {
      expect(screen.getByText('Company X')).toBeInTheDocument();
    });

    axios.get.mockResolvedValueOnce({ data: [] });

    userEvent.click(screen.getByText('Refresh'));

    await waitFor(() => {
      expect(screen.queryByText('Company X')).not.toBeInTheDocument();
    });
  });
});
