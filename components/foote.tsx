import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons

const Foote = () => {
  return (
    <footer className="bg-black text-white rounded-lg shadow-sm m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-5 flex flex-col items-center">
        {/* Copyright Text */}
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            Muhammad Owais
          </a>
          . All Rights Reserved.
        </span>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-2">
          <a href="https://github.com/MuhammadOwais03/" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-400 hover:text-white text-xl" />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-owais-1b782b269/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-400 hover:text-white text-xl" />
          </a>
          <a href="mailto:owaisiqbal2021@gmail.com">
            <FaEnvelope className="text-gray-400 hover:text-white text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Foote;
