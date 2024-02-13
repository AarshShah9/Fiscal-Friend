import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import LoginPage from "./views/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage   />} />
      </Routes>
    </div>
  );
}

export default App;
