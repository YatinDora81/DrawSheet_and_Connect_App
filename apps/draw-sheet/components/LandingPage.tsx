import Link from "next/link";
import LandingPage_Drawing from "../components/LandingPage_Drawing";
import SelectNavbar from "../components/SelectNavbar";
import { FaArrowRight, FaGithub, FaLinkedinIn, FaStar } from "react-icons/fa";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FiGithub, FiPenTool, FiShare2, FiDownloadCloud, FiShield, FiTool, FiZap, FiUsers, FiLayers, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { IoSparkles, IoChatbubbleOutline } from "react-icons/io5";
import { HiUsers, HiRefresh, HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { ReactNode } from "react";
import { cn } from "../utils/cn";

function LandingPage() {

    const imageCards = [
        {
            title: '95%',
            desc: 'User Satisfaction'
        },
        {
            title: '1-Click',
            desc: 'Export & Download'
        },
        {
            title: '10x',
            desc: 'Faster Creation'
        },
        {
            title: '24/7',
            desc: 'Always Available'
        }
    ]

    const featuresCard = [
        {
            icon: IoChatbubbleOutline,
            title: "Simple & Intuitive",
            description: "Designed with simplicity in mind. No learning curve, start drawing right away."
        },
        {
            icon: FiTool,
            title: "Versatile Tools",
            description: "From basic shapes to complex diagrams, all the tools you need for your ideas."
        },
        {
            icon: FiShare2,
            title: "Easily Shareable",
            description: "Share your creations with anyone, anywhere, with just a link."
        },
        {
            icon: FiDownloadCloud,
            title: "Export Options",
            description: "Save your work in multiple formats including PNG and SVG."
        },
        {
            icon: FiPenTool,
            title: "Hand-drawn Feel",
            description: "Enjoy the natural feel of hand-drawn diagrams with digital convenience."
        },
        {
            icon: FiShield,
            title: "Private & Secure",
            description: "Your diagrams are private by default. Share only when you want to."
        }
    ]


    const drawingSteps = [
        {
            step: 1,
            icon: FiTool,
            title: "Choose Your Tools",
            description: "Select from our intuitive drawing tools designed for quick sketching and diagramming.",
        },
        {
            step: 2,
            icon: FiPenTool,
            title: "Start Drawing",
            description: "Create your diagrams with natural hand-drawn feel using our advanced drawing engine.",
        },
        {
            step: 3,
            icon: FiLayers,
            title: "Organize & Layer",
            description: "Structure your work with layers, groups, and smart organization features.",
        },
        {
            step: 4,
            icon: FiShare2,
            title: "Share & Export",
            description: "Export in multiple formats or share with your team for instant collaboration.",
        },
    ];

    const testimonials = [
        {
            name: "Emma Rodriguez",
            role: "UX Designer at DesignCorp",
            content: "Drawsheet has revolutionized how our design team creates wireframes and diagrams. The hand-drawn feel is perfect for brainstorming sessions.",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Senior Architect at BuildStudio",
            content: "As an architect, I love how intuitive Drawsheet is for sketching floor plans and concepts. It's become my go-to tool for initial designs.",
            rating: 5,
        },
        {
            name: "Sarah Johnson",
            role: "Lead Engineer at TechFlow",
            content: "Our engineering team uses Drawsheet for system diagrams and flowcharts. The collaborative features make remote work seamless.",
            rating: 4,
        },
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#features" },
                { name: "Templates", href: "#templates" },
                { name: "Integrations", href: "#integrations" },
                { name: "API", href: "#api" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "#docs" },
                { name: "Tutorials", href: "#tutorials" },
                { name: "Community", href: "#community" },
                { name: "Help Center", href: "#help" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
                { name: "Privacy", href: "#privacy" },
                { name: "Terms", href: "#terms" }
            ]
        }
    ];

    const socialLinks = [
        { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/yatin-dora/", label: "LinkedIn" },
        { icon: FaGithub, href: "https://github.com/YatinDora81", label: "GitHub" },
        { icon: CiMail, href: "mailto:yatin.dora81@gmail.com", label: "Email" }
    ];

    return (
        <div className="w-full bg-zinc-950 min-h-[100vh] text-white scroll-smooth" style={{ overflowX: "hidden" }}>

            <SelectNavbar />

            <div className="flex w-[100%] md:w-[85rem] flex-col globalPadding" style={{ marginInline: "auto" }}>

            {/* Hero Section */}
            <div className="md:h-[32rem] w-full flex flex-col md:flex-row justify-between md:items-center gap-8 md:gap-0 globalPadding" style={{ marginTop: "8.2%" }}>

                <div className="w-full md:w-[48%] gap-4 h-full flex flex-col justify-start items-start">

                    <div className="z-10 text-blue-400 font-[500] rounded-2xl bg-blue-400/20 w-fit" style={{ padding: "4px 12px" }}>New: Real-time Collaboration Released</div>
                    
                    <div className="h-[50%] flex flex-col items-start justify-center text-[2rem] md:text-[4rem] leading-none font-bold font-sans">
                        <div>The simplest way to create</div>
                        <div className="text-blue-500 text-[1.8rem] md:text-[3.6rem]">diagrams and sketches</div>
                    </div>

                    <div className="herodesc text-sm md:text-lg text-zinc-400">
                        Drawsheet is a virtual whiteboard for sketching hand-drawn like diagrams. Collaborative, secure, and works on any device. Perfect for designers, architects, engineers, and educators.
                    </div>

                    <div className="w-full flex gap-3 justify-start items-start">
                        <Link href="/signin" className="border flex justify-center items-center md:w-[30%] text-sm font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 gap-1 hover:opacity-80 transition-all duration-100 h-[3rem] " style={{ padding: "0 6px" }}>
                            <div>Start drawing now</div> 
                            <FaArrowRight /> 
                        </Link>
                        <Link href="/signup" className="border flex justify-center items-center text-sm md:w-[30%] border-zinc-800 rounded-lg cursor-pointer font-semibold hover:bg-blue-500 gap-2 transition-colors duration-200 h-[3rem]" style={{ padding: "0 16px" }}>
                            Sign up - It's free
                        </Link>
                    </div>

                </div>

                <LandingPage_Drawing />

            </div>

                {/* Stats Section */}
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-center items-center w-full gap-y-6 gap-x-4 md:gap-16" style={{ marginTop: "3.3rem", padding: "32px 0" }}>
                    {imageCards.map((item, index) => (
                        <div key={index} className="text-center w-[45%] md:w-auto">
                            <div className="text-3xl md:text-4xl font-bold text-blue-500">{item.title}</div>
                            <div className="text-zinc-400 text-sm md:text-base">{item.desc}</div>
                        </div>
                    ))}
                </div>


                {/* Sub Hero Section */}
                <div className="flex flex-col justify-center items-center w-full gap-[6vh] md:gap-[13vh]" style={{ marginTop: "80px" }}>

                    <div className="flex flex-col justify-center items-center gap-1 md:gap-5">
                        <div className="text-2xl md:text-4xl font-bold" style={{ marginTop: "3.3rem" }}>Why Drawsheet?</div>
                    </div>

                    {/* Feature Cards */}
                    <div className="w-[90%] flex flex-wrap flex-col sm:flex-row justify-center sm:justify-start items-center gap-5 relative" style={{ marginInline: "auto", marginTop: "-2rem" }}>

                        <div className="bg-blue-500 blur-[290px] h-[10vh] z-[1] w-[30vw] top-[40%] right-[30%] absolute"></div>

                        {featuresCard.map((c, i) => (
                            <div key={i} className="z-[11] text-white bg-zinc-900/70 transition-all duration-200 w-full sm:w-[32%] sm:max-w-[32%] rounded-xl flex flex-col min-h-[8rem] justify-start gap-3 items-start" style={{ padding: "16px 16px 24px 16px" }}>

                                <div className="text-blue-500 text-2xl bg-blue-800/20 h-11 w-11 flex justify-center items-center rounded-full" style={{ padding: "8px" }}>
                                    <c.icon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col w-full justify-start items-start gap-1">
                                    <div className="text-xl font-semibold">
                                        {c.title}
                                    </div>
                                    <div className="text-zinc-400 text-sm">
                                        {c.description}
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* How It Works */}
                <div className="flex flex-col justify-center items-center w-full gap-[6vh] md:gap-[10vh]" style={{ marginTop: "80px" }}>
                    <div className="flex flex-col justify-center items-center gap-1 md:gap-5">
                        <div className="text-2xl md:text-4xl font-bold">How It Works</div>
                        <div className="text-sm md:text-lg text-zinc-400">Start creating professional diagrams in minutes</div>
                    </div>

                    {/* Steps Cards */}
                    <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-6 relative" style={{ marginInline: "auto" }}>
                        <div className="bg-blue-500 blur-[250px] h-[10vh] z-[1] w-[40vw] top-[30%] left-[30%] absolute"></div>
                        
                        {drawingSteps.map((step, i) => (
                            <div key={i} className="relative z-10 text-white bg-zinc-900/70 hover:bg-zinc-900/90 transition-all duration-200 rounded-xl flex items-start gap-4" style={{ padding: "20px" }}>
                                <div className="bg-blue-500/20 rounded-lg flex-shrink-0" style={{ padding: "12px" }}>
                                    <step.icon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-semibold">{step.title}</div>
                                    <div className="text-zinc-400 text-sm">{step.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="flex flex-col justify-center items-center w-full gap-[4vh] md:gap-[6vh]" style={{ padding: "32px 16px", marginTop: "80px" }}>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="text-2xl md:text-4xl font-bold">Loved by Creative Professionals</div>
                        <div className="text-sm md:text-lg text-zinc-400">See what our users have to say about their experience</div>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="w-full flex flex-wrap flex-col md:flex-row justify-center items-center gap-5 relative max-w-6xl">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="w-[90%] max-w-[90%] text-white z-10 bg-zinc-950/60 hover:bg-zinc-950/80 transition-all duration-200 md:w-[32%] md:max-w-[32%] rounded-xl border border-blue-500/30 flex flex-col justify-start gap-4 items-start" style={{ padding: "24px" }}>
                                <div className="flex items-center justify-start gap-1">
                                    {new Array(5).fill("").map((_, currInd) => (
                                        <div key={currInd} className={`text-xl ${currInd < testimonial.rating ? 'text-blue-500' : 'text-zinc-500'}`}>
                                            <FaStar />
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="w-[90%] text-zinc-300">
                                    "{testimonial.content}"
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-600 w-10 h-10 flex justify-center items-center text-lg rounded-full">
                                        {testimonial.name.split(" ").slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{testimonial.name}</div>
                                        <div className="text-zinc-400 text-xs">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            {/* CTA Section */}
            <section className="w-full bg-zinc-900/50 text-white text-center" style={{ padding: "48px 16px", marginBlock: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <h2 className="text-2xl md:text-4xl font-bold">
                            Ready to Transform Your Creative Process?
                        </h2>
                        <p className="text-base md:text-lg text-zinc-400">
                            Join thousands of creative professionals who are bringing their ideas to life with Drawsheet
                        </p>
                    </div>
                    
                    <div>
                        <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors inline-block" style={{ padding: "12px 32px" }}>
                            Start Drawing Now
                        </Link>
                    </div>
                    
                    <p className="text-sm text-zinc-500">
                        No credit card required • Start in seconds
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-zinc-800 bg-zinc-900/30" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
                <div className="w-full" style={{ padding: "48px 5% 64px 5%" }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full" style={{ marginBottom: "48px" }}>
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center space-x-2" style={{ marginBottom: "16px" }}>
                                <PiPencilSimpleLineLight className="h-6 w-6 text-blue-500" />
                                <h3 className="font-bold text-xl">Drawsheet</h3>
                            </div>
                            <p className="text-sm text-zinc-400">
                                Virtual whiteboard platform helping thousands create beautiful diagrams and sketches.
                            </p>
                        </div>
                        
                        {footerLinks.map((category, index) => (
                            <div key={index}>
                                <h4 className="font-semibold" style={{ marginBottom: "16px" }}>{category.title}</h4>
                                <ul className="space-y-2 text-sm text-zinc-400">
                                    {category.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.href} className="hover:text-blue-500 transition-colors">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 w-full" style={{ paddingTop: "32px" }}>
                        <p className="text-sm text-zinc-400">
                            © {new Date().getFullYear()} Drawsheet. All rights reserved. Crafted with ❤️ by Yatin Dora
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    target="_blank"
                                    href={social.href}
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 hover:text-blue-500 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            </div>

        </div>
    )
}

export default LandingPage