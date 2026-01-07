// import { ArrowLeft } from 'lucide-react';
// import { Button } from './ui/button';
// import { useState } from 'react';
// import { calculateCompatibility, getCompatibilityLevel } from '../utils/colorCompatibility';
// import { Info } from 'lucide-react';
// import { getMatchingColors } from '../utils/outfitSuggestions';

// interface ColorMatch {
//   color: string;
//   name: string;
//   description: string;
// }

// interface MatchingResultsScreenProps {
//   onBack: () => void;
//   selectedColor: string;
//   colorName: string;
//   clothingType: string;
//   onViewOutfit: (matches: { top: ColorMatch; bottom: ColorMatch; shoes: ColorMatch; accessory: ColorMatch }) => void;
//   // onViewOutfit: (outfit: Omit<Outfit, 'dateSaved'>) => void;
// }

// export function MatchingResultsScreen({
//   onBack,
//   selectedColor,
//   colorName,
//   clothingType,
//   onViewOutfit,
// }: MatchingResultsScreenProps) {
//   const matches = getMatchingColors(selectedColor, 'unisex');
//   const [selectedBottom, setSelectedBottom] = useState(matches.bottoms[0]);
//   const [selectedShoes, setSelectedShoes] = useState(matches.shoes[0]);
//   const [selectedAccessory, setSelectedAccessory] = useState(matches.accessories[0]);

//   const handleViewOutfit = () => {
//     onViewOutfit({
//       top: { color: selectedColor, name: colorName, description: clothingType },
//       bottom: selectedBottom,
//       shoes: selectedShoes,
//       accessory: selectedAccessory,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-stone-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-white border-b border-stone-200 px-4 py-4">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors mb-3"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back</span>
//         </button>
//         <div className="flex items-center gap-3">
//           <div
//             className="w-10 h-10 rounded-full border-2 border-stone-200"
//             style={{ backgroundColor: selectedColor }}
//           />
//           <div>
//             <h2 className="text-lg text-stone-800">{colorName} {clothingType}</h2>
//             <p className="text-sm text-stone-500">Matching suggestions</p>
//           </div>
//         </div>
//       </div>

//       {/* Results */}
//       <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 pb-24">
//         {/* Info Banner */}
//         <div className="bg-gradient-to-r from-stone-100 to-stone-50 rounded-2xl p-4 flex gap-3 items-start border border-stone-200">
//           <Info className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm text-stone-700 mb-1">Color Compatibility Score</p>
//             <p className="text-xs text-stone-500">
//               Percentages show how well colors match based on color theory, contrast, and harmony. Higher scores mean better combinations!
//             </p>
//           </div>
//         </div>

