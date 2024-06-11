import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const PlacesRecommended = () => {
    const [recommendedHotels, setRecommendedHotels] = useState([]);
    const [recommendedMalls, setRecommendedMalls] = useState([]);
    const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const query = useQuery();
    const longitude = query.get('longitude');
    const latitude = query.get('latitude');

    useEffect(() => {
        if (longitude && latitude) {
            fetchRecommendedPlaces(longitude, latitude);
        }
    }, [longitude, latitude]);

    const fetchRecommendedPlaces = async (lon, lat) => {
        try {
            const response = await axios.get(`https://ec2-54-221-54-196.compute-1.amazonaws.com/places/recommend?longitude=${lon}&latitude=${lat}`); // Replace with the actual API URL
            console.log('Recommended Places Response:', response.data);
            setRecommendedHotels(response.data.recommended_hotels);
            setRecommendedMalls(response.data.recommended_malls);
            setRecommendedRestaurants(response.data.recommended_restaurants);
        } catch (err) {
            setError('Error fetching recommended places');
            console.error('Error fetching recommended places:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container>
            <Title>Recommended Hotels</Title>
            <RecommendedContainer>
                {recommendedHotels.length > 0 ? (
                    recommendedHotels.map((hotel, index) => (
                        <Card key={index}>
                            <img src={hotel.image} alt={hotel.name} />
                            <h3>{hotel.name}</h3>
                            <p>{hotel.phone}</p>
                        </Card>
                    ))
                ) : (
                    <p>No recommended hotels found.</p>
                )}
            </RecommendedContainer>
            <Title>Recommended Malls</Title>
            <RecommendedContainer>
                {recommendedMalls.length > 0 ? (
                    recommendedMalls.map((mall, index) => (
                        <Card key={index}>
                            <img src={mall.image} alt={mall.name} />
                            <h3>{mall.name}</h3>
                            <p>{mall.address}</p>
                        </Card>
                    ))
                ) : (
                    <p>No recommended malls found.</p>
                )}
            </RecommendedContainer>
            <Title>Recommended Restaurants</Title>
            <RecommendedContainer>
                {recommendedRestaurants.length > 0 ? (
                    recommendedRestaurants.map((restaurant, index) => (
                        <Card key={index}>
                            <img src={restaurant.image} alt={restaurant.name} />
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.address}</p>
                            <p>{restaurant.phone}</p>
                        </Card>
                    ))
                ) : (
                    <p>No recommended restaurants found.</p>
                )}
            </RecommendedContainer>
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
    margin-top: 20px;
`;

const RecommendedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
`;

const Card = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(33% - 20px);
    max-width: calc(33% - 20px);
    text-align: left;

    img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    h3 {
        margin: 0 0 10px;
        color: #333;
    }

    p {
        font-size: 1rem;
        color: #666;
        margin: 5px 0;
    }
`;

export default PlacesRecommended;
