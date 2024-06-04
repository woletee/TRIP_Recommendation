import React, { useEffect, useState } from 'react';

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
            <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
                <section data-aos="fade-up" className="container">
                    <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold mt-5">
                        Top 20 Hotels in Gwangju
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {hotels.map((hotel) => (
                            <div
                                key={hotel.hotel_id}
                                className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                                onClick={() => handleHotelClick(hotel.hotel_id)}
                            >
                                <img
                                    src={hotel.image_url}
                                    alt={hotel.hotel_name}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                                        {hotel.hotel_name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-1">
                                        {hotel.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Rating: {hotel.rating}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
    );
};

export default Hotels;
