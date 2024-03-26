"use client"
import TopMenuItem from './TopMenuItem';
import Image from 'next/image'
import { Link } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSession } from 'next-auth/react';



export default function TopMenu() {
    

    const [showMenu, setShowMenu] = useState(false); // State to control dropdown menu visibility

    const { data: session } = useSession();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <div className="fixed flex grid-cols-5 bg-cgr-white h-[50px] z-[100] top-0 right-0 left-0 w-screen items-center justify-between">
            
                <Link href='/'>
                    <Image src={'/img/medical.png'}
                    className="h-[40px] w-auto ml-4 md:block hidden"
                    alt='logo'
                    width={0}
                    height={0}
                    sizes='100vh'/>
                </Link>

                {/* Hamburger menu icon for smaller screens */}
                <div className="md:hidden col-span-4 text-right ml-5 left-0 absolute" onClick={toggleMenu}>
                    {
                    !showMenu ? (
                        <div>
                            <div>
                                <FaBars className="text-gray-600 text-3xl left-0" />
                                
                            </div>
                        </div>
                    ) : (
                        <div>
                            <FaTimes className="text-gray-600 text-3xl left-auto"  />
                                <ul className="absolute left-0 mt-3 w-[130px] bg-white border border-gray-200 rounded-md shadow-lg text-center">
                                    <li><TopMenuItem title='Home' pageRef='/'/></li>
                                    <li><TopMenuItem title='Dentists' pageRef='/dentist'/></li>
                                    <li><TopMenuItem title='Dashboard' pageRef={`/dashboard/${session?.user._id}`}/></li>
                                    <li><TopMenuItem title='Booking' pageRef={`/booking/choosedate/?uid=${session?.user._id}`}/></li>
                                    <li><TopMenuItem title='Register' pageRef='/register'/></li>
                                </ul>
                        </div>
                    )
                    }
                </div>


            {/* Navigation links */}
            <ul className={`flex-row text-center col-span-3 hidden   md:flex items-center gap-12 ${showMenu ? 'block' : 'hidden'}`}>
                <li><TopMenuItem title='Dentists' pageRef='/dentist'/></li>
                <li><TopMenuItem title='Dashboard' pageRef={`/dashboard/${session?.user._id}`}/></li>
                <li><TopMenuItem title='Booking' pageRef={`/booking/choosedate/?uid=${session?.user._id}`}/></li>
                <li><TopMenuItem title='Register' pageRef='/register'/></li>
            </ul>



            {/* Sign-in/Sign-out button */}
            <div className=" items-center flex ">
                {session ? 
                    <Link href="../api/auth/signout">
                        <div className=" flex left-0 items-center h-10 px-4 text-white text-sm bg-blue-300 hover:bg-blue-600 rounded-full">
                            Sign-Out of {session.user?.name}
                        </div>
                    </Link> :
                    <Link href="../api/auth/signin">
                        <div className=" flex items-center h-10 px-4 text-white text-sm bg-blue-300 hover:bg-blue-600 rounded-full">
                            Sign-In
                        </div>
                    </Link>
                }
            </div>
        </div>

    );
}