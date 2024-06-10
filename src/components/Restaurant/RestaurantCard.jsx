import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ img, name, location, restaurantId }) => {
    return (
        <div
          className="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        >
        <Link to={`/restaurants/${restaurantId}`} className="cursor-pointer">
            <img
              src={img}
              alt={name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
              <p className="text-sm text-gray-600 mb-1">Location: {location}</p>
            </div>
          </Link>
        </div>
    );
  };

export default RestaurantCard;