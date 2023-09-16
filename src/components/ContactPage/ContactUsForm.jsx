import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import contactusEndpoint from "../../services/operations/authApi"
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
  const [loading , setloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors, isSubmitSuccessful}
  } = useForm();

  const submitContactForm = async(data) => {
      console.log("Contact Form Data : ", data);
      try{
        setloading(true);
        // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
        const response = {status:"Fine"}
        console.log("contact US response : ", response);
        setloading(false);
      }
      catch(error){
        console.log("Conatct us form error : ",error.message);
        setloading(false);
      }
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:"",

      })
    }
  } , [isSubmitSuccessful , reset])



  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-10'>

      <div className='flex gap-5'>
       {/* firstname */}
        <div className='flex flex-col'>
          <label htmlFor='firstname'>First Name</label>
            <input type="text" 
              name='firstname'
              id='firstname'
              placeholder='Enter first name'
              {...register("firstname" , {required:true})}
              className='text-black'
            /> 
            {
              errors.firstname && (
                <span>
                  Please enter Your name
                </span>
              )
            }
        </div>
        {/*lastname */}
        <div className='flex flex-col'>
          <label htmlFor='lastname'>Last Name</label>
            <input type="text" 
              name='lastname'
              id='lastname'
              placeholder='Enter last name'
              className='text-black'
              {...register("lastname")}
            /> 
        </div>

      </div>

      {/* email */}
      <div className='flex flex-col'>
        <label htmlFor="email">Email Address</label>
        <input 
          type="text" 
          name='email'
          id='email'
          placeholder='Enter email address'
          className='text-black'
          {...register("email",{required:true})}
        />
        {
          errors.email && (
            <span>Please Enter Your Email Address</span>
          )
        }
      </div>

      {/* phone no. */}
      <div className='flex flex-col'>
        <label htmlFor="phoneno">Phone No.</label>
        <div className='flex gap-5'>
          {/* dropdown */}
          <div className='flex flex-col text-black w-[10%] '>
            <select
              name='dropdown'
              id='dropdown'
              {...register("countrycode", {required:true})}
            >
              {
                CountryCode.map((element , index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code}-{element.country}
                    </option>
                  )
                })
              }
            </select>
          </div>
          {/* phoneno. */}
          <div className='flex flex-col w-[80%]'>
            <input 
              type="text"  
              name="phoneno" 
              id="phoneno"
              placeholder='12345 6789'
              className='text-black' 
              {...register("phoneno" ,
              {
                required:{value:true, message:"Please Enter a valid Phone Number"},
                maxLength:{value:10,message:"Invalid phone number"},
                minLength:{value:8,message:"Invalid phone number"},
              })}

            />
          </div>
        </div>
        {
          errors.phoneno && (
            <span>
              {errors.phoneno.message}
            </span>
          )
        }
      </div>

      {/* message */}
      <div className='flex flex-col'>
        <label htmlFor="messsage">Email Message</label>
        <textarea 
          name='message'
          id='messsage'
          cols="30"
          rows="2"
          placeholder='Enter Your Message'
          className='text-black'
          {...register("message" , {required: true})}
        />
        {
          errors.message && (
            <span>Please Enter Your Message</span>
          )
        }
      </div>

      <button type='submit' 
      className='rounded-md bg-yellow-50 text-center px-10 text[16px] font-semibold text-black'>
        Send Message
      </button>

    </div>

    </form>
  )
}

export default ContactUsForm