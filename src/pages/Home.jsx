import React from "react";
import NatureVid from "../assets/video/main.mp4";
import Restaurants from "../components/Restaurant/Restaurants";
import ShoppingMalls from "../components/ShoppingMalls/ShoppingMalls";
import Team from "../components/Team/Team";
import Banner from "../components/Banner/Banner";
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
             <TopRestaurants/>
             <TopPlaces/>
         
          </main>
        </div>

        <div className="relative h-[700px]">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl font-extrabold drop-shadow-md mb-2 ">Let's</h1>
            <h1 className="text-8xl font-extrabold drop-shadow-lg mb-2">Explore</h1>
            <h1 className="text-5xl font-bold drop-shadow-md">Gwangju</h1>
          </div>
        </div>

        <Banner />
        <Team />
      </div>
    </>
  );
};

export default Home;
