import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [stars, setStars] = useState('');

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
            return <p>Finding Hotels..</p>;
        }

        return hotelsData.map(hotel => (
            <HotelCard key={hotel.hotel_id}>
                <HotelName>{hotel.name}</HotelName>
                <HotelImage 
                    src={hotel.thumbnail} 
                    alt={hotel.name}
                />
                <HotelDetails>
                    <p>City: {hotel.city}</p>
                    <p>Price: ${hotel.price?.value || 'N/A'}</p>
                    <p>Rating: {hotel.rating?.value || 'N/A'} ({hotel.rating?.count || 0} reviews)</p>
                    <p>Distance: {hotel.distance?.toFixed(2) || 'N/A'} km</p>
                    <p>Phone: {hotel.phone || 'N/A'}</p>
                    <p>Stars: {hotel.star || 'N/A'}</p>
                    <p>Amenities: {hotel.top_amenities?.join(', ') || 'N/A'}</p>
                    <HotelLink href={hotel.book_url} target="_blank" rel="noopener noreferrer">More</HotelLink>
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
            <Title></Title>
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
            {loading && <p></p>}
            {error && <p>{error}</p>}
            <HotelsContainer>
                {displayHotels(hotels)}
            </HotelsContainer>
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

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px 0 0 20px; /* Adjusted the top margin to move the button lower */
`;

const Button = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px; /* Added margin to separate from dropdown */

    &:hover {
        background-color: #0056b3;
    }
`;

const StyledSelect = styled.select`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const FormWrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const FormLabel = styled.label`
    margin: 0 10px;
    font-size: 1rem;
    color: #333;
`;

const FormInput = styled.input`
    margin-left: 5px;
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const FormButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 10px;

    &:hover {
        background-color: #218838;
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
    cursor: pointer;
    margin-bottom: 10px;
`;

const HotelDetails = styled.div`
    font-size: 1rem;
    color: #555;

    p {
        margin: 5px 0;
    }
`;

const HotelLink = styled.a`
    display: inline-block;
    margin-top: 10px;
    background-color: #28a745;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }
`;

export default Hotel;
