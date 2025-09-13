"use client"

import React, { ReactNode, useEffect, useState } from 'react'
import NavbarClient from './NavbarClient';
import NavbarGuest from './NavbarGuest';
import { AuthProvider } from '../hooks/useAuth';
import SingleChat from "./SingleChat"
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FiShield } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import { FaInstagram, FaStar } from 'react-icons/fa';
import { MessageCircle } from "lucide-react";
import { CiTwitter } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { LuGithub } from "react-icons/lu";
import { useRouter } from 'next/navigation';


const HomePage = () => {

    const [isToken, setIsToken] = useState(false)
    const router = useRouter()
    const getCookie = (cookieName: string) => {
        return document.cookie.split("; ").find((s) => s.startsWith(cookieName))?.split("=")[1] || ""
    }

    type featureCard = {
        icon: ReactNode,
        heading: string,
        subHeading: string
    }

    type review = {
        star: number,
        message: string,
        name: string,
        designation: string,
        nameBgColor?: string
    }

    const reviews: review[] = [
        {
            star: 5,
            message: "Connect has transformed how our team collaborates. The interface is clean, messages are instant, and it just works.",
            name: "Alex Morgan",
            designation: "Product Manager at Acme Inc",
            nameBgColor: "bg-pink-800"
        },
        {
            star: 8,
            message: "I've tried many messaging apps but none come close to Connect's performance and features. The encryption is a huge plus.",
            name: "Sarah Chen",
            designation: "Lead Developer at TechStart",
            nameBgColor: "bg-blue-600"
        },
        {
            star: 4,
            message: "Our design team relies on Connect daily. The ability to share files and collaborate in real-time has been a game-changer.",
            name: "Marcus Johnson",
            designation: "Designer at CreativeStudio",
            nameBgColor: "bg-purple-600"
        }
    ]

    const featureCards: featureCard[] = [
        {
            icon: <IoChatbubbleOutline />,
            heading: "Real-time Messaging",
            subHeading: "Send and receive messages instantly with live typing indicators and read receipts."
        },
        {
            icon: <FiShield />,
            heading: "End-to-End Encryption",
            subHeading: "Your conversations are protected with industry-leading security protocols."
        },
        {
            icon: <BsLightningCharge />,
            heading: "Lightning Fast",
            subHeading: "Engineered for speed and reliability, even on slow connections."
        }
    ]

    const socialLinks = [
        { icon: CiTwitter, href: "#twitter", label: "Twitter" },
        { icon: FiFacebook, href: "#facebook", label: "Facebook" },
        { icon: FaInstagram, href: "#instagram", label: "Instagram" },
        { icon: LuGithub, href: "#github", label: "Github" }
    ];
    
    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Security", href: "#security" },
                { name: "Enterprise", href: "#enterprise" },
                { name: "Integrations", href: "#integrations" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "#docs" },
                { name: "API", href: "#api" },
                { name: "Blog", href: "#blog" },
                { name: "Community", href: "#community" },
                { name: "Help Center", href: "#help-center" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "#about" },
                { name: "Careers", href: "#careers" },
                { name: "Contact", href: "#contact" },
                { name: "Privacy", href: "#privacy-policy" },
                { name: "Terms", href: "#terms-of-service" }
            ]
        }
    ];
    
    const legalLinks = [
        { name: "Privacy Policy", href: "#privacy-policy" },
        { name: "Terms of Service", href: "#terms-of-service" },
        { name: "Cookies", href: "#cookies-policy" }
    ];
    

    useEffect(() => {
        const token = getCookie("authToken")
        if (token && typeof token === "string" && token !== "") setIsToken(true)
        else setIsToken(false);
    }, [])


    return (
        <div style={{ overflowX: "hidden" }} className=' bg-zinc-950 text-white h-fit w-full flex flex-col justify-start items-start'>

            {isToken ? <AuthProvider ><NavbarClient /></AuthProvider> : <NavbarGuest extenedClass='bg-zinc-950/80 backdrop-blur-sm z-[1000] fixed top-0' />}

            <div className=' flex  w-[85%] pt-[10vh]  flex-col justify-start items-center mx-auto gap-16 sm:gap-24 '>

                {/* hero section */}
                <div className=' w-[80%] sm:w-[65%] text-center h-[50vh] flex py-10 pt-14 items-center flex-col gap-5  relative'>
                    <div className=' z-10 text-green-400 font-[500]  px-3 py-1 rounded-2xl bg-green-400/20 '>New: Real Time Notification Released</div>
                    <div className='hero  z-10'>Connect with <span className=' text-green-500'>everyone</span>, all in one place</div>
                    <div className='z-10 w-full sm:w-[75%] text-zinc-400 text-lg'>The messaging platform that brings your conversations together. Simple, secure, and designed for modern teams and friends.</div>
                    <div>
                        <button onClick={()=>{router.push('/signup')}} className='z-10 cursor-pointer hover:opacity-80 transition-all duration-200 bg-green-600 text-white py-3 px-7 text-xl rounded-lg'>Get Started Free</button>

                    </div>
                    {/* green bg */}
                    <div className=' bg-green-500 blur-[180px] h-[10vh] z-[1] w-[30vw]  bottom-0 absolute'></div>

                </div>

                {/* display chat  */}
                <div className='mt-[5vh] sm:mt-0 z-10 border border-zinc-800 bg-zinc-900/70 rounded-xl min-h-[40vh] w-full sm:w-[80%] flex flex-col justify-start items-start'>

                    <div className=' flex justify-start items-center gap-[6px] p-3 '>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                    </div>

                    <div className=' w-full p-4 '>

                        <SingleChat left={true} sender='A' message='Hey team! Just finished the new design system.'></SingleChat>
                        <SingleChat left={false} sender='Y D' message={`Looks amazing! Let's review it together.`}></SingleChat>
                        <SingleChat left={true} sender='D' message={`I've added some comments. Check them out when you get a chance.`}></SingleChat>

                    </div>

                </div>


                {/* Sub Hero Section */}
                <div className=' flex flex-col justify-center items-center w-full gap-[5vh] sm:gap-[13vh] '>

                    <div className=' flex flex-col justify-center items-center gap-5'>
                        <div className=' text-3xl sm:text-4xl font-bold'>Everything you need to stay connected</div>
                        <div className=' text-sm sm:text-lg text-zinc-400'>Powerful features designed for seamless communication and collaboration.</div>
                    </div>

                    {/* Feature Cards */}
                    <div className=' w-full flex flex-col sm:flex-row flex-wrap justify-start items-center gap-5 px-2 relative'>

                        <div className=' bg-green-500 blur-[250px] h-[10vh] z-[1] w-[70vw] sm:w-[30vw]  -top-[10%] right-[30%] absolute'></div>

                        {
                            featureCards.map((c, i) =>
                                <div key={i} className='  text-white z-10 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all duration-200 w-[90%]  max-w-[90%] sm:w-[32%] sm:max-w-[32%] py-6 pb-8 rounded-xl border border-zinc-800 px-4 flex flex-col justify-start gap-3 items-start'>

                                    <div className=' text-green-500 text-2xl bg-green-800/20 h-11 w-11 flex justify-center items-center p-2 rounded-full'>{c.icon}</div>
                                    <div className=' flex flex-col w-full justify-start items-start gap-1'>
                                        <div className=' text-xl font-semibold'>
                                            {c.heading}
                                        </div>
                                        <div className=' text-zinc-400 text-sm'>
                                            {c.subHeading}
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    </div>

                </div>

                {/* Reviews */}
                <div className=' flex flex-col justify-center items-center w-[117.5%] gap-[5vh] sm:gap-[13vh] px-8 py-10 sm:py-16 bg-zinc-900/50'>

                    <div className=' flex flex-col justify-center items-center gap-5'>
                        <div className=' text-4xl font-bold'>Loved by teams and friends</div>
                        <div className=' text-lg text-zinc-400'>Join thousands of users who rely on Connect for their communication needs.</div>
                    </div>

                    {/* Review Cards */}
                    <div className=' w-full flex flex-wrap flex-col sm:flex-row justify-start items-center gap-5 px-2 relative'>


                        <div className='  sm:w-[70%] flex flex-wrap justify-center flex-col sm:flex-row mx-auto  items-center gap-5 px-2 relative'>



                            {
                                reviews.map((review, i) =>
                                    <div key={i} className='w-[90%]  max-w-[90%]  text-white z-10 bg-zinc-950/40 hover:bg-zinc-950/50 transition-all duration-200 sm:w-[32%] sm:max-w-[32%] py-6 pb-8 rounded-xl border border-zinc-800 px-4 flex flex-col justify-start gap-4 items-start'>


                                        <div className=' flex items-center justify-start gap-1'>
                                            {
                                                new Array(5).fill("").map((_, currInd) => <div key={currInd} className={` text-xl ${currInd < review.star ? ' text-green-600' : " text-zinc-500"}`}><FaStar /></div>)
                                            }
                                        </div>

                                        <div className=' w-[90%] text-zinc-300'>
                                            "{review.message}"
                                        </div>

                                        <div className=''>
                                            <div className={`${review.nameBgColor ? review.nameBgColor : "bg-zinc-700"} w-10    p-1 h-10 flex justify-center items-center text-lg rounded-full`}>
                                                {review.name && review.name.split(" ").slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase()}
                                            </div>
                                        </div>

                                    </div>
                                )
                            }

                        </div>


                    </div>

                </div>


                {/* Lower Hero Section */}
                <div className="flex w-full sm:w-[80%] bg-white/1 0 backdrop-blur-l g bg-gradient-to-r from-zinc-900 to-zinc-900/80 h-[38vh] sm:h-[45vh] rounded-lg shadow-lg justify-between items-center px-10 relative">

                    <div className=' flex flex-col justify-start items-start gap-3 sm:gap-4 w-[60%] sm:w-[70%]'>
                        <div className=' text-[26px]  leading-6.5 sm:leading-none  sm:text-[36px] font-bold'>Start connecting today</div>
                        <div className='  text-sm sm:text-xl text-zinc-400 font-light'>Join thousands of users and teams who are already experiencing better communication with Connect.</div>
                        <div>
                            <button onClick={()=>{router.push('/signup')}} className=' w-[80%] sm:w-full z-10 cursor-pointer hover:opacity-80 transition-all duration-200 bg-green-600 text-white py-2 sm:py-2 px-4 sm:px-7 text-sm  sm:text-xl rounded-lg'>Get Started Free</button>
                        </div>
                    </div>

                    <div className=' h-[50%] sm:h-[65%] rounded-xl w-[50%] sm:w-[23%]  bg-zinc-800 relative flex justify-center items-center'>
                        <IoChatbubbleOutline className=' text-7xl text-green-500/30' />
                        <div className=' absolute -right-[2vh] -bottom-[2vh] bg-zinc-900 border border-zinc-950/50 p-3 rounded-full text-green-600 text-3xl'><IoChatbubbleOutline /></div>
                    </div>

                </div>



                {/* footer */}
                <div className=" w-[114%] pt-16 pb-8 border-t border-zinc-900 bg-zinc-950">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            <div className="col-span-2 lg:col-span-2">
                                <div className="flex items-center space-x-2 mb-6">
                                    <MessageCircle className="h-6 w-6 text-green-500" />
                                    <span className="text-xl font-bold text-white">connect</span>
                                </div>
                                <p className="text-zinc-400 mb-6 max-w-xs">
                                    The messaging platform designed for modern teams and friends. Simple, secure, and built for connection.
                                </p>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className="text-zinc-500 hover:text-green-500 transition-colors"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {footerLinks.map((category, index) => (
                                <div key={index}>
                                    <h3 className="text-white font-semibold mb-4">{category.title}</h3>
                                    <ul className="space-y-3">
                                        {category.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a href={link.href} className="text-zinc-400 hover:text-green-500 transition-colors">
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-zinc-500 text-sm mb-4 md:mb-0">
                                &copy; {2025} Connect App. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                {legalLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="text-zinc-500 hover:text-green-500 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePage
