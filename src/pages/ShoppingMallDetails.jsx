import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useParams } from "react-router-dom";
import FeedbackButton from "../components/Feedback/FeedbackButton";

const ShoppingMallDetails = () => {
  const { id } = useParams();
  const [mall, setMall] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMallData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/woletee/TRIP_Recommendation/main/src/Data/ShoppingMalls/shopping.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        const mallData = parsedData.find(item => item.id === parseInt(id));
        setMall(mallData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchMallData();
  }, [id]);

  const handleFeedback = (feedbackData) => {
    console.log("Feedback received:", feedbackData);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mall) {
    return <div>Loading...</div>;
  }

  const openingDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const cleanHours = (hours) => hours.replace(/\?/g, '');

  const allHoursUnavailable = openingDays.every((_, index) => !mall[`openingHours/${index}/hours`]);

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section className="container mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex justify-center items-center">
          <img
            src={mall["imageUrls/0"]}
            alt={mall.name || "Name not provided"}
            className="w-60 h-40 object-cover rounded-lg"
          />
          <div className="p-6">
            <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              {mall.name || "Name not provided"}
            </h1>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Location:</strong> {mall.address}
            </p>
            <p className="text-xl mb-2 text-gray-600 dark:text-gray-300">
              <strong>Phone:</strong> {mall.phone || "Not available"}
            </p>
            <p className="text-sm text-gray-600">Opening Hours:</p>
            {allHoursUnavailable ? (
              <p className="text-sm text-gray-600">Not available</p>
            ) : (
              <ul className="opening-hours text-sm text-gray-600">
                {openingDays.map((day, index) => (
                  <li key={index}>
                    {mall[`openingHours/${index}/day`]}: {mall[`openingHours/${index}/hours`] ? cleanHours(mall[`openingHours/${index}/hours`]) : "Not available"}
                  </li>
                ))}
              </ul>
            )}
            <FeedbackButton onFeedback={handleFeedback} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingMallDetails;
