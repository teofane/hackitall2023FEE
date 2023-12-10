import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, List, ListItem, Paper, Collapse, IconButton } from "@mui/material";
import { Map, Marker } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers';
import { Map as MapIcon } from '@mui/icons-material';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [mapOpen, setMapOpen] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then(data => data.json())
      .then(response => {
        setEvent(response.find(el => el.id === Number(id)))
      })
  }, [id]);

  const toggleMap = () => {
    setMapOpen(!mapOpen);
  };

  return (
    <>
      {!event ? (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <CircularProgress size={120} />
        </Box>
      ) : (
        <Box>
          <Box sx={{ position: 'fixed', top: 'auto', right: '5px', zIndex: 1000, border: 2 }}>
            <Collapse in={mapOpen}>
              <Map
                height={400}
                width={500}
                defaultCenter={[event.latitude, event.longitude]}
                defaultZoom={12}
                provider={osm}
              >
                <Marker width={40} color={"red"} height={60} anchor={[event.latitude, event.longitude]} />
              </Map>
            </Collapse>
            <IconButton onClick={toggleMap}>
              <MapIcon />
            </IconButton>
            <Collapse in={!mapOpen}>
              <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', display: 'flex', alignItems: 'center' }}>
                <MapIcon />
                <Typography variant="body2" sx={{ marginLeft: '5px' }}>Map</Typography>
              </Box>
            </Collapse>
          </Box>
          <Typography textAlign="left" variant="h4" sx={{ marginBottom: 3 }}>
            {event.title}
          </Typography>
          <Typography textAlign="left" variant="body1" sx={{ maxWidth: 900 }}>
            {event.description}
          </Typography>
          <Typography textAlign="left" variant="body1">
            Date: {event.date}
          </Typography>
          <Typography textAlign="left" variant="body1">
            Items:
            <List>
              {event.items.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </Typography>
          <Typography textAlign="left" variant="body1">
            Participants:
            <List>
              {event.participants.map((participant, index) => (
                <ListItem key={index}>{participant}</ListItem>
              ))}
            </List>
          </Typography>
          <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', marginTop: '20px' }}>
            <Typography textAlign="left" variant="body1">
              Points: {event.points}
            </Typography>
          </Box>
          <Typography textAlign="left" variant="body1">
            Announcements:
            <List>
              {event.announces.map((announcement, index) => (
                <Paper key={index} elevation={3} sx={{ margin: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                  {announcement}
                </Paper>
              ))}
            </List>
          </Typography>
          <Typography textAlign="left" variant="body1">
            Comments:
            <List>
              {event.comments.map((comment, index) => (
                <Paper key={index} elevation={3} sx={{ margin: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                  {comment}
                </Paper>
              ))}
            </List>
          </Typography>
        </Box>
      )}
    </>
  );
}
