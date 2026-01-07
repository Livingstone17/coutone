// import { COLOR_NAME_MAP, getColorNameFromHex } from './colorCodes';
// import { labColorDistance, hexToLab } from './colorUtils';


// export interface ColorMatch {
//     color: string;
//     name: string;
//     description: string;
//   }
  
//   // Generate visually harmonious colors dynamically
//   export const getHarmonyColors = (topColor: string): {
//     bottoms: ColorMatch[];
//     shoes: ColorMatch[];
//     accessories: ColorMatch[];
//   } => {
//     const topLab = hexToLab(topColor);
  
//     // Convert COLOR_NAME_MAP to array with distance
//     const allMatches: ColorMatch[] = Object.entries(COLOR_NAME_MAP)
//       .map(([hex, name]) => ({
//         color: hex,
//         name,
//         description: `Matches well with ${name}`,
//         distance: labColorDistance(topLab, hexToLab(hex)),
//       }))
//       .sort((a, b) => a.distance - b.distance); // Closest first
  
//     // Slice into sections
//     return {
//       bottoms: allMatches.slice(0, 5),
//       shoes: allMatches.slice(5, 10),
//       accessories: allMatches.slice(10, 14),
//     };
//   };
  
//   // Compatibility: inverse of LAB distance
//   export const calculateCompatibility = (hex1: string, hex2: string) => {
//     const d = labColorDistance(hexToLab(hex1), hexToLab(hex2));
//     return Math.max(0, Math.round(100 - d)); // 0-100 scale
//   };
  
//   // Compatibility levels
//   export const getCompatibilityLevel = (score: number) => {
//     if (score > 80) return { label: 'High', color: '#16A34A' };
//     if (score > 50) return { label: 'Medium', color: '#FBBF24' };
//     return { label: 'Low', color: '#DC2626' };
//   };