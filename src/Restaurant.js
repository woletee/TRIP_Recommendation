import React, { useState, useEffect } from 'react';

import './App.css';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 10;

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

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="restaurants">
          <table>
            <tbody>
              {currentRestaurants.map((restaurant, index) => (
                index % 2 === 0 ? (
                  <tr key={index}>
                    <td>
                      <div className="restaurant" key={index}>
                        <h3>{restaurant.name}</h3>
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <p>Ranking Position: {restaurant.rankingPosition}</p>
                        <p>Address: {restaurant.address}</p>
                      </div>
                    </td>
                    {currentRestaurants[index + 1] && (
                      <td>
                        <div className="restaurant" key={index + 1}>
                          <h3>{currentRestaurants[index + 1].name}</h3>
                          <img
                            src={currentRestaurants[index + 1].image}
                            alt={currentRestaurants[index + 1].name}
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <p>Ranking Position: {currentRestaurants[index + 1].rankingPosition}</p>
                          <p>Address: {currentRestaurants[index + 1].address}</p>
                        </div>
                      </td>
                    )}
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(restaurants.length / restaurantsPerPage)}>Next</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Restaurant;
