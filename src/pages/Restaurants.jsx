import React from "react"
import TopRestaurants from "../components/Restaurant/TopResturant";
import Restaurants from "../components/Restaurant/Restaurants";
function Restaurant() {
  return (
    <div>
      <section data-aos="fade-up" className="container">
        <Restaurants />
      </section>
    </div>
  );
}

export default Restaurant;
