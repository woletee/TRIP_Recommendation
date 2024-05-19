import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";

function RestaurantsPage() {
  return (
    <div>
    {/* <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10"></div> */}
      <section data-aos="fade-up" className="container">
        <RestaurantList />
      </section>
    </div>
  );
}

export default RestaurantsPage;