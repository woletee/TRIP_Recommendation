import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ShoppingMallCard from "./ShoppingMallCard";

function ShoppingMalls() {
  const [mallData, setMallData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/src/Data/ShoppingMalls/shopping.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true }).data;
        const filteredData = parsedData.filter(item => item["imageUrls/0"]).slice(0, 20);
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

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Shopping Malls
        </h1>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4">
            {mallData.map((item, index) => (
              <ShoppingMallCard
                key={index}
                img={item["imageUrls/0"]}
                name={item.name}
                address={item.address}
                phone={item.phone}
                website={item.searchPageLoadedUrl}
                id={index + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingMalls;