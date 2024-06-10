import React from "react";
import ShoppingMallsList from "../components/ShoppingMalls/ShoppingMallsList";

function ShoppingMalls() {
  return (
    <div>
      <section data-aos="fade-up" className="container">
        <ShoppingMallsList />
      </section>
    </div>
  );
}

export default ShoppingMalls;