import React from "react";
import Location from "../components/Location/Location";
import Team from "../components/Team/Team";

const About = () => {
  return (
    <>
      <section data-aos="fade-up" className="mt-12">
        <div className="container my-2">
          <div className="dark:bg-gray-900 dark:text-white bg-gray-50 pt-14">
            <section data-aos="fade-up" className="container py-10">
              <div className="about-us mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
                About Us
              </h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Journey Starts Here
                </h2>
                <p className="text-lg text-gray-600">
                  We believe travel is more than just a vacation; it's an opportunity to transform yourself and discover the world's wonders. We're a passionate team of travel specialists dedicated to crafting unforgettable experiences for every kind of traveler.
                </p>
              </div>
              <Team />
              <Location />
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;