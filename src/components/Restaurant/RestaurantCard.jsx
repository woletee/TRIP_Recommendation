import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ img, name, location, restaurantId }) => {
    const generateGoogleMapsUrl = () => {
        const encodedAddress = encodeURIComponent(location);
        return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    };

    return (
        <div className="min-w-[250px] max-w-[250px] h-[350px] relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer mb-2 mt-2">
            <Link to={`/restaurants/${restaurantId}`} className="cursor-pointer block">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4 flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                    <p className="text-sm text-gray-600">Address: {location}</p>
                </div>
            </Link>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <a
                    href={generateGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-white py-2 px-12 rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-primary-dark mb-2"
                >
                    Get Directions
                </a>
            </div>
        </div>
    );
};

export default RestaurantCard;
