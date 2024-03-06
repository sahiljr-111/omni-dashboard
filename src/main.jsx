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
import Posts from './components/Posts.jsx';
import SellerData from './components/SellerData.jsx';
import AddDiamonds from './components/AddDiamonds.jsx';
import BuyerData from './components/BuyerData.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="sellers/:id" element={<SellerData />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="buyers/:id" element={<BuyerData />} />
          <Route path="diamonds" element={<Diamonds />} />
          <Route path="posts" element={<Posts />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path='diamonds/addDiamond' element={<AddDiamonds />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  </AuthContextProvider>
  // </React.StrictMode>

);
