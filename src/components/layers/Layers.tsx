import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { HeaderSection } from "../headerSection/HeaderSection";
import { useTranslation } from "react-i18next";
import Rating from "@mui/material/Rating"; // استيراد Rating من MUI
import { useNavigate } from "react-router-dom";

const ReviewSection = () => {
  const navigate = useNavigate();
  const HoverAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect(); // للحصول على موقع وحجم العنصر

    const distanceX: number = e.clientX - rect.left; // إحداثيات X بالنسبة إلى العنصر
    const distanceY: number = e.clientY - rect.top; // إحداثيات Y بالنسبة إلى العنصر

    target.style.setProperty("--x", `${distanceX}px`);
    target.style.setProperty("--y", `${distanceY}px`);
  };

  const [t] = useTranslation();
  return (
    <div className="py-8 container mx-auto">
      <HeaderSection text={t("review")} />
      <Swiper
        slidesPerView={3} // عدد الشرائح الافتراضي
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2, // 1 شريحة للشاشات الصغيرة
          },
          768: {
            slidesPerView: 2, // 2 شريحة للشاشات المتوسطة
          },
          1024: {
            slidesPerView: 2, // 3 شرائح للشاشات الكبيرة
          },
        }}
      >
        <SwiperSlide>
          <div className="flex items-start justify-start flex-col gap-2 relative specialLawer py-4 px-5">
            <div className="flex justify-center items-center gap-2 ">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src="/mylogo.jpg"
                alt="Guest 1"
              />
              <h3 className="text-[var(--clr-product)] font-bold">
                Bernadette Martin
              </h3>
            </div>
            <p className=" leading-7">
              Excellent service and delicious food! Excellent service and
              delicious food!Excellent service and delicious food!Excellent
              service and delicious food!
            </p>
            <div>
              <span className="font-bold">{t("union")} :</span>
              <span>Damascus</span>
            </div>
            <div>
              <span className="font-bold">
                {t("yearsOf")} : <bdi>{t("year")}</bdi>{" "}
              </span>
              <span>5</span>
            </div>
            <div>
              <Rating value={4} readOnly />{" "}
              {/* مكون التقييم مع القيمة للقراءة فقط */}
            </div>
            <button
              type="button"
              className=" ms-auto ButtonOfLawers rounded-md"
              onMouseMove={(e) => HoverAction(e)}
              onClick={() => {
                navigate("/lawyers/1");
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }}
              
            >
              {t("pageOfLawer")}
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewSection;
