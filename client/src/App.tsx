import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./views/Login";
import LandingPage from "./views/LandingPage";
import NotFound from "./views/NotFound";
import axios from 'axios';


function App() {
    // axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
