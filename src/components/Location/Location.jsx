import React from "react";

const Location = () => {
  return (
    <>
      <span id="location"></span>
      <section data-aos="fade-up" className="">
        <div className="container my-4">
          <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
            Location to visit
          </h1>

          <div className="rounded-xl ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.1516618742994!2d126.8368132756137!3d35.22759447273704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35718e38bd1d0629%3A0x9bc1b7198053add1!2zR0lTVCB8INCY0L3RgdGC0LjRgtGD0YIg0L3QsNGD0LrQuCDQuCDRgtC10YXQvdC-0LvQvtCz0LjQuSDQmtCy0LDQvdC00LbRgw!5e0!3m2!1sru!2skr!4v1714219129566!5m2!1sru!2skr"
              width="100%"
              height="360"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "20px" }}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;