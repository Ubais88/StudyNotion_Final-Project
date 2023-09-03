import React, { useState } from 'react'
import {HomePageExplorer} from "../../../data/homepage-explore"
import HighLightText from './HighLightText'
import CourseCard from "./CourseCard"

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Carrer paths"
]

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0])
    const [courses, setCourses] = useState(HomePageExplorer[0].courses)
    const [currentCard , setCurrentCard] = useState(HomePageExplorer[0].courses[0].heading)

    const setMyCard = (value) => {
        setCurrentTab(value)
        const result = HomePageExplorer.filter((course) => course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighLightText text={"Power of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>

        <div className=' mt-5 flex rounded-full bg-richblue-800 mb-5 border-richblack-100 px-1 py-1'>
            {
                tabsName.map((element,index) => {
                    return (
                        <div
                            className={`text-[16px] flex flex-row items-center gap-2 
                            ${currentTab === element ?  
                                "bg-richblack-900 text-richblack-5 font-medium" :
                                "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 ` }
                                key={index}
                                onClick={() => setMyCard(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }

        </div>
        <div className='lg:h-[150px]  '>
            {/* course cards */}
            <div className='absolute flex flex-row gap-10 justify-between w-full px-3 translate-x-[-21%]'>
                {
                    courses
                    .map((element , index) =>{
                        return(
                        <CourseCard 
                            key={index}
                            cardData = {element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore