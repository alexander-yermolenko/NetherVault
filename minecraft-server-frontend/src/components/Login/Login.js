import React, { useState, useEffect } from "react";
import './login.css';
import axios from "axios";

const Login = ({ onLogin, isLoggedIn, onLogout }) => {
    const [username, setUsername] = useState("");
    const [userSkin, setUserSkin] = useState("");
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [loginPopupMessage, setLoginPopupMessage] = useState("");

    useEffect(() => {
        if (!isLoggedIn) {
            setUsername("");
        } else {
            const storedUsername = localStorage.getItem('username');
            const storedSkinUrl = localStorage.getItem('skinUrl');

            if (storedUsername && storedSkinUrl) {
                setUsername(storedUsername);
                setUserSkin(storedSkinUrl);
            }
        }
    }, [isLoggedIn]);

    const handleLogin = async () => {
        try {
            const response = await axios.get(`/api/minecraft-login?username=${username}`);
            const { skinUrl, username: minecraftUsername } = response.data;

            localStorage.setItem('username', minecraftUsername);
            localStorage.setItem('skinUrl', skinUrl);

            setUserSkin(skinUrl);
            setUsername(minecraftUsername);

            onLogin({ username: minecraftUsername, skinUrl });
        } catch (error) {
            console.error("Unable to find a player with that username");
            setLoginPopupMessage("Unable to find a player with that username");
            setShowLoginPopup(true);
            document.body.classList.add('no-scroll');
        }
    };

    const handleLogout = () => {
        setUsername("");
        setUserSkin("");
        localStorage.removeItem('username');
        localStorage.removeItem('skinUrl');

        onLogout();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
        setLoginPopupMessage("");
        document.body.classList.remove('no-scroll');
    };

    return (
        <div className="login-container">
            {isLoggedIn ? (
                <div>
                    <h2>Welcome back, {username}!</h2>
                    <img src={userSkin} alt="Minecraft Skin" style={{ width: "100px", height: "100px" }} />
                    <button className="login-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter Minecraft Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            )}
            {showLoginPopup && (
                <div className="login-popup-overlay">
                    <div className="login-popup">
                        <p>{loginPopupMessage}</p>
                        <button onClick={closeLoginPopup}>Okay</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
