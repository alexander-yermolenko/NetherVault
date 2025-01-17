import React, { useState } from "react";
import ranks from "./ranks.json";
import "./shop.css";

const Shop = ({ addToBasket, currentRank }) => {
    const [selectedRank, setSelectedRank] = useState(null);

    const handleInfoClick = (rank) => {
        setSelectedRank(rank);
        document.body.classList.add('no-scroll');
    };

    const closePopup = () => {
        setSelectedRank(null);
        document.body.classList.remove('no-scroll');
    };

    const handleAddToBasket = (rank) => {
        addToBasket(rank);
    };

    return (
        <div className="shop-container">
            <h1>Shop</h1>
            <div className="items">
                {ranks.map((rank, index) => (
                    <div className="item-card" key={index}>
                        <h2>{rank.name}</h2>
                        <p className="price">{rank.price} USD</p>
                        <button className="info-button" onClick={() => handleInfoClick(rank)}>
                            Info
                        </button>
                        <button
                            className={`buy-button ${currentRank && currentRank.name === rank.name ? "added-to-basket" : ""}`}
                            onClick={() => handleAddToBasket(rank)}
                            disabled={currentRank && currentRank.name === rank.name}
                        >
                            {currentRank && currentRank.name === rank.name ? "Added to Basket" : currentRank ? "Change to" : "Add to Basket"}
                        </button>
                    </div>
                ))}
            </div>

            {selectedRank && (
                <div className="shop-popup-overlay">
                    <div className="shop-popup">
                        <h2>{selectedRank.name} Details</h2>
                        <div className="rank-section">
                            <h3>Commands:</h3>
                            <ul>
                                {selectedRank.commands.map((command, i) => (
                                    <li key={i}>{command}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="rank-section">
                            <h3>Kit:</h3>
                            <ul>
                                {selectedRank.kit.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <button className="close" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
