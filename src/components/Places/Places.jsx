import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/Utop Boutique Hotel&Residence.webp";
import Img2 from "../../assets/places/Mudeungsan National Park.jpg";
import Img3 from "../../assets/places/Holiday Inn.jpg";
import Img4 from "../../assets/places/Hwangsol Village.jpg";
import Img5 from "../../assets/places/World Cup Stadium.jpg";
import Img6 from "../../assets/places/Mudeungsan Jeungsimsa Temple.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Utop Boutique Hotel&Residence",
    location: "Gwangju, Korea",
    description: "The UTOP Boutique Hotel & Residence is a smart hotel located in Gwangju, South Korea. It offers amenities like free Wi-Fi, air conditioning, and parking. The hotel also has a traditional Korean restaurant, a traditional Japanese restaurant, and conference rooms. It is located close to the Gwangju Statue of Peace.",
    price: 70,
    type: "Hotels",
  },
  {
    img: Img2,
    title: "Mudeungsan National Park",
    location: "Gwangju, Korea",
    description: "Mudeungsan National Park, located on the border of Gwangju and Jeollanam-do provinces in South Korea, is a stunning mountain park known for its scenic beauty and diverse hiking trails.",
    price: "10",
    type: "National Parks",
  },
  {
    img: Img3,
    title: "Holiday Inn",
    location: "Gwangju, Korea",
    description:
      "Stay conveniently located at the Holiday Inn Gwangju, Korea! This IHG hotel offers bright, minimalist rooms perfect for unwinding after exploring the city. ",
    price: 100,
    type: "Hotels",
  },
  {
    img: Img4,
    title: "Hwangsol Village",
    location: "Gwangju, Korea",
    description: "This popular spot offers a diverse range of Korean dishes, from sizzling Korean BBQ to comforting noodle soups. With its delicious food, friendly atmosphere, and convenient location, Hwangsol Village is a favorite among locals and visitors alike.",
    price: 10,
    type: "Restaurants",
  },
  {
    img: Img5,
    title: "World Cup Stadium",
    location: "Gwangju, Korea",
    description:
      "Experience a piece of sporting history at the World Cup Stadium in Gwangju! Built for the 2002 FIFA World Cup, this impressive stadium continues to host major sporting events and concerts.",
    price: 15,
    type: "Arenas & Stadiums",
  },
  {
    img: Img6,
    title: "Mudeungsan Jeungsimsa Temple",
    location: "Gwangju, Korea",
    description:
      "Mudeungsan Jeungsimsa Temple is a haven of peace nestled on the western foothills of Mudeungsan National Park in Gwangju, South Korea.  Founded in 517 by Buddhist monk Cheolgamseonsa Do Yun, the temple boasts a rich history and cultural significance.",
    price: 10,
    type: "Religious Sites",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Best Places to Visit
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;