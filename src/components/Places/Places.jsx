import React, { useState } from 'react';
import axios from 'axios';
import './Places.css';

const Places = () => {
  const [formData, setFormData] = useState({
    type: 'museum',
    start_time: 9,
    end_time: 17,
    restaurant_recommendation: 'no',
    hotel_recommendation: 'no',
    mall_recommendation: 'no',
    restaurant_budget: 0,
    hotel_budget: 0,
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://ec2-54-221-54-196.compute-1.amazonaws.com/recommend', formData);
      setResults(response.data);
    } catch (err) {
      setError('Error fetching recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container1">
      <h1 className="title">Trip Recommendation</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Type of Place:</label>
          <select name="type" value={formData.type} onChange={handleChange} className="form-control">
            <option value="museum">Museum</option>
            <option value="park">Park</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input type="number" name="start_time" value={formData.start_time} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input type="number" name="end_time" value={formData.end_time} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Include Restaurants:</label>
          <select name="restaurant_recommendation" value={formData.restaurant_recommendation} onChange={handleChange} className="form-control">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Restaurant Budget:</label>
          <input type="number" name="restaurant_budget" value={formData.restaurant_budget} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Include Hotels:</label>
          <select name="hotel_recommendation" value={formData.hotel_recommendation} onChange={handleChange} className="form-control">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hotel Budget (USD):</label>
          <input type="number" name="hotel_budget" value={formData.hotel_budget} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Include Malls:</label>
          <select name="mall_recommendation" value={formData.mall_recommendation} onChange={handleChange} className="form-control">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Get Recommendations</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {results && (
        <div className="results">
          <h2>Recommended Places</h2>
          <ul>
            {results.places.map((place, index) => (
              <li key={index}>{place.Name} - {place.predicted_rating}</li>
            ))}
          </ul>
          
          {results.restaurants.length > 0 && (
            <>
              <h2>Recommended Restaurants</h2>
              <ul>
                {results.restaurants.map((restaurant, index) => (
                  <li key={index}>{restaurant.Name}</li>
                ))}
              </ul>
            </>
          )}

          {results.hotels.length > 0 && (
            <>
              <h2>Recommended Hotels</h2>
              <ul>
                {results.hotels.map((hotel, index) => (
                  <li key={index}>{hotel.Name}</li>
                ))}
              </ul>
            </>
          )}

          {results.malls.length > 0 && (
            <>
              <h2>Recommended Malls</h2>
              <ul>
                {results.malls.map((mall, index) => (
                  <li key={index}>{mall.Name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Places;
