import React, { useState, useEffect } from 'react';

const TopHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ec2-54-221-54-196.compute-1.amazonaws.com/api/top-hotels')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setHotels(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Popular Hotels</h1>
      </div>
      <div style={styles.hotelGrid}>
        {hotels.map(hotel => (
          <div key={hotel.hotel_id} style={styles.hotelItem}>
            <h2 style={styles.hotelName}>{hotel.name}</h2>
            <img src={hotel.thumbnail} alt={hotel.name} style={styles.thumbnail} />
            <p style={styles.city}>{hotel.city}</p>
            <p style={styles.rating}>Rating: {hotel.rating.value} ({hotel.rating.count} reviews)</p>
            <p style={styles.price}>Price: ${hotel.price.value}</p>
            <div style={styles.linksContainer}>
              <a href={hotel.book_url} target="_blank" rel="noopener noreferrer" style={styles.bookButton}>More</a>
              <span 
                style={styles.mapIcon}
                onClick={() => window.open(`https://map.naver.com/v5/search/${hotel.name}/place/${hotel.location.lat},${hotel.location.lng}`, '_blank')}
              >
                📍
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  titleContainer: {
    marginBottom: '40px', // Add extra space above the title
  },
  title: {
    textAlign: 'left',
    color: '#333',
    fontSize: '2.5em',
    fontWeight: 'bold',
    borderBottom: '4px solid #333',
    display: 'inline-block',
    paddingBottom: '10px',
  },
  hotelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  hotelItem: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  hotelName: {
    margin: '0 0 10px',
    color: '#333',
  },
  thumbnail: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  city: {
    fontSize: '18px',
    color: '#777',
    marginBottom: '5px',
  },
  rating: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
  },
  price: {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  bookButton: {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    marginRight: '10px',
  },
  mapIcon: {
    cursor: 'pointer',
    fontSize: '1.5rem', // Adjust size as needed
  },
  loading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
  },
  error: {
    textAlign: 'center',
    fontSize: '24px',
    color: 'red',
  },
};

export default TopHotels;
