import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './commonStyles.css';

const IpoCalendar = () => {
  const [ipoData, setIpoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIpoData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
      );
      setIpoData(response.data);
    } catch (error) {
      console.error('Error in fetching the IPO data:', error);
      setError('Error in fetching the IPO data. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchIpoData();
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchIpoData();
  };

  const renderIpoTableRow = (ipo) => (
    <tr key={ipo.id}>
      <td>{ipo.companyName}</td>
      <td>{ipo.symbol}</td>
    </tr>
  );

  const renderIpoTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>{ipoData.map(renderIpoTableRow)}</tbody>
    </table>
  );

  return (
    <div className="container">
      <h2>IPO Calendar</h2>
      {loading ? (
        <p>Loading the IPO data</p>
      ) : (
        <>
          {renderIpoTable()}
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

export default IpoCalendar;
