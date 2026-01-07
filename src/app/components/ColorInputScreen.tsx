import { useState } from 'react';
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
import {getColorNameFromHex} from '../utils/colorCodes';

interface ColorInputScreenProps {
  onBack: () => void;
  onFindMatches: (color: string, colorName: string, clothingType: string) => void;
}

const clothingTypes = [
  'Shirt',
  'T-shirt',
  'Blouse',
  'Dress',
  'Top',
];

export function ColorInputScreen({ onBack, onFindMatches }: ColorInputScreenProps) {
  const [selectedColor, setSelectedColor] = useState('#6B5B95');
  const [colorName, setColorName] = useState('');
  const [clothingType, setClothingType] = useState('');

  const handleColorChange = (hex: string) => {
    setSelectedColor(hex);

    if (!colorName) {
      setColorName(getColorNameFromHex(hex));
    }
  };

  // const handleSubmit = () => {
  //   if (clothingType) {
  //     onFindMatches(selectedColor, colorName, clothingType);
  //   }
  // };

  const handleSubmit = () => {
    if (!clothingType) return;

    onFindMatches(
      selectedColor,
      colorName || getColorNameFromHex(selectedColor),
      clothingType
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl text-stone-800 mb-2">
              What color are you wearing?
            </h2>
          </div>

          {/* Color Picker Circle */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="w-48 h-48 rounded-full shadow-lg border-4 border-white transition-all duration-300"
                style={{ backgroundColor: selectedColor }}
              />
              <input
                type="color"
                value={selectedColor}
                // onChange={(e) => setSelectedColor(e.target.value)}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 w-48 h-48 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Color Name Input */}
          <div className="space-y-2">
            <label className="text-sm text-stone-600 pl-1">Color Name</label>
            <Input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)} 
              placeholder="e.g., Navy Blue"
              className="h-14 rounded-2xl border-stone-300 bg-white"
            />
          </div>

          {/* Clothing Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm text-stone-600 pl-1">Clothing Type</label>
            <Select value={clothingType} onValueChange={setClothingType}>
              <SelectTrigger className="h-14 rounded-2xl border-stone-300 bg-white">
                <SelectValue placeholder="Select clothing type" />
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

          {/* CTA Button */}
          <Button
            onClick={handleSubmit}
            disabled={!clothingType}
            className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find Matches
          </Button>
        </div>
      </div>
    </div>
  );
}
