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

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>

        <div className="relative my-12 px-6 py-10 bg-white shadow-md rounded-lg text-center">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Click the button below to get restaurant recommendations.
          </p>
          <button 
            className="bg-gradient-to-r from-primary to-secondary text-white hover:bg-gradient-to-l transform hover:scale-105 px-6 py-3 rounded-full duration-300 focus:outline-none shadow-lg"
            onClick={() => window.location.href = '/recommend'}
          >
            Get Recommendations
          </button>
        </div>

        <Restaurants handleOrderPopup={handleOrderPopup} />
        <ShoppingMalls handleOrderPopup={handleOrderPopup} />
        <Hotels handleOrderPopup={handleOrderPopup} />
        <BannerPic img={BannerImg} />
        <Banner />
        <BannerPic img={Banner2} />
        <Team />
      </div>
    </>
  );
};

export default Home;