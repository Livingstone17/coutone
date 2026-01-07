// src/components/avatars/MaleAvatar.tsx
interface MaleAvatarProps {
    topColor: string;
    bottomColor: string;
    shoesColor: string;
    accessoryColor: string;
    skinColor?: string;
  }
  
  export function MaleAvatar({
    topColor,
    bottomColor,
    shoesColor,
    accessoryColor,
    skinColor = '#D2B48C',
  }: MaleAvatarProps) {
    return (
      <svg
        viewBox="0 0 200 400"
        className="w-full max-w-xs mx-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Head */}
        <circle cx="100" cy="60" r="28" fill={skinColor} />
  
        {/* Torso (top) */}
        <path
          d="M85,88 
             Q100,110 115,88 
             L110,180 
             Q100,190 90,180 
             Z"
          fill={topColor}
        />
  
        {/* Legs (bottom) */}
        <path d="M90,180 L95,280 L85,280 Z" fill={bottomColor} />
        <path d="M110,180 L115,280 L105,280 Z" fill={bottomColor} />
  
        {/* Shoes */}
        <rect x="80" y="280" width="20" height="8" fill={shoesColor} rx="2" />
        <rect x="100" y="280" width="20" height="8" fill={shoesColor} rx="2" />
  
        {/* Accessory: watch on wrist (right arm implied) */}
        <circle cx="120" cy="160" r="6" fill={accessoryColor} />
      </svg>
    );
  }