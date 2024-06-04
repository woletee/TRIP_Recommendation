import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";

function RestaurantsPage() {
  return (
    <div>
      <section data-aos="fade-up" className="container">
        <RestaurantList />
      </section>
    </div>
  );
}

export default RestaurantsPage;