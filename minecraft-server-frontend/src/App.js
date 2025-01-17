import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Shop from './components/Shop/Shop';
import Rules from './components/Rules/Rules';
import Basket from './components/Basket/Basket';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [skinUrl, setSkinUrl] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state
  const [showAppPopup, setShowAppPopup] = useState(false);
  const [basket, setBasket] = useState([]); // Add basket state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedSkinUrl = localStorage.getItem('skinUrl');

    if (storedUsername && storedSkinUrl) {
      setUsername(storedUsername);
      setSkinUrl(storedSkinUrl);
      setIsLoggedIn(true);
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  useEffect(() => {
    if (!loading && location.pathname === '/shop' && !isLoggedIn) {
      setShowAppPopup(true);
      document.body.classList.add('no-scroll');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [loading, location.pathname, isLoggedIn, navigate]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setSkinUrl(userData.skinUrl);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('skinUrl', userData.skinUrl);
    navigate('/'); // Redirect to home page upon login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setSkinUrl('');
    localStorage.removeItem('username');
    localStorage.removeItem('skinUrl');
    navigate('/login'); // Redirect to login page upon logout
  };

  const closeAppPopup = () => {
    setShowAppPopup(false);
    document.body.classList.remove('no-scroll');
  };

  const addToBasket = (rank) => {
    setBasket([rank]); // Replace the rank instead of adding a new one
  };

  const removeFromBasket = (index) => {
    setBasket([]); // Clear the basket
  };

  const onBasket = () => {
    navigate('/basket');
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return (
      <div className="App">
        <Header />
        <div className="app-layout">
          <Navbar
              isLoggedIn={isLoggedIn}
              username={username}
              skinUrl={skinUrl}
              onLogout={handleLogout}
              onBasket={onBasket} // Pass the onBasket function to Navbar
          />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/login"
                  element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
              />
              <Route
                  path="/shop"
                  element={isLoggedIn ? <Shop addToBasket={addToBasket} currentRank={basket[0]} /> : <Navigate to="/login" />} // Pass current rank in basket
              />
              <Route path="/rules" element={<Rules />} />
              <Route
                  path="/basket"
                  element={<Basket basket={basket} removeFromBasket={removeFromBasket} />} // Pass basket state
              />
            </Routes>
          </main>
        </div>
        <Footer />

        {showAppPopup && (
            <div className="app-popup-overlay">
              <div className="app-popup">
                <p>Please log in first to access the shop.</p>
                <button onClick={closeAppPopup}>Okay</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
