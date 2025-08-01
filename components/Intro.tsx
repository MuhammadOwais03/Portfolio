"use client";

import React, { useEffect, useState } from "react";
import { client } from "../src/lib/sanity";
import logo1 from '../public/logo1.png'
import Image from "next/image";

// Types for Sanity CV data
interface CVFile {
  asset: {
    url: string;
  };
}

interface CVDocument {
  _id: string;
  cvFile: CVFile;
}


const Intro = () => {
  const [text, setText] = useState("");
  const [mainVisible, setMainVisible] = useState("no-visi");
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        // Query to fetch the CV file URL from Sanity
        const query = `*[_type == "cv"]{
                    cvFile {
                        asset->{url}
                    }
                }`;
        console.log(query);
        // Fetch the data from Sanity
        const data = await client.fetch<CVDocument[]>(query);
        console.log("intro", data);
        // If we have data, get the URL of the CV file
        if (data && data.length > 0) {
          setCvUrl(data[0].cvFile.asset.url);
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };
    fetchCV();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMainVisible("visi");
      setIsLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fullText = "Muhammad, Owais";
      const typeText = async () => {
        for (let index = 0; index < fullText.length; index++) {
          await new Promise((resolve) => setTimeout(resolve, 150));
          setText((prevText) => prevText + fullText[index]);
        }
      };
      typeText();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: "React", icon: "bxl-react text-5xl text-white", color: "from-blue-400 to-cyan-400", hoverColor: "hover:text-blue-400" },
    { name: "Next.js", icon: "devicon-vercel-original text-5xl text-white", isDevicon: true },
    { name: "Linux", icon: "devicon-linux-plain text-5xl text-white", isDevicon: true },
    { name: "MySQL", icon: "devicon-mysql-original text-5xl text-white", isDevicon: true },
    { name: "HTML5", icon: "bxl-html5 text-5xl text-white", color: "from-orange-400 to-red-500", hoverColor: "hover:text-orange-400" },
    { name: "CSS3", icon: "bxl-css3 text-5xl text-white", color: "from-blue-500 to-blue-700", hoverColor: "hover:text-blue-500" },
    { name: "JavaScript", icon: "bxl-javascript text-5xl text-white", color: "from-yellow-300 to-yellow-500", hoverColor: "hover:text-yellow-400" },
    { name: "TypeScript", icon: "bxl-typescript text-5xl text-white", color: "from-blue-500 to-blue-700", hoverColor: "hover:text-blue-500" },
    { name: "Tailwind", icon: "bxl-tailwind-css text-5xl text-white", color: "from-cyan-400 to-cyan-600", hoverColor: "hover:text-cyan-400" },
    { name: "Bootstrap", icon: "bxl-bootstrap text-5xl text-white", color: "from-purple-500 to-purple-700", hoverColor: "hover:text-purple-500" },
    { name: "Django", icon: "bxl-django text-5xl text-white", color: "from-green-400 to-emerald-500", hoverColor: "hover:text-green-400" },
    { name: "Python", icon: "bxl-python text-5xl text-white", color: "from-yellow-400 to-orange-500", hoverColor: "hover:text-yellow-400" },
    { name: "Node.js", icon: "bxl-nodejs text-5xl text-white", color: "from-green-500 to-green-700", hoverColor: "hover:text-green-500" },
    { name: "MongoDB", icon: "bxl-mongodb text-5xl text-white", color: "from-green-400 to-green-600", hoverColor: "hover:text-green-400" },
    { name: "PostgreSQL", icon: "bxl-postgresql text-5xl text-white", color: "from-blue-600 to-indigo-600", hoverColor: "hover:text-blue-600" },
    { name: "Docker", icon: "bxl-docker text-5xl text-white", color: "from-blue-400 to-blue-600", hoverColor: "hover:text-blue-400" },
    { name: "Git", icon: "bxl-git text-5xl text-white", color: "from-orange-400 to-red-500", hoverColor: "hover:text-orange-400" },
    { name: "GitHub", icon: "bxl-github text-5xl text-white", color: "from-gray-400 to-gray-600", hoverColor: "hover:text-gray-400" },
    { name: "C++", icon: "bxl-c-plus-plus text-5xl text-white", color: "from-blue-500 to-blue-700", hoverColor: "hover:text-blue-500" },

    // New additions (replacing Java)
    { name: ".NET", icon: "devicon-dot-net-plain text-5xl text-white", isDevicon: true, color: "from-purple-500 to-blue-600", hoverColor: "hover:text-purple-400" },
    { name: "FastAPI", icon: "devicon-fastapi-plain text-5xl text-white", isDevicon: true, color: "from-green-400 to-teal-500", hoverColor: "hover:text-green-400" },
    { name: "Flask", icon: "devicon-flask-original text-5xl text-white", isDevicon: true, color: "from-gray-400 to-gray-600", hoverColor: "hover:text-gray-400" },
    { name: "LangChain", icon: "bx-link-alt text-5xl text-white", color: "from-yellow-400 to-orange-500", hoverColor: "hover:text-yellow-400" },
    { name: "Vector DB", icon: "bx-data text-5xl text-white", color: "from-cyan-400 to-blue-500", hoverColor: "hover:text-cyan-400" },
    { name: "ChromaDB", icon: "bx-hdd text-5xl text-white", color: "from-purple-400 to-pink-500", hoverColor: "hover:text-purple-400" },
    { name: "Pinecone", icon: "bx-search-alt text-5xl text-white", color: "from-green-400 to-emerald-500", hoverColor: "hover:text-green-400" },
    { name: "Gemini", icon: "bx-brain text-5xl text-white", color: "from-blue-400 to-purple-500", hoverColor: "hover:text-blue-400" },
  ];

  // Using actual social links from your component
  const SocialLinks = () => {
    return (
      <div className="flex justify-center space-x-6">
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/muhammad-owais-1b782b269/"
          className="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-blue-400"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxl-linkedin text-gray-300 group-hover:text-blue-400 transition-colors duration-300"></i>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            LinkedIn
          </div>
        </a>
        {/* GitHub */}
        <a
          href="https://github.com/MuhammadOwais03/"
          className="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-purple-500/20 transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-purple-400"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxl-github text-gray-300 group-hover:text-purple-400 transition-colors duration-300"></i>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            GitHub
          </div>
        </a>
        {/* Email */}
        <a
          href="mailto:owaisiqbal2021@gmail.com"
          className="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-red-500/20 transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-red-400"
          aria-label="Email"
        >
          <i className="bx bx-envelope text-gray-300 group-hover:text-red-400 transition-colors duration-300"></i>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Email
          </div>
        </a>
      </div>
    );
  };


  useEffect(() => {
    console.log(logo1)
  }, [])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 255, 198, 0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          {/* Profile Card */}
          <div className="flex flex-col items-center lg:items-center space-y-6 lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-md overflow-hidden border-4 border-gray-700 bg-gray-800">
                <Image
                  src={logo1}
                  alt="Muhammad Owais"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 text-sm bg-green-500/20 border border-green-400/50 rounded-full text-green-300 flex items-center gap-2 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Open to Work
              </span>
              <span className="px-4 py-2 text-sm bg-blue-500/20 border border-blue-400/50 rounded-full text-blue-300 flex items-center gap-2 backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Open to Collaborate
              </span>
            </div>

            {/* Social Links */}
            <SocialLinks />
          </div>

          {/* Intro Text */}
          <div className=" space-y-6">
            <div className="space-y-2">
              <h1 className="flex flex-row justify-center items-center text-2xl md:text-3xl lg:text-4xl font-bold ml-4">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ml-2">
                  {text.split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block opacity-1 animate-fadeInChar"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationDuration: '0.5s',
                        animationFillMode: 'forwards'
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light text-center">
                Computer System Engineer & Full Stack Developer
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center lg:justify-center">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                  React Developer
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                  Django Expert
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                  Full Stack
                </span>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed lg:text-justify text-center">
              <p>
                I'm a full-stack developer passionate about building <strong className="text-white">scalable, intelligent web applications</strong>. My core stack includes{" "}
                <strong className="text-purple-400">Django</strong>, <strong className="text-blue-400">React</strong>, and{" "}
                <strong className="text-green-400">Next.js</strong>, with a focus on delivering robust backend architectures and seamless user experiences.
              </p>
              <p>
                Lately, I've been diving deep into <strong className="text-yellow-400">Generative AI</strong> and <strong className="text-pink-400">LangChain</strong>, building smart applications that combine natural language understanding with real-world functionality. I'm always exploring how <strong className="text-cyan-400">AI</strong> and <strong className="text-emerald-400">Machine Learning</strong> can enhance modern development.
              </p>
            </div>


            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 item-center justify-center">
              {cvUrl && (
                <a
                  href={cvUrl}
                  className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                  target="__blank"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    📄 View CV
                  </span>
                </a>
              )}
              <a
                href="/allProjects"
                className="group relative px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gray-700/50"
              >
                <span className="relative flex items-center gap-2">
                  🚀 View Projects
                </span>
              </a>
              <a
                href="/contact"
                className="group relative px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gray-700/50"
              >
                <span className="relative flex items-center gap-2">
                  📞 Contact Me
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Here are some of the technologies I work with and love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group relative p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-15 rounded-xl transition-opacity duration-300`}></div>
                <div className="relative text-center">
                  <div className={`text-3xl mb-2 text-gray-400 group-hover:text-white transition-colors duration-300 ${skill.hoverColor}`}>
                    <i className={`bx ${skill.icon}`}></i>
                  </div>
                  <div className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700">
            <blockquote className="text-xl md:text-2xl font-light text-gray-300 italic mb-4">
              "The only way to do great work is to love what you do."
            </blockquote>
            <cite className="block text-purple-400 font-medium">— Steve Jobs</cite>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">6+</div>
              <div className="text-sm text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-sm text-gray-300">Technologies</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-sm text-gray-300">Problem Solving</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Intro;