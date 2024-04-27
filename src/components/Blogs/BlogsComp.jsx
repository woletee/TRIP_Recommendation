import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/Mudeungsan National Park.jpg";
import Img2 from "../../assets/places/Holiday Inn.jpg";
import Img3 from "../../assets/places/Utop Boutique Hotel&Residence.webp";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "Mudeungsan National Park",
    description:
      "South Korea's Mudeungsan National Park, bordering Gwangju and Jeollanam-do provinces, stuns visitors with its dramatic landscapes. Hikers of all levels can explore a network of trails, from gentle valley walks to challenging climbs to the park's three main peaks: Cheonwangbong (the highest at 1,187 meters), Jungwangbong, and Inwangbong. Lush forests and diverse wildlife create a haven for nature enthusiasts, while the park's vibrant fall foliage adds a touch of magic. Cultural and historical sites like temples and traditional villages offer a glimpse into Korea's rich heritage. Mudeungsan National Park is a perfect escape for a day trip or a weekend getaway, promising a memorable experience for all.",
    author: "Rakishev Sanzhar",
    date: "April 25, 2024",
  },
  {
    id: 1,
    image: Img2,
    title: "Holiday Inn Gwangju, Korea, an IHG Hotel",
    description:
      "Nestled in the heart of Gwangju, the Holiday Inn Gwangju, an IHG Hotel, offers a modern and convenient haven for exploring the city.  My stay was highlighted by the unbeatable location, with easy access to attractions and restaurants. The bright, minimalist room provided a comfortable retreat, while the on-site breakfast buffet and bar fueled adventures and offered relaxation options. From the refreshing indoor pool to the potential of a spa visit or workout session, the hotel caters to various needs. Overall, the Holiday Inn Gwangju is a solid choice for both business and leisure travelers seeking comfort and convenience.",
    author: "Naz Zubia",
    date: "April 27, 2024",
  },
  {
    id: 1,
    image: Img3,
    title: "UTOP Boutique Hotel & Residence",
    description:
      "Gwangju's UTOP Boutique Hotel & Residence offers a sophisticated haven for travelers seeking comfort and personalized experiences. This smart hotel boasts expertly crafted itineraries to suit your travel style and budget, ensuring an unforgettable stay.  UTOP goes beyond just accommodation, with amenities like a traditional Korean restaurant and a VIP conference room catering to various needs. Their commitment to your comfort extends to convenient features like user-friendly booking and 24/7 support, guaranteeing a stress-free journey from start to finish.",
    author: "Chriv Sokuntepy",
    date: "April 28, 2024",
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Our Latest Blogs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;