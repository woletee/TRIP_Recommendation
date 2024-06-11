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
                <Link to={`/places/recommend?longitude=${encodeURIComponent(restaurant.longitude)}&latitude=${encodeURIComponent(restaurant.latitude)}`}>
                    <RestaurantImage src={restaurant.image} alt={restaurant.name} />
                </Link>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantDetails>
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
                    <MoreLink>More</MoreLink>
                </Link>
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
    padding: 20px;
    min-height: 100vh;
    margin-top: 78px;
    margin-left: 26px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin: 20px 0;
    padding-left: 10px;
    border-left: 8px solid rgba(30, 135, 175, 0.5); /* Adjust the color to match the primary color at 50% opacity */
    padding: 0.5rem 0; /* Equivalent to py-2 */
    padding-left: 0.5rem; /* Equivalent to pl-2 */
    font-size: 1.65rem; /* Equivalent to text-3xl */
    font-weight: bold; /* Equivalent to font-bold */
    margin-top: 40px;
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
    cursor: pointer;
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

const MoreLink = styled.span`
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default TopRestaurants;
