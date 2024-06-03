import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/top-hotels');
                if (response.ok) {
                    const data = await response.json();
                    setHotels(data);
                } else {
                    console.error('Failed to fetch hotels');
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            <h1>Top 20 Hotels in Gwangju</h1>
            <div className="hotels-grid">
                {hotels.map(hotel => (
                    <HotelCard
                        key={hotel.hotel_id}
                        name={hotel.hotel_name}
                        image={hotel.image_url}
                        description={hotel.description}
                        rating={hotel.rating}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hotels;
