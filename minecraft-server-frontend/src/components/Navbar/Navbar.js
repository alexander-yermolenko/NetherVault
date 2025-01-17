import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Navbar = ({ isLoggedIn, username, skinUrl, onLogout, onBasket }) => {
    return (
        <nav className="vertical-nav">
            <ul>
                <li className="login">
                    {!isLoggedIn ? (
                        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : undefined}>Login</NavLink>
                    ) : (
                        <div className="user-profile">
                            <img src={skinUrl} alt="Minecraft Skin" className="user-skin" />
                            <span className="username">{username}</span>
                            <button onClick={onBasket} className="profile-btn basket-btn">
                                <i className="fas fa-shopping-basket"></i> {/* Font Awesome basket icon */}
                            </button>
                            <button onClick={onLogout} className="profile-btn logout-btn">
                                <i className="fas fa-sign-out-alt"></i> {/* Font Awesome logout icon */}
                            </button>
                        </div>
                    )}
                </li>
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/shop" className={({ isActive }) => isActive ? "active" : undefined}>Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/rules" className={({ isActive }) => isActive ? "active" : undefined}>Rules</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
