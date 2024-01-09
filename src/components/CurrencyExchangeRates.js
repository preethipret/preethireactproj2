import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './commonStyles.css';

const CurrencyExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
      );
      setExchangeRates(response.data);
    } catch (error) {
      console.error('Error in fetching the exchange rates:', error);
      setError('Error in fetching the exchange rates. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchExchangeRates();
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchExchangeRates();
  };

  const renderExchangeRateRow = (rate) => (
    <tr key={rate.symbol}>
      <td>{rate.symbol}</td>
      <td>{rate.rate}</td>
    </tr>
  );

  const renderExchangeRateTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Currency Pair</th>
          <th>Lastest Price</th>
        </tr>
      </thead>
      <tbody>{exchangeRates.map(renderExchangeRateRow)}</tbody>
    </table>
  );

  return (
    <div className="container">
      <h2>Exchange Rates for Currency</h2>
      {loading ? (
        <p>Loading the exchange rates</p>
      ) : (
        <>
          {renderExchangeRateTable()}
          <button onClick={handleRefresh}>Refresh</button>
          <br />
          <br />
          <Link to="../dashboard">Back to the Dashboard</Link>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CurrencyExchangeRates;
