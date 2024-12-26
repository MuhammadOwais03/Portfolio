"use client";
import "./styles/navbar.css";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`navbar ${isMenuOpen ? "active" : ""}`}>
            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
                <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`} style={styles.icon}></i>
            </div>

            {/* Navbar Links */}
            <div className={`links-container ${isMenuOpen ? "active" : ""}`}>
                <a href="/home"><i className="icon bx bx-home" style={styles.icon} title="Home"></i><span>Home</span></a>
                <a href="/projects"><i className="icon bx bx-folder" style={styles.icon} title="Projects"></i><span>Projects</span></a>
                <a href="/contact"><i className="icon bx bx-envelope" style={styles.icon} title="Contact"></i><span>Contact</span></a>
            </div>
        </div>
    );
};

const styles = {
    icon: {
        fontSize: '20px',
        cursor: 'pointer',
        transition: 'transform 0.3s, color 0.3s',
    },
};

export default Navbar;
