import React from "react";
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import Restaurants from "../components/Restaurant/Restaurants";
import ShoppingMalls from "../components/ShoppingMalls/ShoppingMalls";
import Hotels from "../components/Hotels/HotelCont";
import Team from "../components/Team/Team";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/cover-women.jpg";
import Banner2 from "../assets/travel-cover2.jpg";
import TopHotels from "../components/Hotels/TopHotels";
const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
      <div>
        
       
      <div className="App">
      <header className="App-header">
        <h1>Hotel Booking App</h1>
      </header>
      <main>
        <TopHotels />
      </main>
      </div>
        
        <Restaurants handleOrderPopup={handleOrderPopup} />
        <ShoppingMalls handleOrderPopup={handleOrderPopup} />
   
        <Banner />
        <Team />
      </div>
    </>
  );
};

export default Home;
