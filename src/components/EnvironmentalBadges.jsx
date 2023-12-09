// EnvironmentalBadges.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Beach from './badges/beach.png';
import Tree from './badges/tree.png';
import Plane from './badges/plane.png';
import Sport from './badges/sport.png';
import Food from './badges/food.png';
import Star from './badges/star.png';
import Plant from './badges/plant.png';

const EnvironmentalBadge = ({ image, text, color }) => (
  <Box textAlign="center">
    <img src={image} alt={text} style={{ width: '70px', height: '100px', objectFit: 'contain' }} />
    <Typography variant="body2" sx={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
      {text}
    </Typography>
  </Box>
);

const EnvironmentalBadges = () => {
  const badgesData = [
    { image: Tree, text: 'Planted my first tree', color: 'primary' },
    { image: Beach, text: 'Enjoyed a beach cleanup', color: 'success' },
    { image: Plant, text: 'Started a community garden', color: 'info' },
    { image: Star, text: 'Reduced carbon footprint', color: 'warning' },
    { image: Food, text: 'Adopted sustainable food habits', color: 'secondary' },
    { image: Plane, text: 'Offset travel carbon emissions', color: 'primary' },
    { image: Sport, text: 'Engaged in eco-friendly sports', color: 'success' },
    // Add more badges as needed
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '2rem' }}>
      {badgesData.map((badge, index) => (
        <Box key={index} sx={{ mx: 6, my: 0 }}>
          <EnvironmentalBadge {...badge} />
        </Box>
      ))}
    </Box>
  );
};

export default EnvironmentalBadges;
