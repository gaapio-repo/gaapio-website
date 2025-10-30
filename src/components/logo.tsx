
import { useState, memo } from "react";
import { useTheme } from "./theme-toggle";

// Import the logo files directly
import darkLogo from "/public/assets/images/logo-dark.png";
import lightLogo from "/public/assets/images/logo-light.png";

// Ensures proper sizing, day/night mode support, optimized for header
export const Logo = memo(({ className = "" }: { className?: string }) => {
  const { theme } = useTheme();
  const [logoError, setLogoError] = useState(false);
  
  const isDark = theme === "dark";

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

  return (
    <div className={`logo-container ${className}`}>
      <img
        src={isDark ? darkLogo : lightLogo}
        alt="Gaapio Logo - AI-Powered Accounting Memo Platform"

        className="logo-image"
        style={{
          height: window.innerWidth <= 640 ? '72px' : '96px',
          width: 'auto',
          maxHeight: 'none',
          maxWidth: 'none'
        }}

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
