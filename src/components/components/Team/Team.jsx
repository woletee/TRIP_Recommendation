import React from "react";
import Slider from "react-slick";

const teamData = [
  {
    id: 1,
    name: "Naz Zubia",
    text: "GIST EECS student. ",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 1,
    name: "Woletemaryam Liyew Abitew",
    text: "GIST EECS student. ",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 1,
    name: "Rakishev Sanzhar",
    text: "GIST EECS student. ",
    img: "https://picsum.photos/103/101",
  },
  {
    id: 1,
    name: "Chriv Sokuntepy",
    text: "GIST EECS student. ",
    img: "https://picsum.photos/103/104",
  },
  {
    id: 1,
    name: "Malika",
    text: "GIST EECS student. ",
    img: "https://picsum.photos/103/105",
  },
];

const Team = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10">
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          {/* Header section */}
          <div className="text-left">
            <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
                Our Team
            </h1>
          </div>
          {/* team section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[800px] mx-auto gap-6"
          >
            <Slider {...settings} className="mb-6">
              {teamData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6">
                    <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                      <img
                        src={img}
                        alt=""
                        className="rounded-full block mx-auto"
                      />
                      <h1 className="text-xl font-bold">{name}</h1>
                      <p className="text-gray-500 text-sm">{text}</p>
                      <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;