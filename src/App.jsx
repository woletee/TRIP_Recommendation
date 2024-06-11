import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import Restaurants from "./pages/Restaurants";
import Hotels from "./pages/Hotel";
import AOS from "aos";
import "aos/dist/aos.css";
import PlacesRecommended from "./pages/Places_recommened";

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

            <Route path="/restaurants" element={<Restaurants />} />

            <Route path="hotels" element={<Hotels />} />
            <Route path="best-places" element={<PlacesRoute />} />
             
        
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />

            <Route path="/places/recommend" element={<PlacesRecommended />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
