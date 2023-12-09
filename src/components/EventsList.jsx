// EventsList.js
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  Typography,
  Paper,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';

function EventsList() {
  const [likedEvents, setLikedEvents] = useState([]);

  const handleLikeClick = (eventNumber) => {
    // Toggle the like status for the clicked event
    setLikedEvents((prevLikedEvents) =>
      prevLikedEvents.includes(eventNumber)
        ? prevLikedEvents.filter((event) => event !== eventNumber)
        : [...prevLikedEvents, eventNumber]
    );
  };

  const eventBoxStyles = (eventNumber) => ({
    bgcolor: likedEvents.includes(eventNumber) ? '#ff5252' : 'transparent',
    margin: '10px',
    borderRadius: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    width: 'calc(20% - 20px)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  });

  const heartIconStyles = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer',
    color: likedEvents.length > 0 ? 'white' : 'grey',
    transition: 'color 0.3s ease-in-out',
  };

  return (
    <Paper
      sx={{
        width: '100%',
        ml: 1,
        mt: '3rem',
        border: 0,
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
        <Paper key={el} sx={eventBoxStyles(el)} onClick={() => handleLikeClick(el)}>
          <IconButton sx={heartIconStyles}>
            <FavoriteIcon />
          </IconButton>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NavigateNextIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography fontWeight="bold">Single-line text</Typography>}
              secondary={el % 2 === 0 ? 'Secondary text' : 'Alternate text'}
            />
          </ListItem>
        </Paper>
      ))}
    </Paper>
  );
}

export default EventsList;
