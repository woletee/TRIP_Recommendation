import React from "react";
import { Link } from "react-router-dom";

const ShoppingMallCard = ({ img, name, address, id }) => {

  const generateGoogleMapsUrl = () => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  return (
    <div className="min-w-[250px] max-w-[250px] h-[350px] flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer mb-2 mt-2">
      <Link to={`/shopping/${id}`} className="cursor-pointer flex-grow">
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-sm text-gray-600">Address: {address}</p>
        </div>
      </Link>
      <div className="p-6 flex justify-center">
        <a
          href={generateGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center bg-primary text-white py-2 px-5 rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-primary-dark"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default ShoppingMallCard;