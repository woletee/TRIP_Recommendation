import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

function ShoppingMallsList() {
  const [mallData, setMallData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/Data/ShoppingMalls/shopping.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data.map((item, index) => ({
          id: index + 1, // Generate an id based on the index (starting from 1)
          ...item, // Keep the existing properties from the CSV data
        }));
        const filteredData = parsedData.filter(item => item["imageUrls/0"]);
        setMallData(filteredData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleMallClick = (id) => {
    navigate(`/shopping/${id}`);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold mt-20">
          Shopping Malls
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mallData.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => handleMallClick(item.id)}
            >
              <img
                src={item["imageUrls/0"]}
                alt={item.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.address}
                </h2>
                {/* <p className="text-sm text-gray-600">
                  Opening Hours:
                </p>
                <ul className="opening-hours">
                  {Array.from(Array(7).keys()).map((day) => (
                    <li key={day}>
                      {item[`openingHours/${day}/day`]}: {item[`openingHours/${day}/hours`]}
                    </li>
                  ))}
                </ul> */}
                <p className="text-sm text-gray-600 mb-1">
                  Phone: {item.phone}
                </p>
                <p>
                  <a href={item.searchPageLoadedUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShoppingMallsList;
