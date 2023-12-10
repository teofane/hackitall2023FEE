import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import mapDataRO from '@highcharts/map-collection/countries/ro/ro-all.geo.json';
import {
    Avatar,
    Box, Chip,
    CircularProgress,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {osm} from "pigeon-maps/providers";
import {Map, Marker} from "pigeon-maps";
import {useNavigate, useNavigation} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}
HighchartsMap(Highcharts);


const CustomTooltip = ({ event, isVisible }) => {
    return (
        <div
            style={{
                position: "relative",
                top: 0,
                left: 0,
                width: 690,
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
                display: isVisible ? "block" : "none",
            }}
        >
            <strong>{event.title}</strong>
            <p>{event.description}</p>
        </div>
    );
};

const EventPage = () => {
  const [events, setEvents] = useState([]);
  // const [options, setOptions] = useState(mapOptions)
    const navigate = useNavigate();
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [hoveredOnList, setHoveredOnList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/events")
        .then(data => data.json())
        .then(response => {
            setEvents(response)
            setIsLoading(false);
        })
  }, []);

  return (
    isLoading ?
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <CircularProgress size={120}/>
        </Box> :
        <Box  sx={{ display: 'flex', flexDirection: 'row', justifyContent : 'space-between' }}>
            <Box sw={{maxWidth:10}}>
                {events.map((event, index) => (
                    <div key={event.id} style={{ width: '100%', padding: '10px' }}>
                        <Paper
                            style={{
                                height: 7 !== event.id ? '110px' : '150',
                                width: '650px',
                                position: 'relative',
                                padding: '20px',
                                backgroundColor: 7 === event.id ? 'gold' : '#FFFFFF',
                                cursor: 'pointer', // Add cursor pointer for click indication
                            }}
                            onMouseOver={ev => {
                                ev.stopPropagation();
                                setHoveredOnList(event);
                            }}
                            onMouseOut={ev => {
                                setHoveredOnList(null)
                            }}
                            onMouseDown={ev => {
                                navigate("/event/" + event.id)
                            }}
                        >
                            <IconButton onClick={() => handleLikeClick(event.id)} style={{ position: 'absolute', zIndex: 1 }}>
                                <FavoriteIcon />
                            </IconButton>
                            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon style={{ marginRight: '5px' }} />
                                <Typography variant="body2">{event.date}</Typography>
                            </div>
                            <ListItem >
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
                            {7 === event.id && (
                                <Typography
                                    variant="body2"
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        left: '20px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                    }}
                                >
                                    Recommended based on your past attendances
                                </Typography>
                            )}
                        </Paper>
                    </div>
                ))}
            </Box>
            <Box sx={{ position: 'fixed', top: 'auto' , right: '5px', zIndex: 1000, border:2 }}>
              <Map
                  height={435}
                  width={700}
                  defaultCenter={[45.9432, 24.9668]}
                  defaultZoom={6.5}
                  provider={osm}
              >
              {events?.map(event => {
                  return <Marker width={40} color={"red"} height={60} anchor={[event.latitude, event.longitude]} onClick={() => {navigate(`/event/${event.id}`)}}
                                 onMouseOver={() => setHoveredEvent(event)}
                                 onMouseOut={() => setHoveredEvent(null)}
                  />
              })}
              {hoveredOnList && <Marker width={40} color={"blue"} height={60} anchor={[hoveredOnList.latitude, hoveredOnList.longitude]} onClick={() => {navigate(`/event/${event.id}`)}}
                                            onMouseOver={() => setHoveredEvent(hoveredOnList)}
                                            onMouseOut={() => setHoveredEvent(null)} />
                  }
              </Map>
              {(hoveredEvent || hoveredOnList) &&  <CustomTooltip event={hoveredEvent || hoveredOnList} isVisible={hoveredEvent || hoveredOnList} />}
          </Box>
        </Box>
    )
};

export default EventPage;
