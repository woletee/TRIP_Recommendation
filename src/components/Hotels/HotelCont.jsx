import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import HotelCard from "./HotelCard";

function Hotels() {
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/Data/Hotels/100final.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data;
        const filteredData = parsedData.filter(item => item.image_url).slice(0, 20);
        setHotelData(filteredData);
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
          Hotels
        </h1>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4">
            {hotelData.map((item, index) => (
              <HotelCard
                key={index}
                img={item.image_url}
                name={item.hotel_name}
                location={item.address}
                rating={item.rating}
                handleHotelClick={() => {
                  console.log(`Hotel clicked: ${item.hotel_name}`);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hotels;