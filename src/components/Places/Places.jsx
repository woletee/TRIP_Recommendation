import React, { useState, useEffect } from 'react';
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
                <PlaceImage src={place['image url']} alt={place['Name']} />
                <PlaceName>{place['Name']}</PlaceName>
                <PlaceDetails>
                    <p>Type: {place.Type}</p>
                    <p>Location: {place.Location}</p>
                    <p>Rating: {place.Rating}</p>
                    <p>Open Hours: {place['Open Hour']} - {place['Close Hour']}</p>
                    <p>Latitude: {place.latitude}</p>
                    <p>Longitude: {place.longitude}</p>
                    <MapIcon 
                        onClick={() => window.open(`https://map.naver.com/v5/search/${place['Name']}/place/${place.latitude},${place.longitude}`, '_blank')}
                    >
                        📍
                    </MapIcon>
                </PlaceDetails>
            </PlaceCard>
        ));
    };

    return (
        <Container>
            <Title>Places To go in Gwangju</Title>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <PlacesContainer>
                {displayPlaces(places)}
            </PlacesContainer>
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

const PlacesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const PlaceCard = styled.div`
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

const PlaceImage = styled.img`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const PlaceName = styled.h2`
    margin: 0 0 10px;
    color: #333;
`;

const PlaceDetails = styled.div`
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

export default Places;
