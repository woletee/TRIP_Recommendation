import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        setLoading(true);
        setError(''); // Reset the error state before fetching
        try {
            console.log('Fetching places data...');
            const response = await axios.get('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/all-places'); // Replace with the actual API URL
            console.log('API Response:', response.data); // Log the API response

            // Check if the response is an array
            if (Array.isArray(response.data)) {
                const parsedData = response.data;
                const containsNaN = obj => Object.values(obj).some(value => value === null || value === undefined || value !== value);
                const filteredData = parsedData.filter(item => item['image url'] && !containsNaN(item) && item['Name']);
                setPlaces(filteredData);
            } else {
                setError('Unexpected API response format');
            }
        } catch (err) {
            setError('Error fetching places');
            console.error('Fetch error:', err); // Log the error
        } finally {
            setLoading(false);
        }
    };

    const displayPlaces = (placesData) => {
        console.log('Displaying Places:', placesData); // Log the places data being displayed
        if (!placesData || placesData.length === 0) {
            return <p>Finding Places...</p>;
        }

        return placesData.map((place, index) => (
            <PlaceCard key={place.id || index}>
                <PlaceName>{place['Name']}</PlaceName>
                <PlaceImage 
                    src={place['image url']} 
                    alt={place['Name']}
                    onClick={() => window.open(`https://map.naver.com/v5/search/${place['Name']}/place/${place.latitude},${place.longitude}`, '_blank')}
                />
                <PlaceDetails>
                    <p>Type: {place.Type}</p>
                    <p>Location: {place.Location}</p>
                    <p>Rating: {place.Rating}</p>
                    <p>Open Hours: {place['Open Hour']} - {place['Close Hour']}</p>
                   
                </PlaceDetails>
                <Link to={`/places/recommend?longitude=${place.longitude}&latitude=${place.latitude}`}>
                    <PlaceLink>More</PlaceLink>
                </Link>
            </PlaceCard>
        ));
    };

    return (
        <Container>
            <Title>Places To Go in Gwangju</Title>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <PlacesContainer>
                {displayPlaces(places)}
            </PlacesContainer>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #f0f0f0;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
`;

const PlacesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const PlaceCard = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    flex: 1 1 calc(25% - 32px); // 4 places per row
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

const PlaceName = styled.h2`
    font-size: 1.5rem;
    color: #333;
`;

const PlaceImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
`;

const PlaceDetails = styled.div`
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

export default Places;
