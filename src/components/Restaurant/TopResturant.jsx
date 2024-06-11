import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTopRestaurants();
    }, []);

    const fetchTopRestaurants = async () => {
        setLoading(true);
        setError(''); // Reset the error state before fetching
        try {
            console.log('Fetching top restaurant data...');
            const response = await axios.get('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/top-restaurants');
            console.log('API Response:', response.data); // Log the API response

            // Check if the response is an array
            if (Array.isArray(response.data)) {
                const parsedData = response.data;
                const containsNaN = obj => Object.values(obj).some(value => value === null || value === undefined || value !== value);
                const filteredData = parsedData.filter(item => item.image && !containsNaN(item));
                setRestaurants(filteredData);
            } else {
                setError('Unexpected API response format');
            }
        } catch (err) {
            setError('Error fetching top restaurants');
            console.error('Fetch error:', err); // Log the error
        } finally {
            setLoading(false);
        }
    };

    const displayRestaurants = (restaurantsData) => {
        console.log('Displaying Restaurants:', restaurantsData); // Log the restaurants data being displayed
        if (!restaurantsData || restaurantsData.length === 0) {
            return <p>Finding Restaurants...</p>;
        }

        return restaurantsData.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id || index}>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantImage 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    onClick={() => window.open(`https://map.naver.com/v5/search/${restaurant.name}/place/${restaurant.latitude},${restaurant.longitude}`, '_blank')}
                />
                <RestaurantDetails>
                    <p>Ranking: {restaurant.Ranking}</p>
                    <p>Address: {restaurant.address}</p>
                    <p>Number of Reviews: {restaurant.numberOfReviews}</p>
                    <p>Phone: {restaurant.phone}</p>
                    <p>Rating: {restaurant.rating}</p>
                    <MapIcon 
                        onClick={() => window.open(`https://map.naver.com/v5/search/${restaurant.name}/place/${restaurant.latitude},${restaurant.longitude}`, '_blank')}
                    >
                        📍
                    </MapIcon>
                    <LikeIcon>👍</LikeIcon>
                    <DislikeIcon>👎</DislikeIcon>
                </RestaurantDetails>
                <Link to={`/places/recommend?longitude=${encodeURIComponent(restaurant.longitude)}&latitude=${encodeURIComponent(restaurant.latitude)}`}>
                    <PlaceLink>More</PlaceLink>
                </Link>
            </RestaurantCard>
        ));
    };

    return (
        <Container>
            <Title>Popular Restaurants</Title>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <RestaurantsContainer>
                {displayRestaurants(restaurants)}
            </RestaurantsContainer>
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

const RestaurantsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const RestaurantCard = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    flex: 1 1 calc(25% - 32px); // 4 restaurants per row
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

const RestaurantName = styled.h2`
    font-size: 1.5rem;
    color: #333;
`;

const RestaurantImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const RestaurantDetails = styled.div`
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

export default TopRestaurants;
