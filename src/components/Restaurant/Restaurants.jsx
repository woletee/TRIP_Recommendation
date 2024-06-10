import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import RestaurantCard from "./RestaurantCard";

function Restaurants() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/woletee/TRIP_Recommendation/main/src/Data/Restaurants/100final.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data;
        const filteredData = parsedData.filter(item => item.image).slice(0, 20);
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

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold mt-20">
          Restaurants
        </h1>
        <div className="overflow-x-auto scrollbar-hide"> {}
          <div className="flex space-x-4">
            {restaurantData.map((item, index) => (
              <RestaurantCard
                key={index}
                img={item.image}
                name={item.name}
                location={item.address}
                ranking={item.rankingPosition}
                restaurantId={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Restaurants;