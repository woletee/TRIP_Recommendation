import React from 'react';

const HotelCard = ({ name, image, description, rating }) => {
    return (
        <div className="hotel-card">
            <img src={image} alt={`Image of ${name}`} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Rating: {rating}</p>
        </div>
    );
};

export default HotelCard;
