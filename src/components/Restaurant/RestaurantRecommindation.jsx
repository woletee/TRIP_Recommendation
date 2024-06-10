import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/clusters")
      .then(res => res.json())
      .then(data => {
        console.log("Data received:", data); // Log the received data
        setRestaurants(data.clusters);
      })
      .catch(error => {
        console.error("Error fetching data:", error); // Log any fetch errors
      });
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  const nextPage = () => {
    if (currentPage < Math.ceil(restaurants.length / restaurantsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold mt-20">
          Restaurants
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Location: {restaurant.address}
                </p>
                <p className="text-sm text-gray-600">
                  Ranking: {restaurant.rankingPosition}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination mt-8 flex justify-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(restaurants.length / restaurantsPerPage)}
            className="mx-2 px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}

export default Restaurant;
