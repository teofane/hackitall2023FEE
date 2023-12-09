import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import './customCard.css';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function CardInfoPage() {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleDonateClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error or set default events if needed
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      {/* Display the Card component */}
      <Cards
        className={'customCard'}
        number={'1234 1234 1234 1234'}
        expiry={'05/27'}
        cvc={'123'}
        name={'User whoever'}
        focused={true}
      />

      {/* Points rectangle */}
      <div style={{marginTop:'10px', fontWeight: 'bold', color: 'white', fontSize: '24px', padding: '5px', borderRadius: '5px', backgroundColor: 'green' }}>
        Points: 95
      </div>

      {/* Render the fetched events */}
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Your events history:</h2>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              position: 'relative',
              marginBottom: '30px',
              marginTop: '30px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#cccccc',
              width: '900px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h3>
              {event.title} - {event.date}
            </h3>
            <div style={{ position: 'absolute', top: '5px', right: '5px', fontWeight: 'bold', backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Points: {event.points}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {event.keywords.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  variant="outlined"
                  style={{ margin: '4px', color: 'white', backgroundColor: 'green' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Donate to charity section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={handleDonateClick} style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Donate to Charity
        </button>
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>You can donate your points to charities by your choice!</p>
        {showPopup && (
          <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
              <p>Contact us for further details about how to donate your points...</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* Benefits section */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2>Personal benefits
        </h2>
        <p>- you can spend your eco points at the following stores -</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px', margin: '10px' }}>
            <h3>H&N</h3>
            <p>10% discount on an item for 20 points</p>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px', margin: '10px' }}>
            <h3>Deutsche Bank</h3>
            <p>Win the hackathon for 100 points</p>
          </div>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px', margin: '10px' }}>
            <h3>Glowo</h3>
            <p>Free shipping for the next 10 purchases for 50 points</p>
        </div>
      </div>
    </Box>
  );
}
