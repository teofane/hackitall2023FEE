import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import mapDataRO from '@highcharts/map-collection/countries/ro/ro-all.geo.json';

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}
HighchartsMap(Highcharts);

const mapOptions = {
  chart: {
    map: 'countries/ro/ro-all'
  },
  title: {
    text: 'Upcoming events map'
  },
  mapNavigation: {
    enabled: true
  },
  series:[{

    // Use the ro-all map with no data as a basemap
    name: 'Basemap',
    mapData: mapDataRO,
    borderColor: '#A0A0A0',
    nullColor: 'rgba(200, 200, 200, 0.3)',
    showInLegend: false
  }, {
    // Specify points using lat/lon
    type: 'mappoint',
    showInLegend: false, // This hides the series name in the legend
    data: [{
      name: 'Event 1',
      details: "This is the event details for the first event",
      lat: 44.4268,
      lon: 26.1025,
      marker: {
        lineWidth: 1,
        lineColor: '#000',
        symbol: 'mapmarker',
        radius: 8,
        fillColor: "red"
      },
      dataLabels: {
        enabled: true,
        format: 'Replant the forests'
      }
    }, {
      name: 'Event 2',
      details: "test details 2",
      lat: 46.7712,
      lon: 23.6236,
      marker: {
        lineWidth: 1,
        lineColor: '#000',
        symbol: 'mapmarker',
        radius: 8,
        fillColor: "red"
      },
      dataLabels: {
        enabled: true,
        format: 'Eco Summit'
      }
    }]
  }],
  plotOptions: {
    series: {
      states: {
        inactive: {
          opacity: 1
        }},
      stickyTracking: false
    }
  },
  tooltip: {
    headerFormat: '',
    formatter: event => {return "" + event.chart.hoverPoint.details},
    useHTML: true,
    borderWidth: 0,
    snap: 0
  },
  credits: { enabled: false },
  accessibility: { enabled: false },
};

const EventPage = () => (
  <div>
    <HighchartsReact
      constructorType={'mapChart'}
      highcharts={Highcharts}
      options={mapOptions}
    />
  </div>
);

export default EventPage;
