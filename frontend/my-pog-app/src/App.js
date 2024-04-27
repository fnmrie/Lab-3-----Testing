
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import MyPogs from './components/MyPogs';
import Shop from './components/Shop';
import Signup from './components/Signup'; // Import Signup component
import Login from './components/Login'; // Import Login component
import Admin from './components/Admin/Admin'; // Import Admin component

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-pogs" element={<MyPogs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} /> {/* Add route for Signup */}
        <Route path="/login" element={<Login />} /> {/* Add route for Login */}
        <Route path="/admin" element={<Admin />} /> {/* Add route for Admin page */}
      </Routes>
    </Router>
  );
}

export default App;
