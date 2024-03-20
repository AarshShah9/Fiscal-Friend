import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import axios from 'axios';
import Main from './views/Main';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout';
import Budget from './views/Budget';

function App() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Layout />} path="/dashboard">
              <Route path="/dashboard/" element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
