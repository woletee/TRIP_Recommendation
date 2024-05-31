import React, { useState } from 'react';

function RecommendComponent() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  const handleRecommendation = () => {
    fetch(`/api/recommend?longitude=${longitude}&latitude=${latitude}`)
      .then(response => response.json())
      .then(data => {
        setRecommendedRestaurants(data.recommended_restaurants);
      })
      .catch(error => console.error('Error fetching recommendation:', error));
  };

  return (
    <div>
      <h2>Recommendation</h2>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
        />
      </div>
      <button onClick={handleRecommendation}>Get Recommendation</button>
      <div>
        <h3>Recommended Restaurants:</h3>
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <tbody>
            {recommendedRestaurants.map((restaurant, index) => (
              index % 2 === 0 && (
                <tr key={index} style={{ border: "1px solid black" }}>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    <h4>{restaurant.name}</h4>
                    <p>Ranking Position: {restaurant.rankingPosition}</p>
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      style={{ width: "200px", height: "150px", objectFit: "cover" }}
                    />
                  </td>
                  {recommendedRestaurants[index + 1] && (
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      <h4>{recommendedRestaurants[index + 1].name}</h4>
                      <p>Ranking Position: {recommendedRestaurants[index + 1].rankingPosition}</p>
                      <img
                        src={recommendedRestaurants[index + 1].image}
                        alt={recommendedRestaurants[index + 1].name}
                        style={{ width: "200px", height: "150px", objectFit: "cover" }}
                      />
                    </td>
                  )}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecommendComponent;
