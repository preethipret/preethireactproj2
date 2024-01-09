import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  test('renders the welcome message and navigation links', () => {
    const user = { username: 'Mithra' };
    render(
      <Router>
        <Dashboard user={user} />
      </Router>
    );

    
    expect(screen.getByText('Welcome to the dashboard, Mithra!')).toBeInTheDocument();

   
    expect(screen.getByText('IPO Calendar')).toBeInTheDocument();
    expect(screen.getByText('Currency Exchange Rates')).toBeInTheDocument();
  });

  
});
