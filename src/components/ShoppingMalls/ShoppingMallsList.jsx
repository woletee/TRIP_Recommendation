import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const ShoppingMallsList = () => {
  const [mallData, setMallData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/woletee/TRIP_Recommendation/main/src/Data/ShoppingMalls/shopping.csv");
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

  const redirectToGoogleMaps = (address) => {
    const formattedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    window.open(googleMapsUrl, "_blank");
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
                <div className="text-center">
                  <button
                    onClick={() => redirectToGoogleMaps(item.address)}
                    className="inline-block bg-primary text-white py-2 px-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-primary-dark"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShoppingMallsList;
