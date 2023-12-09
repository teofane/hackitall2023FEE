import React from 'react';
import EventsList from '../components/EventsList';
import ChatAssistant from '../components/ChatAssistant';
import EnvironmentalBadges from '../components/EnvironmentalBadges';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './OverviewPage.css'; // Make sure this is the correct path to your CSS file

function OverviewPage() {
  return (
    <>
      <EnvironmentalBadges />
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5rem', marginBottom: '2rem', color: '#333', fontSize: '2rem' }}>
        Upcoming Events
      </h2>
      <EventsList />
      <ChatAssistant />
    </>
  );
}

export default OverviewPage;
