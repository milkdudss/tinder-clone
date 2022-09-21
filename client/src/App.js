import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useCookies} from 'react-cookie';

const App = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  const AuthToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
          {AuthToken && <Route path="/dashboard" element={<Dashboard/>}/> }
          {AuthToken && <Route path="/onboarding" element={<Onboarding/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
