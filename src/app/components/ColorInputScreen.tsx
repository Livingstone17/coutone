// import { useState } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import {getColorNameFromHex} from '../utils/colorCodes';

// interface ColorInputScreenProps {
//   onBack: () => void;
//   onFindMatches: (color: string, colorName: string, clothingType: string) => void;
// }

// const clothingTypes = [
//   'Shirt',
//   'T-shirt',
//   'Blouse',
//   'Dress',
//   'Top',
// ];

// export function ColorInputScreen({ onBack, onFindMatches }: ColorInputScreenProps) {
//   const [selectedColor, setSelectedColor] = useState('#6B5B95');
//   const [colorName, setColorName] = useState('Mauve');
//   const [clothingType, setClothingType] = useState('');

//   const handleColorChange = (hex: string) => {
//     setSelectedColor(hex);

//     if (!colorName) {
//       setColorName(getColorNameFromHex(hex));
//     }
//   };

//   // const handleSubmit = () => {
//   //   if (clothingType) {
//   //     onFindMatches(selectedColor, colorName, clothingType);
//   //   }
//   // };

//   const handleSubmit = () => {
//     if (!clothingType) return;

//     onFindMatches(
//       selectedColor,
//       colorName || getColorNameFromHex(selectedColor),
//       clothingType
//     );
//   };

//   return (
//     <div className="min-h-screen bg-stone-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-white border-b border-stone-200 px-4 py-4">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back</span>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col items-center justify-center p-6">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center">
//             <h2 className="text-2xl text-stone-800 mb-2">
//               What color are you wearing?
//             </h2>
//           </div>

//           {/* Color Picker Circle */}
//           <div className="flex justify-center">
//             <div className="relative">
//               <div
//                 className="w-48 h-48 rounded-full shadow-lg border-4 border-white transition-all duration-300"
//                 style={{ backgroundColor: selectedColor }}
//               />
//               <input
//                 type="color"
//                 value={selectedColor}
//                 // onChange={(e) => setSelectedColor(e.target.value)}
//                 onChange={(e) => handleColorChange(e.target.value)}
//                 className="absolute inset-0 w-48 h-48 opacity-0 cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* Color Name Input */}
//           <div className="space-y-2">
//             <label className="text-sm text-stone-600 pl-1">Color Name</label>
//             <Input
//               type="text"
//               value={colorName}
//               onChange={(e) => setColorName(e.target.value)} 
//               placeholder="e.g., Navy Blue"
//               className="h-14 rounded-2xl border-stone-300 bg-white"
//             />
//           </div>

//           {/* Clothing Type Dropdown */}
//           <div className="space-y-2">
//             <label className="text-sm text-stone-600 pl-1">Clothing Type</label>
//             <Select value={clothingType} onValueChange={setClothingType}>
//               <SelectTrigger className="h-14 rounded-2xl border-stone-300 bg-white">
//                 <SelectValue placeholder="Select clothing type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {clothingTypes.map((type) => (
//                   <SelectItem key={type} value={type}>
//                     {type}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* CTA Button */}
//           <Button
//             onClick={handleSubmit}
//             disabled={!clothingType}
//             className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Find Matches
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/ColorInputScreen.tsx
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { COLOR_NAME_MAP, getColorNameFromHex } from '../utils/colorCodes';

interface ColorInputScreenProps {
  gender: 'male' | 'female';
  startingPoint: 'top' | 'bottom' | 'shoes' | 'accessory';
  onBack: () => void;
  onFindMatches: (color: string, colorName: string, clothingType: string) => void;
}