//         {/* Bottoms Section */}
//         <div className="space-y-4">
//           <h3 className="text-stone-700 pl-1">Pants / Skirt</h3>
//           <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
//             {matches.bottoms.map((match, idx) => {
//               const compatibility = calculateCompatibility(selectedColor, match.color);
//               const compatLevel = getCompatibilityLevel(compatibility);
              
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedBottom(match)}
//                   className={`flex-shrink-0 w-40 bg-white rounded-2xl p-4 shadow-sm transition-all ${
//                     selectedBottom.name === match.name
//                       ? 'ring-2 ring-stone-800 scale-105'
//                       : 'hover:shadow-md'
//                   }`}
//                 >
//                   <div className="relative">
//                     <div
//                       className="w-full h-20 rounded-xl mb-3"
//                       style={{ backgroundColor: match.color }}
//                     />
//                     <div
//                       className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-sm"
//                       style={{ color: compatLevel.color }}
//                     >
//                       {compatibility}%
//                     </div>
//                   </div>
//                   <h4 className="text-sm text-stone-800 mb-1">{match.name}</h4>
//                   <p className="text-xs text-stone-500 line-clamp-2">{match.description}</p>
//                   <div className="mt-2 flex items-center gap-1">
//                     <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full transition-all"
//                         style={{
//                           width: `${compatibility}%`,
//                           backgroundColor: compatLevel.color,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Shoes Section */}
//         <div className="space-y-4">
//           <h3 className="text-stone-700 pl-1">Shoes</h3>
//           <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
//             {matches.shoes.map((match, idx) => {
//               const compatibility = calculateCompatibility(selectedColor, match.color);
//               const compatLevel = getCompatibilityLevel(compatibility);
              
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedShoes(match)}
//                   className={`flex-shrink-0 w-40 bg-white rounded-2xl p-4 shadow-sm transition-all ${
//                     selectedShoes.name === match.name
//                       ? 'ring-2 ring-stone-800 scale-105'
//                       : 'hover:shadow-md'
//                   }`}
//                 >
//                   <div className="relative">
//                     <div
//                       className="w-full h-20 rounded-xl mb-3 border border-stone-200"
//                       style={{ backgroundColor: match.color }}
//                     />
//                     <div
//                       className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-sm"
//                       style={{ color: compatLevel.color }}
//                     >
//                       {compatibility}%
//                     </div>
//                   </div>
//                   <h4 className="text-sm text-stone-800 mb-1">{match.name}</h4>
//                   <p className="text-xs text-stone-500 line-clamp-2">{match.description}</p>
//                   <div className="mt-2 flex items-center gap-1">
//                     <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full transition-all"
//                         style={{
//                           width: `${compatibility}%`,
//                           backgroundColor: compatLevel.color,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Accessories Section */}
//         <div className="space-y-4">
//           <h3 className="text-stone-700 pl-1">Accessories</h3>
//           <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
//             {matches.accessories.map((match, idx) => {
//               const compatibility = calculateCompatibility(selectedColor, match.color);
//               const compatLevel = getCompatibilityLevel(compatibility);
              
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedAccessory(match)}
//                   className={`flex-shrink-0 w-40 bg-white rounded-2xl p-4 shadow-sm transition-all ${
//                     selectedAccessory.name === match.name
//                       ? 'ring-2 ring-stone-800 scale-105'
//                       : 'hover:shadow-md'
//                   }`}
//                 >
//                   <div className="relative">
//                     <div
//                       className="w-full h-20 rounded-xl mb-3 border border-stone-200"
//                       style={{ backgroundColor: match.color }}
//                     />
//                     <div
//                       className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-sm"
//                       style={{ color: compatLevel.color }}
//                     >
//                       {compatibility}%
//                     </div>
//                   </div>
//                   <h4 className="text-sm text-stone-800 mb-1">{match.name}</h4>
//                   <p className="text-xs text-stone-500 line-clamp-2">{match.description}</p>
//                   <div className="mt-2 flex items-center gap-1">
//                     <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
//                       <div
//                         className="h-full rounded-full transition-all"
//                         style={{
//                           width: `${compatibility}%`,
//                           backgroundColor: compatLevel.color,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Fixed Bottom Button */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-4">
//         <Button
//           onClick={handleViewOutfit}
//           className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white"
//         >
//           View Outfit Preview
//         </Button>
//       </div>
//     </div>
//   );
// }


// src/components/MatchingResultsScreen.tsx
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { calculateCompatibility, getCompatibilityLevel } from '../utils/colorCompatibility';
import { Info } from 'lucide-react';
import { BaseItem } from '../App';
import { hexToHsl, hslToHex, normalizeHue, classifyColor } from '../utils/colorUtils';

interface ColorMatch {
  color: string;
  name: string;
  description: string;
}

interface MatchingResultsScreenProps {
  onBack: () => void;
  baseItem: BaseItem;
  startingPoint: 'top' | 'bottom' | 'shoes' | 'accessory';
  onViewOutfit: (matches: {
    top: ColorMatch;
    bottom: ColorMatch;
    shoes: ColorMatch;
    accessory: ColorMatch;
  }) => void;
}

