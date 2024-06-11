import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [stars, setStars] = useState('');
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(''); // Reset the error state before fetching
        try {
            console.log('Fetching hotel data...');
            const response = await axios.get('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/all-hotels');
            console.log('API Response:', response.data); // Log the API response
            let filteredHotels = response.data;
            if (minPrice) {
                filteredHotels = filteredHotels.filter(hotel => (hotel.price?.value || 0) >= minPrice);
            }
            if (maxPrice) {
                filteredHotels = filteredHotels.filter(hotel => (hotel.price?.value || 0) <= maxPrice);
            }
            if (stars) {
                filteredHotels = filteredHotels.filter(hotel => hotel.star >= stars);
            }
            setHotels(filteredHotels);
        } catch (err) {
            setError('Error fetching recommendations');
            console.error('Fetch error:', err); // Log the error
        } finally {
            setLoading(false);
        }
    };

    const fetchNearbyPlaces = async (latitude, longitude) => {
        try {
            const response = await axios.get('http://ec2-54-221-54-196.compute-1.amazonaws.com/recommend', {
                params: { latitude, longitude }
            });
            setNearbyPlaces(response.data);
        } catch (err) {
            console.error('Error fetching nearby places:', err);
        }
    };

    const sortHotels = (order) => {
        setSortOrder(order);
        let sortedHotels = [...hotels];
        if (order === 'lowToHigh') {
            sortedHotels.sort((a, b) => (a.price?.value || 0) - (b.price?.value || 0));
        } else if (order === 'highToLow') {
            sortedHotels.sort((a, b) => (b.price?.value || 0) - (a.price?.value || 0));
        }
        setHotels(sortedHotels);
    };

    const displayHotels = (hotelsData) => {
        console.log('Displaying Hotels:', hotelsData); // Log the hotels data being displayed
        if (!hotelsData || hotelsData.length === 0) {
            return <p>Finding Hotels...</p>;
        }

        return hotelsData.map(hotel => (
            <HotelCard key={hotel.hotel_id}>
                <HotelName>{hotel.name}</HotelName>
                <Link to={`/places/recommend?longitude=${encodeURIComponent(hotel.location.lng)}&latitude=${encodeURIComponent(hotel.location.lat)}`}>
                    <HotelImage 
                        src={hotel.thumbnail} 
                        alt={hotel.name}
                        onClick={() => {
                            setSelectedHotel(hotel);
                            fetchNearbyPlaces(hotel.location.lat, hotel.location.lng);
                        }}
                    />
                </Link>
                <HotelDetails>
                    <p>City: {hotel.city}</p>
                    <p>Price: ${hotel.price?.value || 'N/A'}</p>
                    <p>Rating: {hotel.rating?.value || 'N/A'} ({hotel.rating?.count || 0} reviews)</p>
                    <p>Distance: {hotel.distance?.toFixed(2) || 'N/A'} km</p>
                    <p>Phone: {hotel.phone || 'N/A'}</p>
                    <p>Stars: {hotel.star || 'N/A'}</p>
                    <p>Amenities: {hotel.top_amenities?.join(', ') || 'N/A'}</p>
                    <HotelLink href={hotel.book_url} target="_blank" rel="noopener noreferrer">More</HotelLink>
                    <MapIcon onClick={() => window.open(`https://map.naver.com/v5/search/${hotel.name}/place/${hotel.location.lat},${hotel.location.lng}`, '_blank')}>
                        📍
                    </MapIcon>
                </HotelDetails>
            </HotelCard>
        ));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchRecommendations();
    };

    return (
        <Container>
            <Title>Hotel Recommendations</Title>
            <ButtonWrapper>
                <Button onClick={fetchRecommendations}>Get Recommendations</Button>
                <StyledSelect onChange={(e) => sortHotels(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </StyledSelect>
                <Button onClick={() => setShowForm(!showForm)}>Personalization</Button>
            </ButtonWrapper>
            {showForm && (
                <FormWrapper onSubmit={handleFormSubmit}>
                    <FormLabel>
                        Min Price:
                        <FormInput 
                            type="number" 
                            value={minPrice} 
                            onChange={(e) => setMinPrice(e.target.value)} 
                        />
                    </FormLabel>
                    <FormLabel>
                        Max Price:
                        <FormInput 
                            type="number" 
                            value={maxPrice} 
                            onChange={(e) => setMaxPrice(e.target.value)} 
                        />
                    </FormLabel>
                    <FormLabel>
                        Stars:
                        <FormInput 
                            type="number" 
                            value={stars} 
                            onChange={(e) => setStars(e.target.value)} 
                        />
                    </FormLabel>
                    <FormButton type="submit">Find Hotels</FormButton>
                </FormWrapper>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <HotelsContainer>
                {selectedHotel ? (
                    <HotelDetail>
                        <HotelName>{selectedHotel.name}</HotelName>
                        <HotelImage 
                            src={selectedHotel.thumbnail} 
                            alt={selectedHotel.name}
                        />
                        <HotelDetails>
                            <p>City: {selectedHotel.city}</p>
                            <p>Price: ${selectedHotel.price?.value || 'N/A'}</p>
                            <p>Rating: {selectedHotel.rating?.value || 'N/A'} ({selectedHotel.rating?.count || 0} reviews)</p>
                            <p>Distance: {selectedHotel.distance?.toFixed(2) || 'N/A'} km</p>
                            <p>Phone: {selectedHotel.phone || 'N/A'}</p>
                            <p>Stars: {selectedHotel.star || 'N/A'}</p>
                            <p>Amenities: {selectedHotel.top_amenities?.join(', ') || 'N/A'}</p>
                            <HotelLink href={selectedHotel.book_url} target="_blank" rel="noopener noreferrer">More</HotelLink>
                            <MapIcon onClick={() => window.open(`https://map.naver.com/v5/search/${selectedHotel.name}/place/${selectedHotel.location.lat},${selectedHotel.location.lng}`, '_blank')}>
                                📍
                            </MapIcon>
                        </HotelDetails>
                        <NearbyPlaces>
                            <h2>Nearby Restaurants and Places</h2>
                            {nearbyPlaces.length > 0 ? (
                                nearbyPlaces.map(place => (
                                    <div key={place.id}>
                                        <h3>{place.name}</h3>
                                        <p>{place.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No nearby places found.</p>
                            )}
                        </NearbyPlaces>
                        <Button onClick={() => setSelectedHotel(null)}>Back to Hotel List</Button>
                    </HotelDetail>
                ) : (
                    displayHotels(hotels)
                )}
            </HotelsContainer>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    min-height: 100vh;
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

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #0287a8;
    color: white;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
        background-color: #0287a8;
    }
`;

const StyledSelect = styled.select`
    background-color: #0287a8;
    color: white;
    padding: 10.4px 16px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
        background-color: #0287a8;
    }
`;

const FormWrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const FormLabel = styled.label`
    margin: 0 10px;
    font-size: 1rem;
    color: #333;
`;

const FormInput = styled.input`
    margin-left: 5px;
    padding: 7px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const FormButton = styled.button`
    background-color: #0287a8;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 10px;

    &:hover {
        background-color: #0287a8;
    }
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
    flex: 1 1 calc(25% - 32px);
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
    height: 200px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
`;

const HotelDetails = styled.div`
    font-size: 1rem;
    color: #666;
`;

const HotelLink = styled.a`
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
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
    font-size: 1.5rem;
`;

export default Hotel;
