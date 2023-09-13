import React, { useEffect, useState } from 'react'
import {NavbarLinks} from "../../data/navbar-links" 
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'




const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)

    const location = useLocation()

    const [subLinks, setSublinks] = useState([]);
    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sublinks ", result)
                setSublinks(result?.data?.data);
            }
        catch(error){
                console.log("Could not fetched the category list", error)
            }
        }

        useEffect(() => {
            fetchSublinks();
        }, [])

    const matchRoute = (route) => {
        return matchPath({path:route} , location.pathname)
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
            <Link to='/'>
                <img src={logo} alt="logo" width={160} height={32} />
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>{
                    NavbarLinks.map((link ,index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                <div className=' relative flex items-center gap-2 group'>
                                    <p>{link.title}</p>
                                    <IoIosArrowDropdownCircle/>

                                    <div className='invisible absolute left-[50%] top-[-10%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] '>
                                        <div className=' absolute left-[50%] top-[0%] translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5 '></div>
                                    {
                                        subLinks.length ? (
                                                subLinks.map((subLink , index) => (
                                                    <Link to={`${subLink.link}`} key={index} >
                                                        <p>{subLink.title}</p>
                                                    </Link>
                                                ))
                                        ) : (<div></div>)
                                    }
                                    </div>
                                </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </nav>
            {/*login /signup/dashboard*/}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" 
                         className='relative'
                        >
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/login'>
                            <button className='border boder-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/signup'>
                            <button className='border boder-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Signup
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <div className=' mt-2' >
                            <p className=' text-richblack-50 text-center mb-2'>Account</p>
                            <ProfileDropdown />
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar