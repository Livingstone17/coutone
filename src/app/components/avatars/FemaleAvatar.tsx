// src/components/avatars/FemaleAvatar.tsx
interface FemaleAvatarProps {
  topColor: string;
  bottomColor: string;
  shoesColor: string;
  accessoryColor: string;
  skinColor?: string;
}

export function FemaleAvatar({
  topColor,
  bottomColor,
  shoesColor,
  accessoryColor,
  skinColor = '#D2B48C',
}: FemaleAvatarProps) {
  return (
    <svg
      viewBox="0 0 200 400"
      className="w-full max-w-xs mx-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Head */}
      <circle cx="100" cy="60" r="28" fill={skinColor} />

      {/* Torso (top with waist curve) */}
      <path
        d="M80,88 
           Q100,105 120,88 
           L115,170 
           Q100,185 85,170 
           Z"
        fill={topColor}
      />

      {/* Skirt or pants (flowing bottom) */}
      <path
        d="M85,170 
           Q90,220 85,280 
           Q100,290 115,280 
           Q110,220 115,170 
           Z"
        fill={bottomColor}
      />

      {/* Shoes */}
      <ellipse cx="95" cy="292" rx="10" ry="5" fill={shoesColor} />
      <ellipse cx="105" cy="292" rx="10" ry="5" fill={shoesColor} />

      {/* Necklace */}
      <circle cx="100" cy="140" r="8" fill={accessoryColor} />
      <circle cx="100" cy="140" r="3" fill={skinColor} />
    </svg>
  );
}