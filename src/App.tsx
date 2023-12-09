import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from "./views/LoginPage";
import Header from "./components/Header";
import OverviewPage from "./views/OverviewPage";
import EventDetails from "./views/EventDetails";
import EventsPage from "./views/EventsPage";
import CardInfoPage from "./views/CardInfoPage/CardInfoPage";

function App() {
  let location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<OverviewPage />} />
        <Route path='/event/RebuildTheForest' element={<EventDetails />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/myEcoCard' element={<CardInfoPage />} />
      </Routes>
    </>
)
  ;
}

export default App;
