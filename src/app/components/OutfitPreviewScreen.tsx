

import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { calculateOutfitCompatibility, getCompatibilityLevel } from '../utils/colorCompatibility';
import { MaleAvatar } from './avatars/MaleAvatar';

interface ColorMatch {
  color: string;
  name: string;
  description: string;
}

interface OutfitPreviewScreenProps {
  onBack: () => void;
  outfit: {
    top: ColorMatch;
    bottom: ColorMatch;
    shoes: ColorMatch;
    accessory: ColorMatch;
  };
  onSaveOutfit: (outfit: any) => void;
}

export function OutfitPreviewScreen({
  onBack,
  outfit,
  onSaveOutfit,
}: OutfitPreviewScreenProps) {
  const handleSave = () => {
    onSaveOutfit({
      ...outfit,
      dateSaved: new Date().toISOString(),
    });
  };

  // Calculate overall outfit compatibility
  const overallCompatibility = calculateOutfitCompatibility([
    outfit.top.color,
    outfit.bottom.color,
    outfit.shoes.color,
  ]);
  const compatibilityLevel = getCompatibilityLevel(overallCompatibility);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl text-[var(--text-primary)]">Your Outfit</h2>
            
            {/* Overall Compatibility Score */}
            <div className="inline-flex items-center gap-3 bg-[var(--bg-secondary)] rounded-2xl px-6 py-3 shadow-sm">
              <div className="text-center">
                <div
                  className="text-3xl mb-1"
                  style={{ color: compatibilityLevel.color }}
                >
                  {overallCompatibility}%
                </div>
                <div className="text-xs text-stone-500">Color Match</div>
              </div>
              <div className="h-12 w-px bg-stone-200" />
              <div className="text-center">
                <div
                  className="text-sm mb-1"
                  style={{ color: compatibilityLevel.color }}
                >
                  {compatibilityLevel.label}
                </div>
                <div className="text-xs text-stone-500">Rating</div>
              </div>
            </div>
          </div>

          {/* Simplified Silhouette */}
          <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              {/* Head */}
              <div className="w-16 h-16 rounded-full bg-stone-200" />
              
              {/* Top */}
              <div className="relative">
                <div
                  className="w-32 h-40 rounded-2xl shadow-md"
                  style={{ backgroundColor: outfit.top.color }}
                />
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: outfit.accessory.color }}
                />
              </div>

              {/* Bottom */}
              <div
                className="w-28 h-44 rounded-2xl shadow-md -mt-2"
                style={{ backgroundColor: outfit.bottom.color }}
              />

              {/* Shoes */}
              <div className="flex gap-4 -mt-2">
                <div
                  className="w-12 h-16 rounded-xl shadow-md"
                  style={{ backgroundColor: outfit.shoes.color }}
                />
                <div
                  className="w-12 h-16 rounded-xl shadow-md"
                  style={{ backgroundColor: outfit.shoes.color }}
                />
              </div>
            </div>
          </div>

          {/* Color Details */}
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: outfit.top.color }} />
              <div className="flex-1">
                <p className="text-sm text-[var(--text-primary)]">{outfit.top.name}</p>
                <p className="text-xs text-stone-500">{outfit.top.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: outfit.bottom.color }} />
              <div className="flex-1">
                <p className="text-sm text-[var(--text-primary)]">{outfit.bottom.name}</p>
                <p className="text-xs text-stone-500">{outfit.bottom.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-[var(--border-color)]" style={{ backgroundColor: outfit.shoes.color }} />
              <div className="flex-1">
                <p className="text-sm text-[var(--text-primary)]">{outfit.shoes.name}</p>
                <p className="text-xs text-stone-500">{outfit.shoes.description}</p>
              </div>
            </div>
          </div>
          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Save Outfit
          </Button>
        </div>
      </div>
    </div>
  );
}