import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function EventsList() {
  const [likedEvents, setLikedEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend using fetch
    fetch('http://localhost:8080/events')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleLikeClick = (eventNumber) => {
    // Toggle the like status for the clicked event
    setLikedEvents((prevLikedEvents) =>
      prevLikedEvents.includes(eventNumber)
        ? prevLikedEvents.filter((event) => event !== eventNumber)
        : [...prevLikedEvents, eventNumber]
    );
  };

  const settings = {
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
    <div style={{ padding: '20px' }}>
      <Slider {...settings}>
        {events.map((event, index) => (

          <div key={event.id} style={{ width: '100%', padding: '10px' }}> {/* Wrapper div for each slide */}
            <Paper style={{ height: '200px', position: 'relative', padding: '20px',backgroundColor: '#FFFFFF' }}> {/* Relative position context */}
              <IconButton onClick={() => handleLikeClick(event.id)} style={{ position: 'absolute', zIndex: 1 }}>
                <FavoriteIcon />
              </IconButton>
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon style={{ marginRight: '5px' }} />
                <Typography variant="body2">{event.date}</Typography>
              </div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NavigateNextIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontWeight="bold">{event.title}</Typography>}
                  secondary={
                    Array.isArray(event.keywords) && event.keywords.map((keyword, keyIndex) => (
                      <Chip key={keyIndex} label={keyword} style={{ margin: '5px', backgroundColor: '#cce7c9', color: 'black'}} />
                    ))
                  }
                />
              </ListItem>
            </Paper>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default EventsList;
