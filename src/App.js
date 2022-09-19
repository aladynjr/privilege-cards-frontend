import React from 'react';
import logo from './logo.svg';
import './App.scss';
import 'animate.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginScreen from './screens/loginscreen';
import HomeScreen from './screens/homescreen';
import Navbar from './components/navbar';
import AddScreen from './screens/addscreen';
import ApproveScreen from './screens/approvescreen';

import VerificationScreen from './screens/verificationscreen';

function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Navbar /> 
      <div className="pages">
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          
          <Route exact path="/Home" element={<HomeScreen />} />

          <Route exact path="/Verify" element={<VerificationScreen />} />

          <Route exact path="/add" element={<AddScreen />} />
          <Route exact path="/approve" element={<ApproveScreen />} />

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
