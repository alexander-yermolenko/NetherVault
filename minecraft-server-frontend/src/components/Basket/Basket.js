import React from "react";
import "./basket.css";

const Basket = ({ basket, removeFromBasket }) => {
    const handleCheckout = () => {
        // Replace this URL with your actual Tebex store URL
        const tebexUrl = "https://your-tebex-store-url.com/checkout";
        window.location.href = tebexUrl;
    };

    return (
        <div className="basket-container">
            <h1>Your Basket</h1>
            {basket.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                <ul>
                    {basket.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.price} USD
                            <button onClick={() => removeFromBasket(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {basket.length > 0 && (
                <button className="checkout-button" onClick={handleCheckout}>
                    Checkout
                </button>
            )}
        </div>
    );
};

export default Basket;
