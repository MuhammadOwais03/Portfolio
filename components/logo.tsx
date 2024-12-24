"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import './styles/logo.css'; // Import the CSS file

const Logo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false); // Track fading out state
    const [isCollapsed, setIsCollapsed] = useState(false); // Track when apna should collapse height
    const router = useRouter(); // Initialize Next.js router

    useEffect(() => {
        // Timer to trigger fade-in effect
        const fadeInTimer = setTimeout(() => {
            setIsVisible(true);
        }, 600); // Delay before the animation starts

        // Timer to start fade-out after logo is visible
        const fadeOutTimer = setTimeout(() => {
            setIsFadingOut(true); // Start fading out after 3 seconds
        }, 3500); // Fade-out after logo is visible for 3 seconds

        // Timer to collapse the .apna height after the fade-out completes
        const collapseTimer = setTimeout(() => {
            setIsCollapsed(true); // Collapse the container after fade-out
        }, 5500); // Adjusted timing for smooth collapse after fade-out

        // Timer to redirect to home page after the fade-out completes
        const redirectTimer = setTimeout(() => {
            router.push("/"); // Navigate to home page after the fade-out completes
        }, 6000); // Redirect to home after 6 seconds

        // Cleanup timers on component unmount
        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(fadeOutTimer);
            clearTimeout(collapseTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <div className={`apna ${isCollapsed ? 'collapsed' : ''}`}>
            <h1
                className={`logo-1 logo ${isFadingOut ? "fadeOut" : ""}`}
                style={{ opacity: isVisible ? 1 : 0 }}
            >
                Muhammad Owais
            </h1>
        </div>
    );
};

export default Logo;
