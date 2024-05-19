import React from "react";

const RestaurantCard = ({ img, name, location, ranking, handleRestaurantClick }) => {
    return (
      <div
        className="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        onClick={handleRestaurantClick}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-sm text-gray-600 mb-1">Location: {location}</p>
          <p className="text-sm text-gray-600">Ranking: {ranking}</p>
        </div>
      </div>
    );
  };

export default RestaurantCard;