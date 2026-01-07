import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface SavedOutfit {
  top: { color: string; name: string; description: string };
  bottom: { color: string; name: string };
  shoes: { color: string; name: string };
  accessory: { color: string; name: string };
  dateSaved: string;
}

interface SavedOutfitsScreenProps {
  onBack: () => void;
  savedOutfits: SavedOutfit[];
  onSelectOutfit: (outfit: SavedOutfit) => void;
  onCreateNew: () => void;
}

export function SavedOutfitsScreen({
  onBack,
  savedOutfits,
  onSelectOutfit,
  onCreateNew,
}: SavedOutfitsScreenProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(); //today
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
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
        <h2 className="text-xl text-stone-800">Saved Outfits</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {savedOutfits.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 -mt-20">
            <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center mb-4">
              <Plus className="w-12 h-12 text-stone-400" />
            </div>
            <h3 className="text-xl text-stone-800 mb-2">No saved outfits yet</h3>
            <p className="text-stone-500 mb-6">
              Create your first outfit combination to see it here
            </p>
            <Button
              onClick={onCreateNew}
              className="h-12 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white"
            >
              Create Outfit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-4">
            {savedOutfits.map((outfit, idx) => (
              <button
                key={idx}
                onClick={() => onSelectOutfit(outfit)}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                {/* Mini Silhouette */}
                <div className="flex flex-col items-center space-y-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200" />
                  <div
                    className="w-12 h-16 rounded-lg"
                    style={{ backgroundColor: outfit.top.color }}
                  />
                  <div
                    className="w-10 h-16 rounded-lg -mt-1"
                    style={{ backgroundColor: outfit.bottom.color }}
                  />
                  <div className="flex gap-1 -mt-1">
                    <div
                      className="w-4 h-6 rounded"
                      style={{ backgroundColor: outfit.shoes.color }}
                    />
                    <div
                      className="w-4 h-6 rounded"
                      style={{ backgroundColor: outfit.shoes.color }}
                    />
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="flex gap-1 justify-center mb-2">
                  <div
                    className="w-5 h-5 rounded-md border border-stone-200"
                    style={{ backgroundColor: outfit.top.color }}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-stone-200"
                    style={{ backgroundColor: outfit.bottom.color }}
                  />
                  <div
                    className="w-5 h-5 rounded-md border border-stone-200"
                    style={{ backgroundColor: outfit.shoes.color }}
                  />
                </div>

                {/* Date */}
                <p className="text-xs text-stone-500">{formatDate(outfit.dateSaved)}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      {savedOutfits.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-4">
          <Button
            onClick={onCreateNew}
            className="w-full h-14 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Outfit
          </Button>
        </div>
      )}
    </div>
  );
}
