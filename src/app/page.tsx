"use client"
import Logo from '../../components/logo';
import Intro from '../../components/Intro';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);  // Make Intro component visible after 7 seconds
    }, 7500);  // 7000ms = 7 seconds

    return () => clearTimeout(timer);  // Cleanup the timer when the component unmounts
  }, []);

  return (
    <div className="relative">
      <Logo />

      {isVisible && (
        <>
          
          <Navbar />
          <Intro />
        </>
      )
      } {/* Render Intro only when isVisible is true */}

    </div>
  );
};

export default HomePage;
