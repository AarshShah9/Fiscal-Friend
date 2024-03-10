import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import LoginPage from './views/LoginPage';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFount';
import LayoutWide from './components/layout_wide';
import Savings from './views/Savings'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/home2" element={<LayoutWide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/savings" element ={<Savings/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
