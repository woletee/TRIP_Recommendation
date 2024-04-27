import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function Restaurants() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/Data/Restaurants/100final.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data;
        setRestaurantData(parsedData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="restaurant-data text-center mt-20">
      <h1 className=" text-left my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold ">
          Restaurant
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {restaurantData.map((item, index) => (
          <div key={index} className="restaurant w-64 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-1">Location: {item.address}</p>
              <p className="text-sm text-gray-600">Ranking: {item.rankingPosition}</p>
              {/* Add more fields as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;