import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import NatureVid from "../../assets/video/footer.mp4";
import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Restaurants",
    link: "/restaurants",
  },
  {
    title: "Hotels",
    link: "/hotels",
  },
  {
    title: "Shopping Malls",
    link: "/shopping",
  },
  {
    title: "Best Places",
    link: "/best-places",
  },
  {
    title: "About",
    link: "/about",
  },
];

const Footer = () => {
  return (
    <div className="dark:bg-gray-950 py-10 relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover z-[-1]"
      >
        <source src={NatureVid} type="video/mp4" />
      </video>
      <div className="container mx-auto px-10">
        <div className="grid md:grid-cols-3 gap-8 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl shadow-lg">
          <div className="py-5 px-12">
            <h1 className="text-xl font-bold text-justify sm:text-left mb-4">
              Footer Links
            </h1>
            <ul className="flex flex-wrap gap-4">
              {FooterLinks.map((link, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow className="text-primary" />
              <a href="mailto:team4@gmail.com" className="hover:text-primary transition-colors">
                team4@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt className="text-primary" />
              <a href="tel:+11111111111" className="hover:text-primary transition-colors">
                +1 (111) 111-11-11
              </a>
            </div>
          </div>
        </div>
        <div className="py-5 border-t-2 border-gray-300/50 bg-primary text-white rounded-b-xl">
          <div className="container2 mx-auto px-4 flex flex-col items-center">
            <div className="flex justify-center gap-6 mb-1">
              <a
                href="https://www.instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-300 transition-colors"
              >
                <FaInstagram className="text-3xl" />
              </a>
              <a
                href="https://www.facebook.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-300 transition-colors"
              >
                <FaFacebook className="text-3xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-300 transition-colors"
              >
                <FaLinkedin className="text-3xl" />
              </a>
              <a
                href="https://twitter.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-gray-300 transition-colors"
              >
                <FaTwitter className="text-3xl" />
              </a>
              <a
                href="https://www.youtube.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-gray-300 transition-colors"
              >
                <FaYoutube className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
