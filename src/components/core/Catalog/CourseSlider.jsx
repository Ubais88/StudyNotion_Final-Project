import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation";
import { Navigation, Pagination ,Keyboard,Mousewheel,Autoplay,  FreeMode} from 'swiper/modules';


import CatalogCard from './CatalogCard'

const CourseSlider = ({Courses}) => {
    
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                 mousewheel={
                      {
                          enabled: true,
                          forceToAxis: true,
                      } 
                 }
                 keyboard={
                      {
                          enabled: true,
                          onlyInViewport: true,
                      }
                 }
                 allowSlidePrev={true}
                    slidesPerView={1}
                    loop={false}
                    spaceBetween={20}
                    pagination={true}
                    modules={[Pagination,Navigation,FreeMode,Mousewheel,Keyboard]}
                    className="mySwiper md:pt-5"
                    // autoplay={{
                    // delay: 1000,
                    // disableOnInteraction: false,
                    // }}
                    style={{
                        "--swiper-navigation-size": "20px",
                      }}
                    freeMode={true}
                    navigation={true}
                    // navigation={
                    //     {
                    //         nextEl: ".swiper-button-next",
                    //         prevEl: ".swiper-button-prev",
                    //     }
                    // }
                    breakpoints={{
                        300:{slidesPerView:2.1,spaceBetween:10,},
                        640:{slidesPerView:2.2,},
                        1024:{slidesPerView:3.1,}
                    }}
                    
                   
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CatalogCard course={course} Height={"lg:h-[250px] h-[100px]"} />
                            </SwiperSlide>
                        ))
                    }   
                    {/* <div className='swiper-button-next'></div> */}
                    {/* <div className='swiper-button-prev'></div> */}
                </Swiper>
            ) : (
                <div className=''>

                </div>
            )

        }
    </>
  )
}

export default CourseSlider
