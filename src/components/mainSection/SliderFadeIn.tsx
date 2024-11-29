import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Keyboard, Autoplay } from "swiper/modules"; // Import Autoplay module
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function SliderKeyboardControl() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        // spaceBetween={5}
        loop={true} // Enable infinite loop
        keyboard={{ enabled: true }} // Enable keyboard control
        navigation={true}
        autoplay={{
          delay: 10000, // Set autoplay delay to 10 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        modules={[Pagination, Keyboard, Autoplay]} // Include the Autoplay module
        className="mySwiperKeyboard"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active slide
      >
        <SwiperSlide className="sliderFade text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-white my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl opacity-75">
                {activeIndex === 0 && (
                  <Typewriter
                    words={[t("ourMessage")]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                )}
              </p>
            </div>
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => console.log("Button clicked")}
                sx={{ width: "100%" }}
              >
                {t("findYour")}
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="sliderFade text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-white my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl opacity-75">
                {activeIndex === 1 && (
                  <Typewriter
                    words={[t("weWork")]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                )}
              </p>
            </div>
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => console.log("Button clicked")}
                sx={{ width: "100%" }}
              >
                {t("findYour")}
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="sliderFade text-white">
          <div className="flex items-center justify-between container mx-auto">
            <div className="infoSlide w-[50%] mx-5">
              <h2 className="capitalize text-4xl text-white my-4 font-bold">
                {t("ourSystem")}
              </h2>
              <p className="capitalize text-2xl opacity-75">
                {activeIndex === 2 && (
                  <Typewriter
                    words={[t("ourView")]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                )}
              </p>
            </div>
            <div className="mx-5 flex-1 text-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => console.log("Button clicked")}
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
