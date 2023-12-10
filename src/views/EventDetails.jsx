import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {Map, Marker} from "pigeon-maps";
import { osm } from 'pigeon-maps/providers'

// defaultCenter={[45.9432, 24.9668]}

export default function EventDetails() {
  const {id} = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/events")
        .then(data => data.json())
        .then(response => {setEvent(response.find(el => el.id === Number(id)))})
    }, []);

  return (<>
    {!event ?
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
    <CircularProgress size={120}/>
  </Box> :
        <Box>
          <Box sx={{ position: 'fixed', top: 'auto' , right: '5px', zIndex: 1000, border:2 }}>
            <Map
                height={400}
                width={500}
                defaultCenter={[event.latitude, event.longitude]}
                defaultZoom={12}
                provider={osm}
            >
              <Marker  width={40} color={"red"} height={60} anchor={[event.latitude, event.longitude]} />
            </Map>
          </Box>
          <Typography textAlign="left" variant="h4" sx={{marginBottom:3}}>
            {event.title}
          </Typography>
          <Typography textAlign="left" variant="body1" sx={{maxWidth: 900}}>
            {event.description}
          </Typography>

        </Box>
    }
  </>);
}