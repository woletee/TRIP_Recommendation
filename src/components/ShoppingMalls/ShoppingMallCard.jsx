import React from "react";

const ShoppingMallCard = ({ img, name, address, phone, website, handleMallClick }) => {
  return (
    <div
      className="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={handleMallClick}
    >
      <img
        src={img}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mb-1">Address: {address}</p>
        <p className="text-sm text-gray-600 mb-1">Phone: {phone}</p>
        <p>
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </p>
      </div>
    </div>
  );
};

export default ShoppingMallCard;