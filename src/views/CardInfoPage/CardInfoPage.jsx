import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import './customCard.css';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import pointsImage from './points.png';
import discountImage from './discount.png';
import Slider from 'react-slick';
import {
  Paper,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%' }}>
      {/* Points section with image and vertically aligned text */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <img src={pointsImage} alt="Points" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
        <span style={{ fontWeight: 'bold', color: '#CD7F32', fontSize: '27px', lineHeight: '60px' }}>Points: 95</span>
      </div>

      {/* Display the Card component */}
      <Cards
        className={'customCard'}
        number={'1234 1234 1234 1234'}
        expiry={'05/27'}
        cvc={'123'}
        name={'User whoever'}
        focused={true}
      />

      {/* Slider for events */}
      <div style={{ marginTop: '10px', width: '100%', padding: '0 20px' }}>
        <h2>Your events history:</h2>
        <Slider {...sliderSettings}>
          {events.map((event) => (
            <div key={event.id} style={{ padding: '10px' }}>
              <Paper style={{ height: '200px', position: 'relative', padding: '20px', backgroundColor: '#FFFFFF' }}>
                {/* Calendar and date */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon style={{ marginRight: '5px' }} />
                  <Typography variant="body2">{event.date}</Typography>
                </div>

                {/* Event details */}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <NavigateNextIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography fontWeight="bold">{event.title}</Typography>}
                    secondary={
                      event.keywords.map((keyword, keyIndex) => (
                        <Chip key={keyIndex} label={keyword} style={{ margin: '5px', backgroundColor: '#cce7c9', color: 'black' }} />
                      ))
                    }
                  />
                </ListItem>

                {/* Points display in the lower right corner */}
                 <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
                                  <img src={pointsImage} alt="Points" style={{ width: '60px', height: '60px', marginRight: '5px' }} />
                                  <Typography variant="body2" style={{ color: '#CD7F32' }}>Points: {event.points}</Typography>
                                </div>
              </Paper>
            </div>
          ))}
        </Slider>
      </div>

    {/* Donate to charity section */}
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <button onClick={handleDonateClick} style={{ padding: '15px 30px', fontSize: '18px', borderRadius: '20px', backgroundColor: '#5bb450', color: 'white', border: 'none', cursor: 'pointer' }}>
        Donate to Charity
      </button>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: 'larger' }}>
          Change starts with you.
        </Typography>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Support the causes you believe in.
        </Typography>
      </div>
      {showPopup && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <p>Contact us for further details about how to donate your points...</p>
            <button onClick={handleClosePopup} style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', color: 'black', border: '1px solid #ddd', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
     {/* Personal benefits section moved below the events slider */}
          {/* Personal benefits section with horizontal lines */}
                <div style={{ width: '100%', marginTop: '40px' }}>
                  <hr style={{ width: '90%', border: '1px solid #ddd' }} /> {/* Top horizontal line */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', margin: '20px 0' }}>
                    <Typography variant="h5" style={{ textAlign: 'center' }}>Personal benefits</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                      {/* Example of a discount display with larger images */}
                      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <img src={discountImage} alt="Discount" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                        <Typography variant="body1">H&N - 10% discount on an item for 20 points</Typography>
                      </div>
                      {/* ... Repeat for other discounts ... */}
                      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <img src={discountImage} alt="Discount" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                        <Typography variant="body1">Deutsche Bank - Win the hackathon for 100 points</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <img src={discountImage} alt="Discount" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                        <Typography variant="body1">Glowo - Free shipping for the next 10 purchases for 50 points</Typography>
                      </div>
                    </div>
                  </div>
                  <hr style={{ width: '90%', border: '1px solid #ddd' }} /> {/* Bottom horizontal line */}
                </div>

        </Box>
      );
    }
