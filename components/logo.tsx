"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './styles/logo.css';
import Image, { StaticImageData } from "next/image";
import logo from "../public/logo.png";


interface LogoProps {
  /** --- timings --- */
  fadeInDelay?: number;
  fadeOutDelay?: number;
  collapseDelay?: number;
  redirectDelay?: number;

  /** --- redirect --- */
  redirectTo?: string;
  autoRedirect?: boolean;

  /** --- visuals --- */
  backgroundColor?: string;
  logoSize?: { width: number; height: number };

  /** --- text --- */
  title?: string;
  titleSize?: string;
  gradientColors?: string;

  /** --- animation --- */
  animationDuration?: string;
  enableCollapse?: boolean;

  /** --- loading --- */
  showLoadingBar?: boolean;
  loadingDuration?: number;
  loadingBarColor?: string;
  loadingTextColor?: string;
  showLoadingLogo?: boolean;
  loadingLogoDelay?: number;

  /** --- custom classes --- */
  containerClassName?: string;
  logoClassName?: string;
  titleClassName?: string;
  loadingClassName?: string;

  /** --- callbacks (❗ all optional) --- */
  onFadeIn?: () => void;
  onFadeOut?: () => void;
  onCollapse?: () => void;
  onRedirect?: () => void;
  onLoadingComplete?: () => void;

  /** --- logo asset --- */
  logoSrc?: string | StaticImageData; 
  logoAlt?: string;
}


