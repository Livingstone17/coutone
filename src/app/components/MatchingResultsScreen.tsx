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
import { BaseItem } from '../App'; // or from '../types'

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

// Smart matching logic based on which item is fixed
const getMatchingColors = (
  baseColor: string,
  gender: string,
  fixedCategory: 'top' | 'bottom' | 'shoes' | 'accessory'
): {
  tops: ColorMatch[];
  bottoms: ColorMatch[];
  shoes: ColorMatch[];
  accessories: ColorMatch[];
} => {
  // All possible options (you can enhance these later)
  const tops: ColorMatch[] = [
    { color: '#2563EB', name: 'Royal Blue', description: 'Crisp and professional' },
    { color: '#000000', name: 'Black', description: 'Timeless and versatile' },
    { color: '#FFFFFF', name: 'White', description: 'Clean and fresh' },
    { color: '#8B4513', name: 'Brown', description: 'Warm and earthy' },
    { color: '#DC2626', name: 'Crimson', description: 'Bold and confident' },
  ];

  const bottoms: ColorMatch[] = [
    { color: '#1A1A1A', name: 'Black', description: 'Balances bold colors' },
    { color: '#4A4A4A', name: 'Charcoal', description: 'Professional choice' },
    { color: '#2C3E50', name: 'Navy', description: 'Classic pairing' },
    { color: '#8B7355', name: 'Khaki', description: 'Casual and comfortable' },
    { color: '#6B5B4F', name: 'Brown', description: 'Earthy and sophisticated' },
  ];

  const shoes: ColorMatch[] = [
    { color: '#1A1A1A', name: 'Black Shoes', description: 'Goes with everything' },
    { color: '#FFFFFF', name: 'White Sneakers', description: 'Modern and fresh' },
    { color: '#8B4513', name: 'Brown Leather', description: 'Classic and refined' },
    { color: '#2C3E50', name: 'Navy Loafers', description: 'Polished appearance' },
  ];

  const accessories: ColorMatch[] = [
    { color: '#C0C0C0', name: 'Silver', description: 'Sleek and contemporary' },
    { color: '#FFD700', name: 'Gold', description: 'Elegant and warm' },
    { color: '#8B7355', name: 'Tan Leather', description: 'Natural and versatile' },
    { color: '#FFFFFF', name: 'White', description: 'Clean and minimal' },
  ];

  // Depending on what's fixed, return suggestions for the other items
  return {
    tops: fixedCategory === 'top' ? [] : tops,
    bottoms: fixedCategory === 'bottom' ? [] : bottoms,
    shoes: fixedCategory === 'shoes' ? [] : shoes,
    accessories: fixedCategory === 'accessory' ? [] : accessories,
  };
};

export function MatchingResultsScreen({
  onBack,
  baseItem,
  startingPoint,
  onViewOutfit,
}: MatchingResultsScreenProps) {
  const matches = getMatchingColors(baseItem.color, 'unisex', startingPoint);

  // Initialize selected items (use first available or placeholder)
  const [selectedTop, setSelectedTop] = useState<ColorMatch>(
    matches.tops.length > 0 ? matches.tops[0] : { color: '#000000', name: 'Top', description: '' }
  );
  const [selectedBottom, setSelectedBottom] = useState<ColorMatch>(
    matches.bottoms.length > 0 ? matches.bottoms[0] : { color: '#000000', name: 'Bottom', description: '' }
  );
  const [selectedShoes, setSelectedShoes] = useState<ColorMatch>(
    matches.shoes.length > 0 ? matches.shoes[0] : { color: '#000000', name: 'Shoes', description: '' }
  );
  const [selectedAccessory, setSelectedAccessory] = useState<ColorMatch>(
    matches.accessories.length > 0 ? matches.accessories[0] : { color: '#000000', name: 'Accessory', description: '' }
  );

  const handleViewOutfit = () => {
    onViewOutfit({
      top: startingPoint === 'top' ? { ...baseItem, description: baseItem.type } : selectedTop,
      bottom: startingPoint === 'bottom' ? { ...baseItem, description: baseItem.type } : selectedBottom,
      shoes: startingPoint === 'shoes' ? { ...baseItem, description: baseItem.type } : selectedShoes,
      accessory: startingPoint === 'accessory' ? { ...baseItem, description: baseItem.type } : selectedAccessory,
    });
  };

  // Helper to render a section
  const renderSection = (
    title: string,
    items: ColorMatch[],
    selectedItem: ColorMatch,
    onSelect: (item: ColorMatch) => void,
    isFixed: boolean
  ) => {
    if (isFixed) {
      return null; // Don't show section for the fixed item
    }

    return (
      <div className="space-y-4">
        <h3 className="text-stone-700 pl-1">{title}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {items.map((match, idx) => {
            const compatibility = calculateCompatibility(baseItem.color, match.color);
            const compatLevel = getCompatibilityLevel(compatibility);

            return (
              <button
                key={idx}
                onClick={() => onSelect(match)}
                className={`flex-shrink-0 w-40 bg-white rounded-2xl p-4 shadow-sm transition-all ${
                  selectedItem.name === match.name
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