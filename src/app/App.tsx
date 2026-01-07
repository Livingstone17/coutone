import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ColorInputScreen } from './components/ColorInputScreen';
import { MatchingResultsScreen } from './components/MatchingResultsScreen';
import { OutfitPreviewScreen } from './components/OutfitPreviewScreen';
import { SavedOutfitsScreen } from './components/SavedOutfitsScreen';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Bookmark } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type Screen = 'welcome' | 'colorInput' | 'matchingResults' | 'outfitPreview' | 'savedOutfits';

interface ColorMatch {
  color: string;
  name: string;
  description: string;
}

interface Outfit {
  top: ColorMatch;
  bottom: ColorMatch;
  shoes: ColorMatch;
  accessory: ColorMatch;
  dateSaved: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorName, setColorName] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

  // Load saved outfits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('outfitMatch_savedOutfits');
    if (saved) {
      setSavedOutfits(JSON.parse(saved));
    }
  }, []);

  // Save outfits to localStorage
  useEffect(() => {
    if (savedOutfits.length > 0) {
      localStorage.setItem('outfitMatch_savedOutfits', JSON.stringify(savedOutfits));
    }
  }, [savedOutfits]);

  const handleSelectGender = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setCurrentScreen('colorInput');
  };

  const handleFindMatches = (color: string, name: string, type: string) => {
    setSelectedColor(color);
    setColorName(name);
    setClothingType(type);
    setCurrentScreen('matchingResults');
  };

  const handleViewOutfit = (outfit: Outfit) => {
    setCurrentOutfit(outfit);
    setCurrentScreen('outfitPreview');
  };

  const handleSaveOutfit = (outfit: Outfit) => {
    setSavedOutfits([outfit, ...savedOutfits]);
    setCurrentScreen('savedOutfits');
    toast.success('Outfit saved successfully!');
  };

  const handleSelectSavedOutfit = (outfit: Outfit) => {
    setCurrentOutfit(outfit);
    setCurrentScreen('outfitPreview');
  };

  const handleCreateNew = () => {
    setCurrentScreen('colorInput');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="size-full bg-stone-50 relative overflow-hidden">
      {/* Floating Saved Outfits Button */}
      {currentScreen !== 'welcome' && currentScreen !== 'savedOutfits' && (
        <button
          onClick={() => setCurrentScreen('savedOutfits')}
          className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-stone-200"
        >
          <Bookmark className="w-5 h-5 text-stone-700" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onSelectGender={handleSelectGender} />
          </motion.div>
        )}

        {currentScreen === 'colorInput' && (
          <motion.div
            key="colorInput"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ColorInputScreen
              onBack={() => setCurrentScreen('welcome')}
              onFindMatches={handleFindMatches}
            />
          </motion.div>
        )}

        {currentScreen === 'matchingResults' && (
          <motion.div
            key="matchingResults"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <MatchingResultsScreen
              onBack={() => setCurrentScreen('colorInput')}
              selectedColor={selectedColor}
              colorName={colorName}
              clothingType={clothingType}
              onViewOutfit={handleViewOutfit}
            />
          </motion.div>
        )}

        {currentScreen === 'outfitPreview' && currentOutfit && (
          <motion.div
            key="outfitPreview"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <OutfitPreviewScreen
              onBack={() => setCurrentScreen('matchingResults')}
              outfit={currentOutfit}
              onSaveOutfit={handleSaveOutfit}
            />
          </motion.div>
        )}

        {currentScreen === 'savedOutfits' && (
          <motion.div
            key="savedOutfits"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SavedOutfitsScreen
              onBack={() => setCurrentScreen('welcome')}
              savedOutfits={savedOutfits}
              onSelectOutfit={handleSelectSavedOutfit}
              onCreateNew={handleCreateNew}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}