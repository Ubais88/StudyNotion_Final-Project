import React from 'react'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Frame from "../../../assets/Images/frame.png"


const Template = ({ title, desc1, desc2, image, formtype }) => {
  return (
    <div className='w-11/12 flex justify-between max-w-[1060px] py-12 mx-auto gap-x-12 gap-y-0'
    >
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-3xl'
            >
                {title}
            </h1>
            <p className='flex flex-col text-[1.125rem] leading-[1.625rem] mt-4'
            >
                <span className='text-richblack-100'>{desc1}</span>
                <span className='text-blue-100 italic'>{desc2}</span>
            </p>
            {formtype === "signup" ? (<SignupForm/>) : (<LoginForm/>)}
        </div>


        <div className='relative w-11/12 max-w-[450px] mx-auto md:mx-0'>
            <img src={Frame} alt="frame" 
                width={558}
                height={504}
                loading='lazy'
            />
            <img src={image} alt="Logo"  
                width={558}
                height={504}
                loading='lazy'  
                className='absolute -top-4 right-4' 
            />
        </div>

    </div>
  )
}

export default Template