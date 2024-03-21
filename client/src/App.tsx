import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
import Main from './views/Main';
import Login from './views/Login';
import Signup from './views/Signup';
import LandingPage from './views/LandingPage';
import NotFound from './views/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout';
import Stocks from './views/Stocks'

function App() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  return (
    <div className="App h-full w-full">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/" element={<ProtectedRoute />}> */}
            <Route element={<Layout />} >
              <Route path="/dashboard/" element={<Main />} />
              <Route path="/stocks" element={<Stocks />} />
            </Route>
            
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
