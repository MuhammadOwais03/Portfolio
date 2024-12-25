"use client";
import Logo from '../../components/logo';
import Intro from '../../components/Intro';
import Navbar from '../../components/navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Make Intro component visible after 7 seconds
      router.push('/home'); // Navigate to the home page
    }, 7500); // 7500ms = 7.5 seconds

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  return (
    <div className="relative">
      <Logo />

      {isVisible && (
        <>
          <Navbar />
        </>
      )}
      {/* Render Navbar only when isVisible is true */}
    </div>
  );
};

export default HomePage;
