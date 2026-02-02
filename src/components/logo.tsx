
import { useState, memo } from "react";

// Import the logo files directly
import darkLogo from "/public/assets/images/logo-dark.png";
import lightLogo from "/public/assets/images/logo-light.png";

// Ensures proper sizing, day/night mode support, optimized for header
// Uses CSS-driven theme switching for instant, reliable logo swapping
export const Logo = memo(({ className = "" }: { className?: string }) => {
  const [logoError, setLogoError] = useState(false);

  const handleImageError = () => {
    console.error("Logo image failed to load");
    setLogoError(true);
  };

  if (logoError) {
    // Fallback to text if logo fails to load
    return (
      <span 
        className={`text-2xl font-bold ${className}`}
        style={{fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"}}
      >
        Gaapio
      </span>
    );
  }

  const logoStyle = {
    height: window.innerWidth <= 640 ? '72px' : '96px',
    width: 'auto',
    maxHeight: 'none',
    maxWidth: 'none'
  };

  return (
    <div className={`logo-container ${className}`}>
      {/* Light logo - visible in light mode, hidden in dark mode */}
      <img
        src={lightLogo}
        alt="Gaapio Logo - AI-Powered Technical Accounting Platform"
        className="logo-image block dark:hidden"
        style={logoStyle}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        draggable={false}
        onError={handleImageError}
      />
      {/* Dark logo - hidden in light mode, visible in dark mode */}
      <img
        src={darkLogo}
        alt="Gaapio Logo - AI-Powered Technical Accounting Platform"
        className="logo-image hidden dark:block"
        style={logoStyle}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        draggable={false}
        onError={handleImageError}
      />
    </div>
  );
});
Logo.displayName = 'Logo';
