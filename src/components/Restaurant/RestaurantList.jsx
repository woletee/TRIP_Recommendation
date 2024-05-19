import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

function RestaurantList() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/Data/Restaurants/100final.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data;
        const filteredData = parsedData.filter(item => item.image);
        setRestaurantData(filteredData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRestaurantClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold mt-20">
            Restaurants
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {restaurantData.map((item, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => handleRestaurantClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    Location: {item.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ranking: {item.rankingPosition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default RestaurantList;