import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import FeedbackButton from "../components/Feedback/FeedbackButton";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/woletee/TRIP_Recommendation/main/src/Data/Restaurants/100final.csv");
        const csv = await response.text();
        const parsedData = Papa.parse(csv, { header: true }).data;
        const restaurantData = parsedData.find(item => item.id === id);
        setRestaurant(restaurantData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleFeedback = (feedbackData) => {
    console.log("Feedback received:", feedbackData);
    // Here, you can send feedbackData to your backend for further processing and model updating
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section className="container mx-auto p- mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex justify-center items-center">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-60 h-40 object-cover rounded-lg"
          />
          <div className="p-6">
            <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-4xl font-bold mb-4 text-gray-800 dark:text-white">{restaurant.name}</h1>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Location:</strong> {restaurant.address}
            </p>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Ranking:</strong> {restaurant.rankingPosition}
            </p>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Contact:</strong> {restaurant.contact || "Not available"}
            </p>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Opening Hours:</strong> {restaurant.hours || "Not available"}
            </p>
            <p className="text-lg mt-4 text-gray-700 dark:text-gray-400">
              {restaurant.description || "No additional description available."}
            </p>
            {/* <button className="mt-6 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark">
              Make a Reservation
            </button> */}
            <FeedbackButton onFeedback={handleFeedback} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetail;
