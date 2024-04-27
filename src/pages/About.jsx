import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";

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
              <h2>Why Choose Travellogo?</h2>
              <ul>
                <li>
                  <strong>Expertly Crafted Itineraries:</strong> We don't just sell trips, we design personalized adventures.  
                  Our travel specialists take the time to understand your interests, travel style, and budget to create an itinerary that's perfect for you.
                </li>
                <li>
                  <strong>Unparalleled Knowledge:</strong> Our team boasts extensive travel experience and a wealth of knowledge about a vast array of destinations. 
                  We leverage this expertise to ensure your trip is smooth, enjoyable, and filled with unforgettable moments.
                </li>
                <li>
                  <strong>Exceptional Value:</strong> We believe everyone deserves the joy of travel. 
                  That's why we offer competitive prices and work hard to find the best deals for your dream vacation.
                </li>
                <li>
                  <strong>Unwavering Commitment to You:</strong> Your comfort and satisfaction are our top priorities. 
                  We're here to listen to your needs, answer your questions, and ensure every detail of your trip is meticulously planned.
                </li>
              </ul>
              <h2>What to Expect with Travellogo:</h2>
              <ul>
                <li>
                  <strong>Endless Exploration:</strong> From iconic landmarks to hidden gems, we offer a diverse range of destinations around the globe.
                </li>
                <li>
                  <strong>Travel Your Way:</strong> Whether you're a luxury seeker, a budget adventurer, or a family seeking fun-filled experiences, we have curated itineraries for every travel style.
                </li>
                <li>
                  <strong>Customization is Key:</strong> We understand that one-size-fits-all doesn't apply to travel. Tailor your trip to include specific interests, activities, and cultural experiences you desire.
                </li>
                <li>
                  <strong>Effortless Booking:</strong> Our user-friendly website allows you to seamlessly book flights, accommodation, tours, and activities, all in one place.
                </li>
                <li>
                  <strong>24/7 Support:</strong> Our dedicated team is available around the clock to ensure your journey is worry-free. We're just a phone call or email away, ready to assist you throughout your travels.
                </li>
              </ul>
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
      </div>
      <Location />
      <BlogsComp />
    </>
  );
};

export default About;