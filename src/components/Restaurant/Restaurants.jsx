import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
            const response = await axios.get('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/all-restaurants');
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
                <RestaurantImage src={restaurant.image} alt={restaurant.name} />
                <RestaurantName>{restaurant.name}</RestaurantName>
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
                </RestaurantDetails>
            </RestaurantCard>
        ));
    };

    return (
        <Container>
            <Title>Restaurants in Gwangju</Title>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <RestaurantsContainer>
                {displayRestaurants(restaurants)}
            </RestaurantsContainer>
        </Container>
    );
};

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    text-align: left;
    color: #333;
    font-size: 2.5em;
    font-weight: bold;
    border-bottom: 4px solid #333;
    display: inline-block;
    padding-bottom: 10px;
`;

const RestaurantsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const RestaurantCard = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex: 1 1 calc(25% - 20px);
    max-width: calc(25% - 20px);
    text-align: left;

    &:hover {
        transform: translateY(-10px);
    }
`;

const RestaurantImage = styled.img`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const RestaurantName = styled.h2`
    margin: 0 0 10px;
    color: #333;
`;

const RestaurantDetails = styled.div`
    font-size: 1rem;
    color: #666;

    p {
        margin: 5px 0;
    }
`;

const MapIcon = styled.span`
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
    font-size: 1.5rem; // Adjust size as needed
`;

export default TopRestaurants;
