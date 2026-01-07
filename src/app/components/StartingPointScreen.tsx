// src/components/StartingPointScreen.tsx
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface StartingPointScreenProps {
  gender: 'male' | 'female';
  onSelectStartingPoint: (itemType: 'top' | 'bottom' | 'shoes' | 'accessory') => void;
  onBack: () => void;
}

export function StartingPointScreen({ gender, onSelectStartingPoint, onBack }: StartingPointScreenProps) {
  // Define options based on gender
  const options = gender === 'male'
    ? [
        { type: 'top' as const, label: 'Shirt / T-shirt', icon: '👕' },
        { type: 'bottom' as const, label: 'Pants / Jeans', icon: '👖' },
        { type: 'shoes' as const, label: 'Shoes', icon: '👞' },
        { type: 'accessory' as const, label: 'Watch / Belt', icon: '⌚' },
      ]
    : [
        { type: 'top' as const, label: 'Blouse / Top', icon: '👚' },
        { type: 'bottom' as const, label: 'Skirt / Pants', icon: '👗' },
        { type: 'shoes' as const, label: 'Heels / Flats', icon: '👠' },
        { type: 'accessory' as const, label: 'Necklace / Bag', icon: '👜' },
      ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl text-stone-800">
            What do you already have?
          </h2>
          <p className="text-stone-600 text-sm">
            Select the item you want to build your outfit around
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.type}
              onClick={() => onSelectStartingPoint(option.type)}
              className="w-full bg-white p-6 rounded-2xl border border-stone-200 text-stone-800 hover:bg-stone-50 transition-colors shadow-sm hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}