import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const ReviewSection = () => {
  return (
    <div>
      <h2>Review from our guests</h2>
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
            slidesPerView: 1, // 1 شريحة للشاشات الصغيرة
          },
          768: {
            slidesPerView: 2, // 2 شريحة للشاشات المتوسطة
          },
          1024: {
            slidesPerView: 3, // 3 شرائح للشاشات الكبيرة
          },
        }}
      >
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center flex-col gap-2'>
            <img className='w-[100px] h-[100px] rounded-full' src="/mylogo.jpg" alt="Guest 1" />
            <h3>Bernadette Martin</h3>
            <p className='text-center leading-7'>Excellent service and delicious food! Excellent service and delicious food!Excellent service and delicious food!Excellent service and delicious food!</p>
            <div>
              <span>⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewSection;
