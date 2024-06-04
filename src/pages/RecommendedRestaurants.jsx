import React, { useState } from 'react';

import Navbar from "../components/Navbar/Navbar";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const RecommendComponent = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  const handleRecommendation = () => {
    fetch(`/api/recommend?longitude=${longitude}&latitude=${latitude}`)
      .then(response => response.json())
      .then(data => {
        setRecommendedRestaurants(data.recommended_restaurants);
      })
      .catch(error => console.error('Error fetching recommendation:', error));
  };

  return (
    <>
    <Navbar handleOrderPopup={handleOrderPopup} />
    <Outlet />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommendation</h2>
        <div className="mb-4">
          <label htmlFor="longitude" className="block text-gray-700">Longitude:</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="latitude" className="block text-gray-700">Latitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          onClick={handleRecommendation}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-md shadow-lg hover:bg-gradient-to-l transform hover:scale-105 duration-300 focus:outline-none"
        >
          Get Recommendation
        </button>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Restaurants:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <tbody>
                {recommendedRestaurants.map((restaurant, index) => (
                  index % 2 === 0 && (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="border-r border-gray-200 p-4">
                        <div className="text-center">
                          <h4 className="font-semibold text-gray-700">{restaurant.name}</h4>
                          <p className="text-gray-500">Ranking Position: {restaurant.rankingPosition}</p>
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="mt-2 w-48 h-32 object-cover rounded-md shadow-sm"
                          />
                        </div>
                      </td>
                      {recommendedRestaurants[index + 1] && (
                        <td className="p-4">
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-700">{recommendedRestaurants[index + 1].name}</h4>
                            <p className="text-gray-500">Ranking Position: {recommendedRestaurants[index + 1].rankingPosition}</p>
                            <img
                              src={recommendedRestaurants[index + 1].image}
                              alt={recommendedRestaurants[index + 1].name}
                              className="mt-2 w-48 h-32 object-cover rounded-md shadow-sm"
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default RecommendComponent;