const getMatchingColors = (
  baseColor: string,
  fixedCategory: 'top' | 'bottom' | 'shoes' | 'accessory'
): {
  tops: ColorMatch[];
  bottoms: ColorMatch[];
  shoes: ColorMatch[];
  accessories: ColorMatch[];
} => {
  const baseHsl = hexToHsl(baseColor);
  const { isNeutral, isVibrant, isPastel } = classifyColor(baseHsl);
  const { h, s, l } = baseHsl;

  // Helper: create ColorMatch from HSL
  const makeColor = (hsl: { h: number; s: number; l: number }, name: string, desc: string): ColorMatch => ({
    color: hslToHex(hsl.h, hsl.s, hsl.l),
    name,
    description: desc,
  });

  // Deduplicate helper
  const uniqueByColor = (arr: ColorMatch[]) => {
    const seen = new Set<string>();
    return arr.filter(item => {
      if (seen.has(item.color)) return false;
      seen.add(item.color);
      return true;
    });
  };

  // Fallback neutral options
  const fallbacks = {
    top: makeColor({ h: 0, s: 0, l: 95 }, 'White', 'Clean and versatile'),
    bottom: makeColor({ h: 0, s: 0, l: 30 }, 'Charcoal', 'Professional and timeless'),
    shoes: makeColor({ h: 0, s: 0, l: 15 }, 'Black Shoes', 'Goes with everything'),
    accessory: makeColor({ h: 0, s: 0, l: 75 }, 'Silver', 'Sleek and modern'),
  };

  // Generate palette options
  const palettes = {
    complementary: normalizeHue(h + 180),
    analogous1: normalizeHue(h - 30),
    analogous2: normalizeHue(h + 30),
    triadic1: normalizeHue(h + 120),
    triadic2: normalizeHue(h + 240),
    monoDark: { h, s, l: Math.max(20, l - 20) },
    monoLight: { h, s, l: Math.min(80, l + 20) },
  };

  // Build suggestions
  let tops: ColorMatch[] = [];
  let bottoms: ColorMatch[] = [];
  let shoes: ColorMatch[] = [];
  let accessories: ColorMatch[] = [];

  // Shoes: practical neutrals
  shoes.push(
    makeColor({ h: 0, s: 0, l: 15 }, 'Black Shoes', 'Goes with everything'),
    makeColor({ h: 0, s: 0, l: 95 }, 'White Sneakers', 'Fresh and modern'),
    makeColor({ h: 30, s: 40, l: 30 }, 'Brown Leather', 'Classic and refined'),
    makeColor({ h: 220, s: 30, l: 35 }, 'Navy Loafers', 'Polished appearance')
  );

  // Accessories: metallics + neutrals
  accessories.push(
    makeColor({ h: 0, s: 0, l: 75 }, 'Silver', 'Sleek and contemporary'),
    makeColor({ h: 60, s: 100, l: 50 }, 'Gold', 'Elegant and warm'),
    makeColor({ h: 40, s: 25, l: 60 }, 'Tan Leather', 'Natural and versatile')
  );

  // Tops & Bottoms: dynamic logic
  if (isVibrant) {
    bottoms.push(
      makeColor({ h: palettes.complementary, s: Math.min(40, s * 0.7), l: 40 }, 'Complementary', 'Bold contrast'),
      makeColor({ h: palettes.analogous1, s: s * 0.6, l: 50 }, 'Analogous 1', 'Harmonious pairing'),
      makeColor({ h: 0, s: 0, l: 15 }, 'Black', 'Classic neutral'),
      makeColor({ h: 220, s: 30, l: 35 }, 'Navy', 'Timeless choice')
    );

    tops.push(
      makeColor({ h: palettes.complementary, s: Math.min(40, s * 0.7), l: 40 }, 'Complementary', 'Bold contrast'),
      makeColor({ h: palettes.analogous2, s: s * 0.6, l: 50 }, 'Analogous 2', 'Harmonious pairing'),
      makeColor({ h: 0, s: 0, l: 95 }, 'White', 'Crisp and clean'),
      makeColor({ h: 40, s: 25, l: 60 }, 'Beige', 'Soft neutral')
    );

  } else if (isPastel) {
    bottoms.push(
      makeColor({ h: palettes.analogous1, s: s, l: Math.min(70, l + 10) }, 'Soft Analog', 'Gentle harmony'),
      makeColor({ h: palettes.analogous2, s: s, l: Math.min(70, l + 10) }, 'Warm Analog', 'Natural flow'),
      makeColor({ h: 40, s: 25, l: 60 }, 'Khaki', 'Casual and light'),
      makeColor({ h: 0, s: 0, l: 90 }, 'Light Gray', 'Subtle backdrop')
    );

    tops.push(
      makeColor({ h: palettes.analogous1, s: s, l: Math.min(70, l + 10) }, 'Soft Analog', 'Gentle harmony'),
      makeColor({ h: palettes.monoLight.h, s: palettes.monoLight.s, l: palettes.monoLight.l }, 'Lighter Tone', 'Tonal elegance'),
      makeColor({ h: 0, s: 0, l: 100 }, 'White', 'Fresh and airy'),
      makeColor({ h: 220, s: 20, l: 70 }, 'Light Blue', 'Calm and cool')
    );

  } else {
    bottoms.push(
      makeColor({ h: palettes.monoDark.h, s: palettes.monoDark.s, l: palettes.monoDark.l }, 'Darker Tone', 'Sophisticated depth'),
      makeColor({ h: palettes.monoLight.h, s: palettes.monoLight.s, l: palettes.monoLight.l }, 'Lighter Tone', 'Soft contrast'),
      makeColor({ h: 30, s: 40, l: 30 }, 'Brown', 'Earthy warmth'),
      makeColor({ h: 0, s: 0, l: 15 }, 'Black', 'Timeless staple')
    );

    tops.push(
      makeColor({ h: palettes.monoDark.h, s: palettes.monoDark.s, l: palettes.monoDark.l }, 'Darker Tone', 'Sophisticated depth'),
      makeColor({ h: palettes.triadic1, s: 50, l: 60 }, 'Accent Color', 'Subtle pop'),
      makeColor({ h: 0, s: 0, l: 95 }, 'Off-White', 'Clean and soft'),
      makeColor({ h: 220, s: 30, l: 35 }, 'Navy', 'Classic pairing')
    );
  }

  // Deduplicate and ensure non-empty
  tops = uniqueByColor(tops).slice(0, 5);
  bottoms = uniqueByColor(bottoms).slice(0, 5);
  shoes = uniqueByColor(shoes).slice(0, 4);
  accessories = uniqueByColor(accessories).slice(0, 4);

  // Ensure at least one option
  const ensureNonEmpty = (arr: ColorMatch[], fallback: ColorMatch) => 
    arr.length > 0 ? arr : [fallback];

  return {
    tops: fixedCategory === 'top' ? [] : ensureNonEmpty(tops, fallbacks.top),
    bottoms: fixedCategory === 'bottom' ? [] : ensureNonEmpty(bottoms, fallbacks.bottom),
    shoes: fixedCategory === 'shoes' ? [] : ensureNonEmpty(shoes, fallbacks.shoes),
    accessories: fixedCategory === 'accessory' ? [] : ensureNonEmpty(accessories, fallbacks.accessory),
  };
};

