// Hotels.js
import React from "react";
import Hotelcard from "./HotelCard";
import Img1 from "../../assets/places/Utop Boutique Hotel&Residence.webp";
import Img2 from "../../assets/places/Holiday Inn.jpg";
// import Img3 from "../../assets/places/Hwangsol Village.jpg";
import Img4 from "../../assets/places/Acc_design.jpg"
import Img5 from "../../assets/places/cs.jpg"
import Img6 from "../../assets/places/Ramada_plaza.jpg"
import Img7 from "../../assets/places/Gwangju Madrid.jpg"
// Import other images as needed

const HotelData = [
      {
        img: Img4,
        title: "Acc_design Hotel",
        location: "226-11 Geumnam-ro, Gwangju, 61482, South Korea Gwangju, Korea",
        description: "Acc_design Hotel Hotel & Residence is a smart hotel located in Gwangju, South Korea. It offers amenities like free Wi-Fi, air conditioning, and parking. The hotel also has a traditional Korean restaurant, a traditional Japanese restaurant, and conference rooms. It is located close to the Gwangju Statue of Peace.",
        price: 70,
        type: "Hotels",
      }, 
      {
        img: Img5,
        title: "CS Hotel",
        location: "128 Sangmupyeonghwa-ro, Seo-gu, Gwangju, 61964, South Korea",
        description: "CS Hotel Hotel & Residence is a smart hotel located in Gwangju, South Korea. It offers amenities like free Wi-Fi, air conditioning, and parking. The hotel also has a traditional Korean restaurant, a traditional Japanese restaurant, and conference rooms. It is located close to the Gwangju Statue of Peace.",
        price: 70,
        type: "Hotels",
      }, 
      {
        img: Img6,
        title: "Ramada_plaza Hotel",
        location: "226-11 Geumnam-ro, Gwangju, 61482, South Korea Gwangju, Korea",
        description: "Experience polished hospitality at Ramada Plaza by Wyndham Gwangju. This modern hotel boasts spacious rooms and suites, all equipped with free Wi-Fi and flat-screen TVs. Unwind in the spa area after a day of exploring the city, or savor delicious meals at one of the hotel's five restaurants.",
        price: 70,
        type: "Hotels",
      }, 
      {
        img: Img1,
        title: "Utop Boutique Hotel&Residence",
        location: "Gwangju, Korea",
        description: "The UTOP Boutique Hotel & Residence is a smart hotel located in Gwangju, South Korea. It offers amenities like free Wi-Fi, air conditioning, and parking. The hotel also has a traditional Korean restaurant, a traditional Japanese restaurant, and conference rooms. It is located close to the Gwangju Statue of Peace.",
        price: 70,
        type: "Hotels",
      },
      {
        img: Img7,
        title: "Gwangju Madrid",
        location: "Gwangju, Korea",
        description:
          "Ideally situated near Gwangju Songjeong KTX Station, the Gwangju Madrid Hotel provides a convenient and comfortable base for exploring the city.  This 3-star hotel features modern amenities like free Wi-Fi, comfortable rooms, and a business center. Enjoy a delicious breakfast (guest-rated 8.5!) to fuel your adventures. ",
        price: 100,
        type: "Hotels",
      },
      {
        img: Img2,
        title: "Holiday Inn",
        location: "11 Gwangsan-ro 19beon-gil, Gwangsan-gu, Gwangju, 62430, South Korea",
        description:
          "Stay conveniently located at the Holiday Inn Gwangju, Korea! This IHG hotel offers bright, minimalist rooms perfect for unwinding after exploring the city. ",
        price: 100,
        type: "Hotels",
      },
  // Add more hotel data as needed
];

const Hotels = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Hotels In Gwangju to Go
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {HotelData.map((item, index) => (
              <Hotelcard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item} // Pass all properties of the hotel data as props
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Hotels;
