import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Keyboard } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material"; // Import MUI Button

export default function SliderKeyboardControl() {
  const [t] = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        spaceBetween={5}
        loop={true} // Enable infinite loop
        keyboard={{ enabled: true }} // Enable keyboard control
        navigation={true}
        autoplay={true}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        modules={[Pagination, Keyboard]} // Include the necessary modules
        className="mySwiperKeyboard"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        <SwiperSlide className="sliderFade  text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-[var(--clr-product)] my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl">
                <Typewriter
                  words={[t("helloSystem")]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
            </div>
            {/* Replace div with MUI Button */}
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained" // Style the button as a contained button
                color="primary" // Choose the color of the button
                size="large" // Set the size of the button
                onClick={() => console.log("Button clicked")} // You can handle the button click here
                sx={{ width: "100%" }}
              >
                {t("findYour")}
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="sliderFade  text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-[var(--clr-product)] my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl">
                <Typewriter
                  words={[t("helloSystem")]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
            </div>
            {/* Replace div with MUI Button */}
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained" // Style the button as a contained button
                color="primary" // Choose the color of the button
                size="large" // Set the size of the button
                onClick={() => console.log("Button clicked")} // You can handle the button click here
                sx={{ width: "100%" }}
              >
                {t("findYour")}
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="sliderFade  text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-[var(--clr-product)] my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl">
                <Typewriter
                  words={[t("helloSystem")]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
            </div>
            {/* Replace div with MUI Button */}
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained" // Style the button as a contained button
                color="primary" // Choose the color of the button
                size="large" // Set the size of the button
                onClick={() => console.log("Button clicked")} // You can handle the button click here
                sx={{ width: "100%" }}
              >
                {t("findYour")}
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <div className="custom-pagination text-center relative"></div>
      </Swiper>
    </>
  );
}