export function MatchingResultsScreen({
  onBack,
  baseItem,
  startingPoint,
  onViewOutfit,
}: MatchingResultsScreenProps) {
  // ✅ Corrected: removed extra 'unisex' argument
  const matches = getMatchingColors(baseItem.color, startingPoint);

  const [selectedTop, setSelectedTop] = useState<ColorMatch>(matches.tops[0]);
  const [selectedBottom, setSelectedBottom] = useState<ColorMatch>(matches.bottoms[0]);
  const [selectedShoes, setSelectedShoes] = useState<ColorMatch>(matches.shoes[0]);
  const [selectedAccessory, setSelectedAccessory] = useState<ColorMatch>(matches.accessories[0]);

  const handleViewOutfit = () => {
    onViewOutfit({
      top: startingPoint === 'top' ? { ...baseItem, description: baseItem.type } : selectedTop,
      bottom: startingPoint === 'bottom' ? { ...baseItem, description: baseItem.type } : selectedBottom,
      shoes: startingPoint === 'shoes' ? { ...baseItem, description: baseItem.type } : selectedShoes,
      accessory: startingPoint === 'accessory' ? { ...baseItem, description: baseItem.type } : selectedAccessory,
    });
  };

  const renderSection = (
    title: string,
    items: ColorMatch[],
    selectedItem: ColorMatch,
    onSelect: (item: ColorMatch) => void,
    isFixed: boolean
  ) => {
    if (isFixed) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-stone-700 pl-1">{title}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {items.map((match) => { // ✅ Key by color, not index
            const compatibility = calculateCompatibility(baseItem.color, match.color);
            const compatLevel = getCompatibilityLevel(compatibility);

            return (
              <button
                key={match.color} // ✅ Unique key
                onClick={() => onSelect(match)}
                className={`flex-shrink-0 w-40 bg-white rounded-2xl p-4 shadow-sm transition-all ${
                  selectedItem.color === match.color // ✅ Compare by color (more reliable)
                    ? 'ring-2 ring-stone-800 scale-105'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="relative">
                  <div
                    className="w-full h-20 rounded-xl mb-3 border border-stone-200"
                    style={{ backgroundColor: match.color }}
                  />
                  <div
                    className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-sm"
                    style={{ color: compatLevel.color }}
                  >
                    {compatibility}%
                  </div>
                </div>
                <h4 className="text-sm text-stone-800 mb-1">{match.name}</h4>
                <p className="text-xs text-stone-500 line-clamp-2">{match.description}</p>
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${compatibility}%`,
                        backgroundColor: compatLevel.color,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-stone-200"
            style={{ backgroundColor: baseItem.color }}
          />
          <div>
            <h2 className="text-lg text-stone-800">{baseItem.name} {baseItem.type}</h2>
            <p className="text-sm text-stone-500">Matching suggestions</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 pb-24">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-stone-100 to-stone-50 rounded-2xl p-4 flex gap-3 items-start border border-stone-200">
          <Info className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-stone-700 mb-1">Color Compatibility Score</p>
            <p className="text-xs text-stone-500">
              Percentages show how well colors match based on color theory, contrast, and harmony.
            </p>
          </div>
        </div>

        {/* Dynamic Sections */}
        {renderSection('Tops', matches.tops, selectedTop, setSelectedTop, startingPoint === 'top')}
        {renderSection('Bottoms', matches.bottoms, selectedBottom, setSelectedBottom, startingPoint === 'bottom')}
        {renderSection('Shoes', matches.shoes, selectedShoes, setSelectedShoes, startingPoint === 'shoes')}
        {renderSection('Accessories', matches.accessories, selectedAccessory, setSelectedAccessory, startingPoint === 'accessory')}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-4">
        <Button
          onClick={handleViewOutfit}
          className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white"
        >
          View Outfit Preview
        </Button>
      </div>
    </div>
  );
}