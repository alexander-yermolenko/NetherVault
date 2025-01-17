import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../../assets/logo.png';
import popupSound from '../../assets/Villager_accept.mp3';
import discordSound from '../../assets/Villager_trade.mp3';

const Header = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const handleIPClick = () => {
        navigator.clipboard.writeText("play.minecraftserver.net");
        setPopupVisible(true);
        document.getElementById('popupSound').play();
        document.body.classList.add('no-scroll');
    };

    const handleDiscordClick = (e) => {
        e.preventDefault();
        document.getElementById('discordSound').play();
        setTimeout(() => {
            window.location.href = e.target.href;
        }, 500);
    };

    const closePopup = () => {
        setPopupVisible(false);
        document.body.classList.remove('no-scroll');
    };

    useEffect(() => {
        const resizeText = () => {
            const serverInfo = document.querySelector('.server-info');
            const serverInfoButton = document.querySelector('.server-info button');
            if (serverInfo && serverInfoButton) {
                let fontSize = parseFloat(window.getComputedStyle(serverInfo).fontSize);
                const maxFontSize = 22;
                const minFontSize = 12;
                serverInfo.style.fontSize = `${maxFontSize}px`;

                while (serverInfoButton.scrollWidth > serverInfo.clientWidth && fontSize > minFontSize) {
                    fontSize -= 1;
                    serverInfo.style.fontSize = `${fontSize}px`;
                }

                if (fontSize < minFontSize) {
                    serverInfo.style.fontSize = `${minFontSize}px`;
                }
            }
        };

        window.addEventListener('resize', resizeText);
        resizeText();
        return () => window.removeEventListener('resize', resizeText);
    }, []);

    return (
        <header className="header">
            <div className="server-info">
                <button onClick={handleIPClick} className="minecraft-text">play.minecraftserver.net</button>
            </div>
            <div className="logo-container">
                <img src={logo} alt="Minecraft Server Logo" className="logo" />
            </div>
            <a href="https://discord.gg/yourserver" className="discord-link minecraft-text" onClick={handleDiscordClick}>
                Join our Discord
            </a>
            {popupVisible && (
                <>
                    <div className="overlay show" onClick={closePopup}></div>
                    <div className="popup show">
                        <p>IP Copied!</p>
                        <p>We hope to see you online soon!</p>
                        <button onClick={closePopup}>OK</button>
                    </div>
                </>
            )}
            <audio id="popupSound" src={popupSound}></audio>
            <audio id="discordSound" src={discordSound}></audio>
        </header>
    );
};

export default Header;
