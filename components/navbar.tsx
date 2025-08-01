"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.navbar')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    const navItems = [
        { href: "/home", icon: "bx-home", text: "Home" },
        { href: "/allProjects", icon: "bx-folder", text: "Projects" },
        { href: "/contact", icon: "bx-envelope", text: "Contact" }
    ];

    return (
        <>
            {/* Fixed Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700/50' 
                    : 'bg-gray-900/80 backdrop-blur-sm'
            }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <a 
                                href="/home" 
                                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
                            >
                                Muhammad Owais
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="group flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                                    >
                                        <i className={`bx ${item.icon} text-lg group-hover:text-purple-400 transition-colors duration-300`}></i>
                                        <span className="font-medium">{item.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <i className={`bx text-xl transition-transform duration-300 ${
                                        isMenuOpen 
                                            ? 'bx-x rotate-180' 
                                            : 'bx-menu rotate-0'
                                    }`}></i>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                        ? 'max-h-64 opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50">
                        <div className="px-4 py-3 space-y-1">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                                >
                                    <i className={`bx ${item.icon} text-xl group-hover:text-purple-400 transition-colors duration-300`}></i>
                                    <span className="font-medium">{item.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from being hidden behind fixed navbar */}
            <div className="h-16"></div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMenu}
                ></div>
            )}
        </>
    );
};

export default Navbar;