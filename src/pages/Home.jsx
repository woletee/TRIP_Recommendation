import React from "react";
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import ShoppingMalls from "../components/ShoppingMalls/ShoppingMalls";
import Hotels from "../components/Hotels/HotelCont";
import Team from "../components/Team/Team";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/cover-women.jpg";
import Banner2 from "../assets/travel-cover2.jpg";
import TopHotels from "../components/Hotels/TopHotels";
import Places from "../components/Places/Places";
import TopRestaurants from "../components/Restaurant/TopResturant";
import TopPlaces from "../components/Places/Topplaces"
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
        <h1 className="my-8 border-l-8 border-primary/50 py-3 pl-2 text-3xl font-bold mt-20 ml-5">
            Hotels
        </h1>
        <TopHotels />
         <TopRestaurants/>
         <TopPlaces/>
         

      </main>
      </div>
        
   
        <Banner />
        <Team />
      </div>
    </>
  );
};

export default Home;
