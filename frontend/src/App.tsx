import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Market from './components/Market';
import Profile from './components/Profile';
import Archive from './components/Archive';
import CreateProduct from './components/CreateProduct';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/market" element={<Market />} />
          <Route path="/createproduct" element={<CreateProduct />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
