import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation";
import { Navigation, Pagination ,Keyboard,Mousewheel,Autoplay,  FreeMode} from 'swiper/modules';


// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
// import "react-loading-skeleton/dist/skeleton.css";

import Course_Card from './Course_Card'

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
                                <Course_Card course={course} Height={"lg:h-[250px] h-[100px]"} />
                            </SwiperSlide>
                        ))
                    }   
                    {/* <div className='swiper-button-next'></div> */}
                    {/* <div className='swiper-button-prev'></div> */}
                </Swiper>
            ) : (
                <div className='flex gap-4 overflow-hidden'>
                    <span className='text-richblack-50'>No course Found</span>
                </div>
            )

        }
    </>
  )
}

export default CourseSlider