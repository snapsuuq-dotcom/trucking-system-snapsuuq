import { Truck } from 'lucide-react';

const Logo = ({ className = "h-8 w-8", showText = false, textClassName = "text-2xl" }) => {
  // Try to load the Snapsuuq logo, fallback to truck icon
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="/snapsuuq-logo.png" 
        alt="Snapsuuq Logo" 
        className={className}
        onError={(e) => {
          // Fallback to truck icon if image not found
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <Truck className={`${className} text-primary hidden`} />
      {showText && (
        <span className={`font-bold text-primary ${textClassName}`}>Snapsuuq</span>
      )}
    </div>
  );
};

export default Logo;


