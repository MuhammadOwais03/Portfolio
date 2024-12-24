"use client"

import React, { useEffect, useState } from 'react';
import './styles/skill.css';


const Intro = () => {
    const [text, setText] = useState('');
    const [mainVisible, setMainVisible] = useState("no-visi")

    useEffect(() => {
        setTimeout(() => {
            setMainVisible('visi')

        }, 1000)
    }, [])

    useEffect(() => {

        const timer = setTimeout(() => {
            const fullText = "Muhammad Owais";


            const typeText = async () => {
                for (let index = 0; index < fullText.length; index++) {

                    await new Promise(resolve => setTimeout(resolve, 150));


                    setText(prevText => prevText + fullText[index]);
                }
            };


            typeText();
        }, 2000);


        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        console.log(text)
    }, [text])





    useEffect(() => {
        console.log(text)
    }, [text])
    return (
        <div id="main-intro-container"
            className={`min-h-screen bg-[#15161A] mt-8 text-white flex flex-col flex-wrap justify-center items-center font-sans ${mainVisible}`}
            style={{ opacity: mainVisible === "visi" ? 1 : 0 }}

        >

            {/* Introduction Section */}
            <section id="intro" className="w-full max-w-3xl text-center px-4 py-12 md:px-6 md:py-16">
                <div className="wrapper flex justify-center items-center w-full h-full">
                    <div className="typing font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-tight">
                        Hi, I'm <span className='main-name'>
                            {text.split('').map((letter, index) => (
                                <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                    {letter !== "undefined" ? letter : ""}
                                </span>
                            ))}
                        </span>.
                    </div>
                </div>
                <p id="main-intro-content" className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-justify leading-relaxed tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300">
                    I'm a passionate <strong>Computer System Engineer</strong> with a strong foundation in <strong>web development</strong>, <strong>software engineering</strong>, and <strong>problem-solving</strong>. I specialize in building scalable, user-friendly applications using technologies like <strong>Django</strong>, <strong>React</strong>, and <strong>Python</strong>.
                </p>
                <p id="main-intro-content" className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-justify leading-relaxed tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300">
                    I thrive in dynamic environments where I can apply my skills to solve real-world problems and contribute to impactful projects. Whether it's creating seamless user experiences, integrating powerful back-end systems, or exploring the latest in <strong>AI</strong> and <strong>machine learning</strong>, I'm always eager to take on new challenges. Welcome to my portfolio — take a look at my projects, skills, and achievements.
                </p>
            </section>

            {/* Button Section */}
            <section id="button" className="w-full flex flex-wrap flex-row justify-center items-center gap-4 sm:gap-6">

                <a className="btn">
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Download CV</span>
                </a>
                <a className="btn" href='/projects'>
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>View Projects</span>
                </a>
                <a className="btn">
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                    </svg>
                    <span>Contact Me</span>
                </a>
            </section>

            {/* Experience Section */}
            <section id="experience" className="w-full max-w-6xl text-center px-4 py-12 md:px-6 md:py-16 mt-8 bg-[#1E1F23] rounded-xl shadow-xl">
                <h2 className="text-4xl sm:text-5xl font-semibold mb-8 text-transparent bg-clip-text text-white drop-shadow-lg">
                    Professional Experience
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-8 text-center leading-relaxed tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300">
                    Below is a summary of my professional experience, showcasing my journey in the software development and technology industry.
                </p>

                {/* Experience Cards */}
                <div className="flex justify-center items-center gap-8 flex-wrap w-full py-8">

                    {/* Internship at Codsoft */}
                    <div className="experience-card bg-[#2E2E38] text-white rounded-lg p-6 shadow-xl w-[280px] sm:w-[320px] md:w-[350px] hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gradient">Software Developer Intern at Codsoft</h3>
                            <p className="text-gray-400 text-sm">July 2023 – September 2023</p>
                        </div>
                        <p className="text-sm text-justify">
                            Contributed to the development of various projects like a calculator, phonebook, rock-paper-scissors game, and password generator using Django. Gained expertise in full-stack web development, improving my skills in creating interactive web applications.
                        </p>
                    </div>

                    {/* Internship at Smart City Lab */}
                    <div className="experience-card bg-[#2E2E38] text-white rounded-lg p-6 shadow-xl w-[280px] sm:w-[320px] md:w-[350px] hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gradient">Computer Vision Intern at Smart City Lab, NCAI</h3>
                            <p className="text-gray-400 text-sm">May 2023 – July 2023</p>
                        </div>
                        <p className="text-sm text-justify">
                            Worked on computer vision research, focusing on frame extraction from CCTV footage, data annotation using Roboflow, and training/testing machine learning models. Contributed to the NCAI portal's front-end using React to enhance its functionality.
                        </p>
                    </div>

                    {/* Freelancing Experience */}
                    <div className="experience-card bg-[#2E2E38] text-white rounded-lg p-6 shadow-xl w-[280px] sm:w-[320px] md:w-[350px] hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gradient">Freelance Web Developer</h3>
                            <p className="text-gray-400 text-sm">March 2022 – Present</p>
                        </div>
                        <p className="text-sm text-justify">
                            Designed and developed websites for various clients, including portfolio sites, e-commerce platforms, and blogs. Focused on building responsive, performance-optimized websites using React, HTML, CSS, and Django.
                        </p>
                    </div>

                    {/* Software House Experience */}
                    <div className="experience-card bg-[#2E2E38] text-white rounded-lg p-6 shadow-xl w-[280px] sm:w-[320px] md:w-[350px] hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-gradient">Founder & Lead Developer at Cognitech Labs</h3>
                            <p className="text-gray-400 text-sm">August 2023 – Present</p>
                        </div>
                        <p className="text-sm text-justify">
                            Founded a software development company providing web and mobile solutions. Led a team of developers to deliver scalable applications while managing client projects. Focused on building high-quality software solutions for businesses and startups.
                        </p>
                    </div>

                </div>
            </section>





            {/* Skills Section */}
            <section id="skills" className="w-full max-w-6xl text-center px-4 py-12 md:px-6 md:py-16 mt-8 bg-[#1E1F23] rounded-xl shadow-xl">
                <h2 className="text-4xl sm:text-5xl font-semibold mb-8 text-transparent bg-clip-text text-white drop-shadow-lg">
                    Skills & Technologies
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-center leading-relaxed tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300">
                    Here are some of the technologies I work with and love:
                </p>

                {/* Skill Cards */}
                <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 md:gap-8 w-full py-8">
                    <div className="skills-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Back-End Development */}
                        <div className="skill-card">
                            <div className="icon">⚙️</div>
                            <h3>Back-End Development</h3>
                            <p>Django, Flask, SQL, APIs</p>
                        </div>

                        {/* Front-End Development */}
                        <div className="skill-card">
                            <div className="icon">🌐</div>
                            <h3>Front-End Development</h3>
                            <p>React, JavaScript, Tailwind CSS</p>
                        </div>

                        {/* Version Control */}
                        <div className="skill-card">
                            <div className="icon">📦</div>
                            <h3>Version Control</h3>
                            <p>Git, GitHub, AWS</p>
                        </div>

                        {/* Other Technologies */}
                        <div className="skill-card">
                            <div className="icon">💡</div>
                            <h3>Other Technologies</h3>
                            <p>JWT Authentication, Django Channels, Machine Learning (TensorFlow, scikit-learn)</p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Intro;