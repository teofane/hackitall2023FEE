import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import mapDataRO from '@highcharts/map-collection/countries/ro/ro-all.geo.json';
import {Box, CircularProgress} from "@mui/material";
import {osm} from "pigeon-maps/providers";
import {Map, Marker} from "pigeon-maps";
import {useNavigate, useNavigation} from "react-router-dom";

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}
HighchartsMap(Highcharts);

// const mapOptions = {
//   chart: {
//     map: 'countries/ro/ro-all'
//   },
//   title: {
//     text: 'Upcoming events map'
//   },
//   mapNavigation: {
//     enabled: true
//   },
//   series:[{
//     // Use the ro-all map with no data as a basemap
//     name: 'Basemap',
//     mapData: mapDataRO,
//     borderColor: '#A0A0A0',
//     nullColor: 'rgba(200, 200, 200, 0.3)',
//     showInLegend: false
//   }, {
//     // Specify points using lat/lon
//     type: 'mappoint',
//     showInLegend: false, // This hides the series name in the legend
//     data: []
//   }],
//   plotOptions: {
//     series: {
//       states: {
//         inactive: {
//           opacity: 1
//         }},
//       stickyTracking: false
//     }
//   },
//   tooltip: {
//     headerFormat: '',
//     formatter: event => {return "" + event.chart.hoverPoint.details},
//     useHTML: true,
//     borderWidth: 0,
//     snap: 0
//   },
//   credits: { enabled: false },
//   accessibility: { enabled: false },
// };

const CustomTooltip = ({ event, isVisible }) => {
    return (
        <div
            style={{
                position: "relative",
                top: 0,
                left: 0,
                maxWidth: 700,
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
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/events")
        .then(data => data.json())
        .then(response => {
            setEvents(response)
            setIsLoading(false);
        })
        // .then(response => {
        //   setOptions(prevState => ({
        //     ...prevState,
        //     series: [{
        //     // Use the ro-all map with no data as a basemap
        //     name: 'Basemap',
        //     mapData: mapDataRO,
        //     borderColor: '#A0A0A0',
        //     nullColor: 'rgba(200, 200, 200, 0.3)',
        //     showInLegend: false
        //   }, {
        //     // Specify points using lat/lon
        //     type: 'mappoint',
        //     showInLegend: false, // This hides the series name in the legend
        //       data: response?.map((ev) => {
        //         return {
        //           name: ev.title,
        //           details: ev.comments[0],
        //           lat: ev.latitude,
        //           lon: ev.longitude,
        //           marker: {
        //             lineWidth: 1,
        //             lineColor: '#000',
        //             symbol: 'mapmarker',
        //             radius: 10,
        //             fillColor: "red"
        //           },
        //           dataLabels: {
        //             enabled: true,
        //             format: ev.title
        //           }
        //         }
        //       })
        //   }]
        //   }))
        //   setIsLoading(false);
        //   setEvents(response)
        // })


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
        <Box>
            <Box sx={{ position: 'fixed', top: 'auto' , right: '5px', zIndex: 1000, border:2 }}>
            {/*<HighchartsReact*/}
            {/*  constructorType={'mapChart'}*/}
            {/*  highcharts={Highcharts}*/}
            {/*  options={options}*/}
            {/*/>*/}
              <Map
                  height={500}
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
              </Map>
              {hoveredEvent &&  <CustomTooltip event={hoveredEvent} isVisible={hoveredEvent} />}
          </Box>
        </Box>
    )
};

export default EventPage;
