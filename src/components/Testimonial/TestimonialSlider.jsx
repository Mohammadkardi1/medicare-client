import React from 'react'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {HiStar} from 'react-icons/hi'



const TestimonialSlider = ({ testimonialData, swiperSettings = {} }) => {
  return (
    <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints = {{
            640: {slidesPerView: 1, spaceBetween: 0},
            768: {slidesPerView: 2, spaceBetween: 20},
            1024: {slidesPerView: 3, spaceBetween: 30},
          }}
        {...swiperSettings} // Spread custom settings
        >
        {testimonialData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 border rounded-lg shadow-lg text-center space-y-2">

              <img src={testimonial.image} alt={testimonial.name}
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />

              <div>
                <h1 className="text-lg font-[600] ">{testimonial.name}</h1>
                <div className='flex items-center justify-center'>
                  {Array.from({ length: testimonial.rating }, (_, index) => (
                    <HiStar key={index} className='text-yellowColor w-[18px] h-5'/>
                  ))}
                </div>
              </div>

              <p className=" text-textColor">{testimonial.review}</p>
            </div>
          </SwiperSlide>
          ))}
    </Swiper>
      
  )
}

export default TestimonialSlider
