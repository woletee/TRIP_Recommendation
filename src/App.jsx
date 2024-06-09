import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import Restaurants from "./pages/Restaurants"
import RestaurantDetail from "./pages/RestaurantDetail";
import RecommendedRestaurants from './pages/RecommendedRestaurants';
import Restaurant from './components/Restaurant/RestaurantRecommindation';
import ShoppingMalls from "./pages/ShoppingMalls"
import ShoppingMallDetails from "./pages/ShoppingMallDetails"
import Hotels from "./pages/Hotel";
import AOS from "aos";
import "aos/dist/aos.css";
import TopHotels from "./components/Hotels/TopHotels";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/recommend" element={<RecommendedRestaurants />} />
            <Route path="/restaurant" element={<Restaurant />} />

            <Route path="restaurants" element={<Restaurants />} />
            <Route path="restaurants/:id" element={<RestaurantDetail />} />
            <Route path="shopping" element={<ShoppingMalls />} />
            <Route path="shopping/:id" element={<ShoppingMallDetails />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="best-places" element={<PlacesRoute />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
