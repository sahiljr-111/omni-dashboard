import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Sellers from './components/Sellers.jsx';
import Buyers from './components/Buyers.jsx';
import Diamonds from './components/Diamonds.jsx';
import Contracts from './components/Contracts.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="diamonds" element={<Diamonds />} />
          <Route path="contracts" element={<Contracts />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  </AuthContextProvider>
  // </React.StrictMode>

);
