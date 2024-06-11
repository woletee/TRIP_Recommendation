import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/top-hotels')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const displayHotels = (hotelsData) => {
    if (!hotelsData || hotelsData.length === 0) {
      return <p>Finding Hotels...</p>;
    }

    return hotelsData.map((hotel, index) => (
      <HotelCard key={hotel.hotel_id || index}>
        <HotelName>{hotel.name}</HotelName>
        <HotelImage 
          src={hotel.thumbnail} 
          alt={hotel.name}
          onClick={() => window.open(`https://map.naver.com/v5/search/${hotel.name}/place/${hotel.location.lat},${hotel.location.lng}`, '_blank')}
        />
        <HotelDetails>
          <p>City: {hotel.city}</p>
          {hotel.rating && hotel.rating.value && (
            <p>Rating: {hotel.rating.value} ({hotel.rating.count} reviews)</p>
          )}
          {hotel.price && hotel.price.value && (
            <p>Price: ${hotel.price.value}</p>
          )}
          {hotel.star && (
            <p>Star Rating: {hotel.star}</p>
          )}
          {hotel.phone && (
            <p>Phone: {hotel.phone}</p>
          )}
          <MapIcon 
            onClick={() => window.open(`https://map.naver.com/v5/search/${hotel.name}/place/${hotel.location.lat},${hotel.location.lng}`, '_blank')}
          >
            📍
          </MapIcon>
          <LikeIcon>👍</LikeIcon>
          <DislikeIcon>👎</DislikeIcon>
        </HotelDetails>
        <Link to={`/places/recommend?longitude=${encodeURIComponent(hotel.location.lng)}&latitude=${encodeURIComponent(hotel.location.lat)}`}>
          <PlaceLink>More</PlaceLink>
        </Link>
      </HotelCard>
    ));
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>Error: {error.message}</Error>;
  }

  return (
    <Container>
      <Title>Popular Hotels</Title>
      <HotelsContainer>
        {displayHotels(hotels)}
      </HotelsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: left;
`;

const HotelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const HotelCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  flex: 1 1 calc(25% - 32px); // 4 hotels per row
  box-sizing: border-box;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: calc(25% - 32px);
  text-align: left;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const HotelName = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const HotelImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const HotelDetails = styled.div`
  font-size: 1rem;
  color: #666;
`;

const PlaceLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const MapIcon = styled.span`
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1.5rem; // Adjust size as needed
`;

const LikeIcon = styled.span`
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1.5rem; // Adjust size as needed
  color: green;
`;

const DislikeIcon = styled.span`
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1.5rem; // Adjust size as needed
  color: red;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 24px;
  color: #333;
`;

const Error = styled.div`
  text-align: center;
  font-size: 24px;
  color: red;
`;

export default TopHotels;
