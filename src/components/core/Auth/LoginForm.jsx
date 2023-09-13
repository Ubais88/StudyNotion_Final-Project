import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [formData , setFormData] = useState({
        email:"", password:""
    })

    const navigate = useNavigate();

    const [showPassword , setShowPassword] = useState(false)

    function changeHandler(event){
            setFormData((prevData) => ({
                ...prevData,
                [event.target.name]:event.target.value
            }))
    }

    function submitHandler(event){
        event.preventDefault();
        console.log(formData)
        toast.success("Logged In");
        navigate('/');
    }

  return (
    <div>
        <form onSubmit={submitHandler}
        className='flex flex-col w-full gap-y-4 mt-6 '
        >

            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address
                <sup className='text-pink-200'>*</sup>
                </p>
            <input
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] ' 
                type="email" 
                name="email" 
                placeholder='Enter Email Address' 
                value={formData.email} 
                onChange={changeHandler} 
                required />
            </label>

            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
            <input 
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                type={showPassword ? ("text") : ("password")} 
                name="password" 
                placeholder='Enter Password' 
                value={formData.password} 
                onChange={changeHandler} 
                required />

                <span onClick={() => setShowPassword((prev) => !prev)} 
                className='absolute right-3 top-[38px] cursor-pointer'
                >
                    {showPassword ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) }
                </span>
                <Link to="/forgot-password">
                    <p className='text-xs mt-1 text-blue-100 text-right'>Forget Password</p>
                </Link>
            </label>

            <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6' >Sign In</button>

        </form>
    </div>
  )
}

export default LoginForm