const Logo = ({
  // Animation timings (in milliseconds)
  fadeInDelay = 600,
  fadeOutDelay = 3500,
  collapseDelay = 5500,
  redirectDelay = 6000,
  
  // Redirect settings
  redirectTo = "/",
  autoRedirect = true,
  
  // Visual customization
  backgroundColor = "bg-black",
  logoSize = { width: 200, height: 200 },
  
  // Text customization
  title = "Muhammad Owais",
  titleSize = "text-3xl sm:text-4xl md:text-5xl",
  gradientColors = "from-purple-400 via-pink-400 to-blue-400",
  
  // Animation settings
  animationDuration = "duration-1000",
  enableCollapse = true,
  
  // Loading settings
  showLoadingBar = true,
  loadingDuration = 3000,
  loadingBarColor = "bg-gradient-to-r from-purple-500 to-pink-500",
  loadingTextColor = "text-white",
  showLoadingLogo = true,
  loadingLogoDelay = 500,
  
  // Custom styling
  containerClassName = "",
  logoClassName = "",
  titleClassName = "",
  loadingClassName = "",
  
  // Callbacks
  onFadeIn,
  onFadeOut,
  onCollapse,
  onRedirect,
  onLoadingComplete,
  
  // Custom logo
  logoSrc = logo,
  logoAlt = "MO Logo"
}: LogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(showLoadingBar);
  const [showLoadingM, setShowLoadingM] = useState(false);
  const [showLoadingO, setShowLoadingO] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Loading progress animation
    if (showLoadingBar) {
      // Show loading logo letters
      if (showLoadingLogo) {
        setTimeout(() => setShowLoadingM(true), loadingLogoDelay);
        setTimeout(() => setShowLoadingO(true), loadingLogoDelay + 600);
      }

      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            onLoadingComplete?.();
            return 100;
          }
          return prev + (100 / (loadingDuration / 50)); // Update every 50ms
        });
      }, 50);
    }

    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
      onFadeIn?.();
    }, showLoadingBar ? loadingDuration + fadeInDelay : fadeInDelay);
    
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      onFadeOut?.();
    }, showLoadingBar ? loadingDuration + fadeOutDelay : fadeOutDelay);
    
    const collapseTimer = enableCollapse ? setTimeout(() => {
      setIsCollapsed(true);
      onCollapse?.();
    }, showLoadingBar ? loadingDuration + collapseDelay : collapseDelay) : null;
    
    const redirectTimer = autoRedirect ? setTimeout(() => {
      onRedirect?.();
      router.push(redirectTo);
    }, showLoadingBar ? loadingDuration + redirectDelay : redirectDelay) : null;

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      if (collapseTimer) clearTimeout(collapseTimer);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [
    fadeInDelay, fadeOutDelay, collapseDelay, redirectDelay,
    autoRedirect, redirectTo, router, enableCollapse,
    onFadeIn, onFadeOut, onCollapse, onRedirect,
    showLoadingBar, loadingDuration, onLoadingComplete,
    showLoadingLogo, loadingLogoDelay
  ]);

  return (
    <div 
      className={`apna flex justify-center items-center h-screen ${backgroundColor} transition-all ${animationDuration} ${
        isCollapsed ? 'collapsed' : ''
      } ${containerClassName}`}
    >
      {/* Loading Screen */}
      {isLoading && (
        <div className={`fixed inset-0 flex flex-col justify-center items-center ${backgroundColor} z-50`}>
          {/* Animated MO Logo during loading */}
          {showLoadingLogo && (
            <div className="mb-12">
              <div className="flex items-center gap-4 justify-center">
                {/* M Letter */}
                <div className="relative">
                  <div
                    className={`
                      text-8xl font-black tracking-wider transition-all duration-1000 ease-out
                      ${showLoadingM ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'}
                    `}
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(147,51,234,0.5))'
                    }}
                  >
                    M
                  </div>
                  {/* M Glow effect */}
                  <div
                    className={`absolute inset-0 text-8xl font-black tracking-wider blur-sm opacity-50 animate-pulse ${showLoadingM ? 'block' : 'hidden'}`}
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    M
                  </div>
                </div>

                {/* O Letter */}
                <div className="relative">
                  <div
                    className={`
                      text-8xl font-black tracking-wider transition-all duration-1000 ease-out
                      ${showLoadingO ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}
                    `}
                    style={{
                      background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.5))'
                    }}
                  >
                    O
                  </div>
                  {/* O Glow effect */}
                  <div
                    className={`absolute inset-0 text-8xl font-black tracking-wider blur-sm opacity-50 animate-pulse ${showLoadingO ? 'block' : 'hidden'}`}
                    style={{
                      background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    O
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Progress */}
          <div className="w-80 max-w-md mx-auto">
            {/* Loading Bar Container */}
            <div className="relative mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${loadingBarColor} transition-all duration-100 ease-out rounded-full`}
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              {/* Glowing effect */}
              <div 
                className={`absolute top-0 h-full ${loadingBarColor} blur-sm opacity-50 transition-all duration-100 ease-out rounded-full`}
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            {/* Percentage Display */}
            <div className={`text-center ${loadingTextColor} font-mono text-lg font-bold ${loadingClassName}`}>
              {Math.round(loadingProgress)}%
            </div>
            
            {/* Loading Text */}
            <div className={`text-center ${loadingTextColor} text-sm mt-2 opacity-70`}>
              Loading...
            </div>
          </div>
        </div>
      )}

      {/* Main Logo Content - Fixed visibility logic */}
      <div
        className={`transition-opacity ${animationDuration} ${
          isFadingOut ? 'opacity-0' : ''
        } ${isLoading ? 'hidden' : 'block'}`}
        style={{ 
          opacity: isVisible && !isLoading ? 1 : 0,
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoSize.width}
          height={logoSize.height}
          className={`mx-auto drop-shadow-lg ${logoClassName}`}
        />
        <h1 
          className={`mt-6 ${titleSize} font-bold text-center ${titleClassName}`}
          style={{
            fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: '#ffffff', // Fallback color for browsers that don't support gradient text
            textShadow: '0 0 30px rgba(147,51,234,0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            zIndex: 10,
            position: 'relative'
          }}
        >
          <span style={{ fontWeight: '200' }}>Muhammad</span>
          <br />
          <span style={{ fontWeight: '600', letterSpacing: '0.1em' }}>Owais</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;