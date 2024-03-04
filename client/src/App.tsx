import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import LoginPage from './views/LoginPage';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFount';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
