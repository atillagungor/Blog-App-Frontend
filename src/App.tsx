import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile'; // Profile bileşenini ekledik

const App: React.FC = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/register'];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile sayfasını ekledik */}
      </Routes>
      {(location.pathname === '/home' || location.pathname === '/profile') && <Footer />} {/* Footer'ı Home ve Profile sayfalarında gösteriyoruz */}
    </div>
  );
};

export default App;
