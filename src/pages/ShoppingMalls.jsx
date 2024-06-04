import React from "react";
import ShoppingMallsList from "../components/ShoppingMalls/ShoppingMallsList";

function ShoppingMalls() {
  return (
    <div>
    {/* <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10"></div> */}
      <section data-aos="fade-up" className="container">
        <ShoppingMallsList />
      </section>
    </div>
  );
}

export default ShoppingMalls;