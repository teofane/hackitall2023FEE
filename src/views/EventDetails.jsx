import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, List, ListItem, Paper, Collapse, IconButton, Grid, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material";
import { Map, Marker } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers';
import { Map as MapIcon } from '@mui/icons-material';
import { useParams } from "react-router-dom";

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
          <Typography textAlign="left" variant="h4" sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
               {event.title} - {event.date}
            <Box sx={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '10px', marginLeft: '20px', marginTop: '5px' }}>
              <Typography
                textAlign="left"
                variant="body1"
                sx={{
                  backgroundColor: '#cce7c9',
                  padding: '5px',
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                }}
              >
                Points: {event.points}
              </Typography>
            </Box>
          </Typography>
          <Typography
            textAlign="justify"
            variant="body1"
            sx={{
              maxWidth: 900,
              marginLeft: '20px',
              backgroundColor: '#cce7c9',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          >
            {event.description}
          </Typography>
          <Grid container spacing={2} sx={{ marginLeft: '10px', maxWidth: 900 }}>
            <Grid item xs={4}>
              <Typography textAlign="left" variant="body1">
                Participants:
                <List sx={{ paddingLeft: '0px' }}>
                  {event.participants.map((participant, index) => (

                    <ListItem key={index} sx={{ marginBottom: '5px' }}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="../avatar.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={participant}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                              </Typography>
                              {"Confirmed participation"}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign="left" variant="body1">
                Items:
                <List sx={{ paddingLeft: '20px' }}>
                  {event.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <input type="checkbox" style={{ marginRight: '5px' }} /> {/* Checkbox */}
                        <Typography sx={{ marginLeft: '5px' }}>{item}</Typography> {/* Item text */}
                      </ListItem>
                      {index !== event.items.length - 1 && <Divider />} {/* Add a divider except for the last item */}
                    </React.Fragment>
                  ))}
                </List>
              </Typography>
            </Grid>

          </Grid>

          <Typography textAlign="left" variant="body1" sx={{ marginLeft: '20px' }}>
            Announcements:
            <List>
              {event.announces.map((announcement, index) => (
                <Paper key={index} elevation={3} sx={{ margin: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'white', width: 'fit-content' }}>
                  {announcement}
                </Paper>
              ))}
            </List>
          </Typography>
          <Typography textAlign="left" variant="body1" sx={{ marginLeft: '20px' }}>
            Comments:
            <List>
              {event.comments.map((comment, index) => (
                <Paper key={index} elevation={3} sx={{ margin: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'white', width: 'fit-content' }}>
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
