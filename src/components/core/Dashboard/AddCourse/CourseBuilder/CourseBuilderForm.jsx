import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const CourseBuilderForm = () => {

    const {register , handleSubmit , setValue , formState:{errors}} = useForm();
    const [editSectionName , setEditCourseName] = useState(null);
    const {course} = useSelector((state) => {state.course})


    const cancelEdit = () => {
        setEditCourseName(null);
        setValue("sectionName","");
    }

  return (
    <div className='text-richblack-700'>
        <p>Course Builder</p>
        <form>
            <div>
                <label htmlFor="">Section Name<sup className='text-red'>*</sup></label>
                <input 
                    type="text"
                    id='sectionName'
                    placeholder='Add a Section Name'
                    {...register("sectioName",{required:true})}
                    className='w-full'
                />
                {
                    errors.sectionName && (
                        <span>Section Name is Required</span>
                    )
                }
            </div>

            <div className='mt-10 flex w-full'>
                <IconBtn
                    type="Submit"
                    text={
                        editSectionName ? "Edit Section Name" : "Create Section"
                        }
                    outline={true}
                    customClasses={"text-white"}
                >
                    <MdAddCircleOutline className="text-yellow-50" size={20}/>
                </IconBtn>
                
                {
                    editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className=""
                        >
                            Cancel Edit
                        </button>
                    )
                }

            </div>
        </form>


    </div>
  )
}

export default CourseBuilderForm