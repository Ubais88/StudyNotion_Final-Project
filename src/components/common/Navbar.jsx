import React from 'react'
import {NavbarLinks} from "../../data/navbar-links" 
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from "../core/Auth/ProfileDropDown"

const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)

    const location = useLocation()

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
                                link.title === "Catalog" ?
                                {/* incomplete */}
                                (<div></div>) 
                                 : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                 )}
                        </li>
                    ))}
                </ul>
            </nav>
            {/*login /signup/dashboard*/}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType != "Instructor" && (
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
                    token !== null && <ProfileDropDown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar