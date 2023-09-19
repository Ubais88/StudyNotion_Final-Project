import React, { useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

const NavBar = ({ setProgress }) => {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();



    const location = useLocation()
    const matchRoutes = (routes) => {
        return matchPath({ path: routes }, location.pathname)
    }


    const [sublinks, setsublinks] = useState([]);
    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            if (result?.data?.data?.length > 0) {
                setsublinks(result?.data?.data);
            }
            localStorage.setItem("sublinks", JSON.stringify(result.data.data));

        } catch (error) {
            // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
            // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSublinks();
    }, [])

    const show = useRef();
    const overlay = useRef();

    const shownav = () => {
        show.current.classList.toggle('navshow');
        overlay.current.classList.toggle('hidden');
    }



    //handeling navbar scroll
    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if (currentScrollPos > prevScrollPos) {
            setVisible(false)
        } else {
            setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    })



    return (
        <div className={` flex sm:relative bg-richblack-900 w-screen relative z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to='/' onClick={() => { dispatch(setProgress(100)) }}>
                    <img src={logo} width={160} alt="Study Notion" height={42}></img>
                </Link>


                {/* Desktop Navbar */}
                <nav>
                    <ul className=' flex-row gap-x-6 text-richblack-25 gap-5 hidden md:flex'>
                        {
                            NavbarLinks?.map((element, index) => (
                                <li key={index} >
                                    {
                                        element.title === "Catalog" ? (
                                            <div className=' flex items-center group relative cursor-pointer gap-x-1'>
                                            <p>{element.title}</p>
                                            <MdOutlineKeyboardArrowDown className='text-white text-2xl'/>


                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>
                                                {
                                                    sublinks?.length < 0 ? (<div></div>) : (
                                                        sublinks?.map((element, index) => (
                                                            <Link to={`/catalog/${element?.name}`} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" onClick={() => { dispatch(setProgress(30)) }}>
                                                                <p className=''>
                                                                    {element?.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    )

                                                }






                                            </div>



                                        </div>) : (

                                            <Link to={element?.path} onClick={() => { dispatch(setProgress(100)) }} >
                                                <p className={`${matchRoutes(element?.path) ? " text-yellow-25" : " text-richblack-25 hidden md:block"}`} >
                                                    {element?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className='flex-row gap-5 hidden md:flex items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to='/dashboard/cart' className=' relative px-4 ' onClick={() => { dispatch(setProgress(100)) }} >
                                {
                                    totalItems > 0 && (
                                        <span className=' shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]'>
                                            {totalItems}
                                        </span>
                                    )
                                }

                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to='/login' className='text-richblack-25' onClick={() => { dispatch(setProgress(100)) }} >
                                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to='/signup' className='text-richblack-25' onClick={() => { dispatch(setProgress(100)) }} >
                                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100' >
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <div className=' mt-2' >
                                <ProfileDropDown />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar