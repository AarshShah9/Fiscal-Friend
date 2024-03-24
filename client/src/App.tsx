import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import axios from 'axios';
import Main from './views/Main';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Accounts from './views/Accounts';
import Layout from './components/layout';
import Budget from './views/Budget';
import Stocks from './views/Stocks';
import Testimonials from './views/Testimonials';
import AboutUs from './views/AboutUs';
import Team from './views/Team';

function App() {
  axios.defaults.withCredentials = true;

  return (
    <div className="App h-full">
      <AuthProvider>
        <Routes>
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Layout />} path="/dashboard">
              <Route path="/dashboard/" element={<Main />} />
              <Route path="/dashboard/budget" element={<Budget />} />
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route path="/dashboard/stocks" element={<Stocks />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
