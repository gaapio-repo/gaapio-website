import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const AnimatedMemo = () => {
  const { width } = useWindowSize();
  const memoContainerRef = useRef<HTMLDivElement>(null);
  const typedElementRef = useRef<HTMLDivElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Text sizing now handled via clamp() in CSS, no scale transform needed

  // All positioning is relative to the background image (percentages)
  // This ensures the text animation aligns with the memo content area
  // regardless of screen size
  
  // Top position: where the memo content starts (percentage of image height)
  const getTopPosition = () => {
    if (width < 768) return "24%"; // mobile
    if (width < 1024) return "33%"; // tablets (768-1023)
    if (width < 1280) return "34%"; // medium (1024-1279)
    if (width < 1400) return "36%"; // intermediate (1280-1399) - pushed down
    if (width < 1600) return "30%"; // large-ish (1400-1599)
    return "24%"; // xl screens 1600+
  };
  
  // Left position: where the main content column starts in the image
  const getLeftPosition = () => "25%";
  
  // Right position: right edge of the memo content area
  const getRightPosition = () => "-30%";
  
  // Height of the text area (percentage of remaining space)
  const getTextAreaHeight = () => "68%";

  // Get max width based on screen width - responsive sizing
  const getMaxWidth = () => {
    if (width < 768) return "100%";
    if (width < 1024) return "min(95vw, 600px)";
    if (width < 1280) return "min(50vw, 650px)";
    if (width < 1600) return "min(48vw, 800px)";
    return "min(45vw, 900px)";
  };

  // Apply theme styles directly using JavaScript
  const applyThemeStyles = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    if (memoContainerRef.current) {
      memoContainerRef.current.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#ffffff";
      memoContainerRef.current.style.borderColor = isDarkMode ? "#333333" : "#e5e7eb";
      memoContainerRef.current.style.boxShadow = isDarkMode 
        ? "0 0 15px rgba(255,255,255,0.05)" 
        : "0 0 15px rgba(0,0,0,0.1)";
    }
  };

  useEffect(() => {
    // Apply theme once when component mounts
    applyThemeStyles();
    
    // Simulate loading delay - reduced to 100ms for faster initial display
    const timer = setTimeout(() => {
      setLoaded(true);
      
      // Initialize typed.js after loading delay with slower typing speed for better typewriter effect
      if (typedElementRef.current) {
        typedInstanceRef.current = new Typed(typedElementRef.current, {
          strings: [
            '<p><strong>ASC 606 ACCOUNTING MEMO</strong></p>\n<p><strong>1. Background</strong><br />The Company delivers bundled goods and services across multiple contracts, including software, implementation support, and optional renewal terms. The performance obligations may be distinct or combined depending on integration level.</p>\n\n<p><strong>2. Scope / Purpose</strong><br />This memo evaluates whether the Company\'s revenue recognition practices are in compliance with ASC 606, specifically in relation to bundled offerings that span software licensing, service delivery, and customer training components.</p>\n\n<p><strong>3. Accounting Guidance</strong><br />ASC 606-10-25-1 through 25-5 provides the framework for identifying performance obligations and determining when control transfers. This guidance mandates an evaluation of the contract terms, delivery mechanisms, and whether standalone value exists.</p>\n\n<p><strong>4. Analysis</strong><br />Based on the five-step revenue recognition model, each contract was reviewed to determine whether obligations are distinct. In most cases, software licenses are transferred at a point in time, while services are delivered over time under a separate obligation.</p>\n\n<p><strong>5. Conclusion</strong><br />The Company\'s revenue accounting treatment aligns with ASC 606, as performance obligations are properly identified, transaction prices allocated, and revenue is recognized at the appropriate time based on delivery and control transfer criteria.</p>\n\n<p><strong>6. Financial Statement Impact</strong><br />The Company expects to recognize approximately $2.4M in Q4 FY25 related to bundled contracts, with roughly 80% of this revenue allocated to point-in-time obligations and the remainder deferred and recognized over the service term.</p>\n\n<p><strong>7. Disclosures</strong><br />Footnote 12 in the Company\'s financial statements will be updated to reflect enhanced revenue recognition disclosures, including timing, methods of recognition, and segmentation of contract components under ASC 606.</p>'
          ],
          typeSpeed: .5,
          backSpeed: 0,
          showCursor: true,
          cursorChar: '|',
          loop: false,
          contentType: 'html'
        });
      }
    }, 100);
    
    // Set up observer to watch for theme changes
    const observer = new MutationObserver(() => {
      applyThemeStyles();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Listen for storage events (for theme changes from other tabs)
    const handleStorageEvent = () => {
      applyThemeStyles();
    };
    
    window.addEventListener('storage', handleStorageEvent);
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('storage', handleStorageEvent);
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="memo-animation-container"
      style={{
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div
        ref={memoContainerRef}
        className={`memo-card-right ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          borderColor: isDark ? "#333333" : "#e5e7eb",
          boxShadow: isDark 
            ? "0 0 15px rgba(255,255,255,0.05)" 
            : "0 0 15px rgba(0,0,0,0.1)",
          maxWidth: getMaxWidth(),
          width: "100%",
          border: "1px solid",
          borderRadius: "8px",
          position: "relative",
          transformOrigin: "center"
        }}
      >
        <img 
          src={isDark ? "/assets/images/gaapio-app-dark.png" : "/assets/images/gaapio-app.png"}
          alt="Gaapio Revenue Recognition UI"
          className="memo-background-image"
          loading="eager"
          fetchPriority="high"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            borderRadius: "8px"
          }}
        />
        
        <div 
          className="memo-text-overlay"
          style={{
            position: "absolute",
            top: getTopPosition(),
            left: getLeftPosition(),
            right: getRightPosition(),
            textAlign: "left",
            lineHeight: "1.2",
            zIndex: 10,
            height: getTextAreaHeight(),
            display: "flex",
            alignItems: "flex-start",
            overflow: "hidden"
          }}
        >
        <div 
          ref={typedElementRef}
          className="memo-text"
          style={{
            color: isDark ? '#FFFFFF' : '#333',
            backgroundColor: isDark ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
            padding: '4px',
            borderRadius: '4px',
            width: '300%',
            fontSize: '12px',
            transform: 'scale(0.62)',
            transformOrigin: 'top left',
            whiteSpace: 'pre-wrap',
            overflow: 'hidden'
          }}
        ></div>
        </div>
      </div>
    </div>
  );
};
