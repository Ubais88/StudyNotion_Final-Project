import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const[formData , setFormData] = useState({
        firstname:'', lastname:"",email:"",password:"",confirmpassword:""
    })

    const navigate = useNavigate();

    const[showPassword , setShowPassword] = useState(false)
    const[confirmPassword , setConfirmPassword] = useState(false)
    const[accountType , setAccountType] = useState("student")

    function changeHandler(event){
            setFormData((prevData)=> ({
                ...prevData,
                [event.target.name]:event.target.value
            }))
    }


    function submitHandler(event){
        event.preventDefault();
        if(formData.password !== formData.confirmpassword){
            toast.error("Password does not match")
            return;
        }

        toast.success("Sign Up Successfully");
        navigate('/')
    
        const finalData = {
            ...formData,
            accountType
        }
        console.log(finalData);
    }


  return (
    <div  >

        {/* student - instructor switch */}
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button 
                className={`${accountType === "student" 
                ? 
                    "bg-richblack-900 text-richblack-5" 
                : 
                    "bg-transparent text-richblack-200 "} py-2 px-5 rounded-full transition-all duration-500" 
                `}
                onClick={() => setAccountType("student")}>
                Student
            </button>
            <button
                onClick={() => setAccountType("instructor")}
                className={`${accountType === "instructor" 
                ? 
                    "bg-richblack-900 text-richblack-5" 
                : 
                    "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-500" 
                `}>
                Instructor
            </button>
        </div>
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-[10px] '>
        {/* first name and last name */}
            <div className='flex gap-x-4 mt-[10px]'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input         className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] ' 
                        type="text"
                        required
                        name='firstname'
                        onChange={changeHandler}
                        placeholder='Enter First Name'
                        value={formData.firstname} />
                </label>

                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                    <input 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        type="text"
                        required
                        name='lastname'
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        value={formData.lastname} />
                </label>
            </div>
        {/* email adress */}
            <label className='w-full mt-[10px]'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        type="email"
                        required
                        name='email'
                        onChange={changeHandler}
                        placeholder='Enter Email Address'
                        value={formData.email} />
            </label>

            {/* password and confirm password */}
            <div className='flex gap-x-4 mt-[10px]'>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        type={showPassword ? ("text"): ("password")}
                        required
                        name='password'
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={formData.password} />
                        <span onClick={() =>setShowPassword((prev) => !prev)}
                        className='absolute right-3 top-[38px] cursor-pointer'
                        >
                            {                                
                                showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>
                </label>

                <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] ' 
                        type={confirmPassword ? ("text") : ('password')}
                        required
                        name='confirmpassword'
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={formData.confirmpassword} />
                        <span onClick={() =>setConfirmPassword((prev) => !prev)}
                        className='absolute right-3 top-[38px] cursor-pointer'
                        >
                            {                                
                                confirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>
                </label>
            </div>

            <button className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Create Account</button>

        </form>
    </div>
  )
}

export default SignUpForm