// Gender-aware clothing type labels
const CLOTHING_TYPES = {
  top: {
    male: ['T-shirt', 'Shirt', 'Polo', 'Sweater', 'Jacket'],
    female: ['Blouse', 'Dress', 'Top', 'Sweater', 'Cardigan'],
  },
  bottom: {
    male: ['Pants', 'Jeans', 'Chinos', 'Shorts'],
    female: ['Skirt', 'Pants', 'Jeans', 'Shorts', 'Trousers'],
  },
  shoes: {
    male: ['Sneakers', 'Loafers', 'Boots', 'Oxfords'],
    female: ['Heels', 'Sneakers', 'Flats', 'Boots', 'Sandals'],
  },
  accessory: {
    male: ['Watch', 'Tie', 'Belt', 'Bag'],
    female: ['Necklace', 'Earrings', 'Bag', 'Scarf', 'Bracelet'],
  },
};

// Helper: Try to convert user input (name or hex) to hex
const getColorHexFromInput = (input: string): string | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Match color name
  const lowerInput = trimmed.toLowerCase();
  for (const [hex, name] of Object.entries(COLOR_NAME_MAP)) {
    if (name.toLowerCase() === lowerInput) {
      return hex.toLowerCase();
    }
  }

  // Match hex
  const hexMatch = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    let cleanHex = hexMatch[1].toLowerCase();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    return `#${cleanHex}`;
  }

  return null;
};

export function ColorInputScreen({ gender, startingPoint, onBack, onFindMatches }: ColorInputScreenProps) {
  const defaultColor = '#6b5b95';
  const clothingTypes = CLOTHING_TYPES[startingPoint][gender];

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [colorName, setColorName] = useState(getColorNameFromHex(defaultColor));
  const [clothingType, setClothingType] = useState(clothingTypes[0]); // auto-select first

  // Update color name if default changes
  useEffect(() => {
    setColorName(getColorNameFromHex(defaultColor));
  }, []);

  const handleColorChange = (hex: string) => {
    const normalized = hex.toLowerCase();
    setSelectedColor(normalized);
    if (colorName === '' || colorName === getColorNameFromHex(selectedColor)) {
      setColorName(getColorNameFromHex(normalized));
    }
  };

  const handleColorNameChange = (input: string) => {
    setColorName(input);
    const detectedHex = getColorHexFromInput(input);
    if (detectedHex) {
      setSelectedColor(detectedHex);
    }
  };

  const handleSubmit = () => {
    const finalColorName = getColorNameFromHex(selectedColor);
    const fullItemName = `${finalColorName} ${clothingType}`.trim();
    onFindMatches(selectedColor, finalColorName, clothingType);
  };

  // Labels based on starting point
  const categoryLabels: Record<typeof startingPoint, string> = {
    top: 'Top Type',
    bottom: 'Bottom Type',
    shoes: 'Shoe Type',
    accessory: 'Accessory Type',
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="bg-white border-b border-stone-200 px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl text-stone-800 mb-2">
              What color is your {startingPoint}?
            </h2>
          </div>

          {/* Color Picker */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="w-48 h-48 rounded-full shadow-lg border-4 border-white transition-all duration-300"
                style={{ backgroundColor: selectedColor }}
              />
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 w-48 h-48 opacity-0 cursor-pointer"
                aria-label="Select a color"
              />
            </div>
          </div>

          <div className="text-center text-sm text-stone-500">
            {selectedColor.toUpperCase()}
          </div>

          {/* Color Name Input */}
          <div className="space-y-2">
            <label className="text-sm text-stone-600 pl-1">Color Name or Hex</label>
            <Input
              type="text"
              value={colorName}
              onChange={(e) => handleColorNameChange(e.target.value)}
              placeholder="e.g., Olive Green or #808000"
              className="h-14 rounded-2xl border-stone-300 bg-white"
            />
          </div>

          {/* Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-stone-600 pl-1">{categoryLabels[startingPoint]}</label>
            <Select value={clothingType} onValueChange={setClothingType}>
              <SelectTrigger className="h-14 rounded-2xl border-stone-300 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {clothingTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white"
          >
            Find Matches
          </Button>
        </div>
      </div>
    </div>
  );
}