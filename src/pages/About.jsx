import React from "react";
import Location from "../components/Location/Location";
import Team from "../components/Team/Team";

const About = () => {
  return (
    <>
      <div className="container pt-14">
        <div className="py-10">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          About us
          </h1>
            <div class="about-us">
              <h2>Travellogo: Your Journey Starts Here</h2>
              <p>
                At Travellogo, we believe travel is more than just a vacation; it's an opportunity to transform yourself and discover the world's wonders. We're a passionate team of travel specialists dedicated to crafting unforgettable experiences for every kind of traveler.
              </p>
              <style jsx>{`
                .about-us {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 2rem;
                  font-size: 18px;
                }
                h2 {
                  margin-top: 0.5rem;
                  text-align: left; 
                  font-size: 1.5rem; 
                  font-weight: bold; 
                  color: #333;
                  text-decoration: none;
                  transition: text-decoration 0.3s ease-in-out;
                  &:hover {
                    text-decoration: underline;
                  }
                strong {
                  font-weight: bold;
                }
            `}</style>
            </div>
        </div>
        <Team />
      </div>
      <Location />
    </>
  );
};

export default About;