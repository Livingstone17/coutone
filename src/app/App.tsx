// import { useState, useEffect } from 'react';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { ColorInputScreen } from './components/ColorInputScreen';
// import { MatchingResultsScreen } from './components/MatchingResultsScreen';
// import { OutfitPreviewScreen } from './components/OutfitPreviewScreen';
// import { SavedOutfitsScreen } from './components/SavedOutfitsScreen';
// import { motion, AnimatePresence } from 'motion/react';
// import { Menu, Bookmark } from 'lucide-react';
// import { Toaster, toast } from 'sonner';
// import { Outfit } from './utils/types';

// type Screen = 'welcome' | 'colorInput' | 'matchingResults' | 'outfitPreview' | 'savedOutfits';

// interface ColorMatch {
//   color: string;
//   name: string;
//   description: string;
// }

// // interface Outfit {
// //   top: ColorMatch;
// //   bottom: ColorMatch;
// //   shoes: ColorMatch;
// //   accessory: ColorMatch;
// //   dateSaved: string;
// // }

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
//   const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [colorName, setColorName] = useState('');
//   const [clothingType, setClothingType] = useState('');
//   const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
//   const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
//   const [startingPoint, setStartingPoint] = useState<'top' | 'bottom' | 'shoes' | 'accessory' | null>(null);


//   // Load saved outfits from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('outfitMatch_savedOutfits');
//     if (saved) {
//       setSavedOutfits(JSON.parse(saved));
//     }
//   }, []);

//   // Save outfits to localStorage
//   useEffect(() => {
//     if (savedOutfits.length > 0) {
//       localStorage.setItem('outfitMatch_savedOutfits', JSON.stringify(savedOutfits));
//     }
//   }, [savedOutfits]);

//   const handleSelectGender = (gender: 'male' | 'female') => {
//     setSelectedGender(gender);
//     setCurrentScreen('colorInput');
//   };

//   const handleFindMatches = (color: string, name: string, type: string) => {
//     setSelectedColor(color);
//     setColorName(name);
//     setClothingType(type);
//     setCurrentScreen('matchingResults');
//   };

//   // const handleViewOutfit = (outfit: Outfit) => {
//   //   setCurrentOutfit(outfit);
//   //   setCurrentScreen('outfitPreview');
//   // };
//   const handleViewOutfit = (outfit: Omit<Outfit, 'dateSaved'>) => {
//     const fullOutfit: Outfit = {
//       ...outfit,
//       dateSaved: new Date().toLocaleString(), // or .toISOString()
//     };
//     setCurrentOutfit(fullOutfit);
//     setCurrentScreen('outfitPreview');
//   };

//   const handleSaveOutfit = (outfit: Outfit) => {
//     setSavedOutfits([outfit, ...savedOutfits]);
//     setCurrentScreen('savedOutfits');
//     toast.success('Outfit saved successfully!');
//   };

//   const handleSelectSavedOutfit = (outfit: Outfit) => {
//     setCurrentOutfit(outfit);
//     setCurrentScreen('outfitPreview');
//   };

//   const handleCreateNew = () => {
//     setCurrentScreen('colorInput');
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: 20 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -20 },
//   };

//   return (
//     <div className="size-full bg-stone-50 relative overflow-hidden">
//       {/* Floating Saved Outfits Button */}
//       {currentScreen !== 'welcome' && currentScreen !== 'savedOutfits' && (
//         <button
//           onClick={() => setCurrentScreen('savedOutfits')}
//           className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-stone-200"
//         >
//           <Bookmark className="w-5 h-5 text-stone-700" />
//         </button>
//       )}

//       <AnimatePresence mode="wait">
//         {currentScreen === 'welcome' && (
//           <motion.div
//             key="welcome"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//           >
//             <WelcomeScreen onSelectGender={handleSelectGender} />
//           </motion.div>
//         )}

//         {/* {currentScreen === 'colorInput' && (
//           <motion.div
//             key="colorInput"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//           >
//             <ColorInputScreen
//               onBack={() => setCurrentScreen('welcome')}
//               onFindMatches={handleFindMatches}
//             />
//           </motion.div>
//         )} */}
//         {currentScreen === 'colorInput' && (
//   <motion.div
//     key="colorInput"
//     variants={pageVariants}
//     initial="initial"
//     animate="animate"
//     exit="exit"
//     transition={{ duration: 0.3 }}
//   >
//     <ColorInputScreen
//       gender={selectedGender} // 👈 ADD THIS
//       onBack={() => setCurrentScreen('welcome')}
//       onFindMatches={handleFindMatches}
//     />
//   </motion.div>
// )}

//         {currentScreen === 'matchingResults' && (
//           <motion.div
//             key="matchingResults"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//           >
//             <MatchingResultsScreen
//               onBack={() => setCurrentScreen('colorInput')}
//               selectedColor={selectedColor}
//               colorName={colorName}
//               clothingType={clothingType}
//               onViewOutfit={handleViewOutfit}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'outfitPreview' && currentOutfit && (
//           <motion.div
//             key="outfitPreview"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//           >
//             <OutfitPreviewScreen
//               onBack={() => setCurrentScreen('matchingResults')}
//               outfit={currentOutfit}
//               onSaveOutfit={handleSaveOutfit}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'savedOutfits' && (
//           <motion.div
//             key="savedOutfits"
//             variants={pageVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//           >
//             <SavedOutfitsScreen
//               onBack={() => setCurrentScreen('welcome')}
//               savedOutfits={savedOutfits}
//               onSelectOutfit={handleSelectSavedOutfit}
//               onCreateNew={handleCreateNew}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <Toaster />
//     </div>
//   );
// }

// // src/App.tsx
// import { useState, useEffect } from 'react';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { StartingPointScreen } from './components/StartingPointScreen';
// import { ColorInputScreen } from './components/ColorInputScreen';
// import { MatchingResultsScreen } from './components/MatchingResultsScreen';
// import { OutfitPreviewScreen } from './components/OutfitPreviewScreen';
// import { SavedOutfitsScreen } from './components/SavedOutfitsScreen';
// import { motion, AnimatePresence } from 'motion/react';
// import { Bookmark } from 'lucide-react';
// import { Toaster, toast } from 'sonner';
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../contexts/ThemesContext';

// // Define types
// export interface ColorMatch {
//   color: string;
//   name: string;
//   description: string;
// }

// export interface Outfit {
//   top: ColorMatch;
//   bottom: ColorMatch;
//   shoes: ColorMatch;
//   accessory: ColorMatch;
//   dateSaved: string;
// }

// // Base item: the piece the user starts with
// export interface BaseItem {
//   color: string;
//   name: string;
//   type: string; // e.g., "Navy Blue Shirt"
//   category: 'top' | 'bottom' | 'shoes' | 'accessory';
// }

// type Screen = 'welcome' | 'startingPoint' | 'colorInput' | 'matchingResults' | 'outfitPreview' | 'savedOutfits';

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
//   const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
//   const [selectedSkinTone, setSelectedSkinTone] = useState('#D2B48C');
//   const [startingPoint, setStartingPoint] = useState<'top' | 'bottom' | 'shoes' | 'accessory' | null>(null);
//   const [baseItem, setBaseItem] = useState<BaseItem | null>(null);
//   const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
//   const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

//   const { theme, toggleTheme } = useTheme();

//   // Load saved outfits
//   useEffect(() => {
//     const saved = localStorage.getItem('outfitMatch_savedOutfits');
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed)) {
//           // Repair missing dateSaved
//           const repaired = parsed.map((outfit: any) => ({
//             ...outfit,
//             dateSaved: outfit.dateSaved || new Date().toISOString(),
//           }));
//           setSavedOutfits(repaired);
//         }
//       } catch (e) {
//         console.error('Failed to parse saved outfits', e);
//       }
//     }
//   }, []);

//   // Save outfits
//   useEffect(() => {
//     if (savedOutfits.length > 0) {
//       localStorage.setItem('outfitMatch_savedOutfits', JSON.stringify(savedOutfits));
//     }
//   }, [savedOutfits]);

//   // Handlers
//   const handleSelectGender = (gender: 'male' | 'female') => {
//     setSelectedGender(gender);
//     setCurrentScreen('startingPoint');
//   };

//   const handleSelectStartingPoint = (point: 'top' | 'bottom' | 'shoes' | 'accessory') => {
//     setStartingPoint(point);
//     setCurrentScreen('colorInput');
//   };

//   const handleFindMatches = (color: string, name: string, itemType: string) => {
//     if (!startingPoint) return;
//     setBaseItem({ color, name, type: itemType, category: startingPoint });
//     setCurrentScreen('matchingResults');
//   };

//   const handleViewOutfit = (partialOutfit: Omit<Outfit, 'dateSaved'>) => {
//     const fullOutfit: Outfit = {
//       ...partialOutfit,
//       dateSaved: new Date().toLocaleString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//       }),
//     };
//     setCurrentOutfit(fullOutfit);
//     setCurrentScreen('outfitPreview');
//   };

//   const handleSaveOutfit = (outfit: Outfit) => {
//     setSavedOutfits([outfit, ...savedOutfits]);
//     setCurrentScreen('savedOutfits');
//     toast.success('Outfit saved successfully!');
//   };

//   const handleSelectSavedOutfit = (outfit: Outfit) => {
//     setCurrentOutfit(outfit);
//     setCurrentScreen('outfitPreview');
//   };

//   const handleCreateNew = () => {
//     setCurrentScreen('startingPoint');
//   };

//   const pageVariants = {
//     initial: { opacity: 0, x: 20 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -20 },
//   };

//   return (
//     <div className="size-full bg-stone-50 relative overflow-hidden">
//       {/* Floating Saved Outfits Button */}
//       {!['welcome', 'savedOutfits'].includes(currentScreen) && (
//         // <button
//         //   onClick={() => setCurrentScreen('savedOutfits')}
//         //   className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-stone-200"
//         // >
//         //   <Bookmark className="w-5 h-5 text-stone-700" />
//         // </button>
//         <div className="fixed top-4 right-4 z-50 flex gap-3">
//         {/* Saved Outfits Button */}
//         <button
//           onClick={() => setCurrentScreen('savedOutfits')}
//           className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-[var(--border-color)]"
//         >
//           <Bookmark className="w-5 h-5 text-[var(--text-primary)]" />
//         </button>

//         {/* Theme Toggle Button */}
//         <button
//           onClick={toggleTheme}
//           className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-[var(--border-color)]"
//           aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
//         >
//           {theme === 'light' ? (
//             <Moon className="w-5 h-5 text-[var(--text-primary)]" />
//           ) : (
//             <Sun className="w-5 h-5 text-[var(--text-primary)]" />
//           )}
//         </button>
//       </div>
//       )}

//       <AnimatePresence mode="wait">
//         {currentScreen === 'welcome' && (
//           <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <WelcomeScreen onSelectGender={handleSelectGender} />
//           </motion.div>
//         )}

//         {currentScreen === 'startingPoint' && (
//           <motion.div key="startingPoint" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <StartingPointScreen
//               gender={selectedGender}
//               onSelectStartingPoint={handleSelectStartingPoint}
//               onBack={() => setCurrentScreen('welcome')}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'colorInput' && startingPoint && (
//           <motion.div key="colorInput" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <ColorInputScreen
//               gender={selectedGender}
//               startingPoint={startingPoint}
//               onBack={() => setCurrentScreen('startingPoint')}
//               onFindMatches={handleFindMatches}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'matchingResults' && baseItem && (
//           <motion.div key="matchingResults" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <MatchingResultsScreen
//               onBack={() => setCurrentScreen('colorInput')}
//               baseItem={baseItem}
//               startingPoint={baseItem.category}
//               onViewOutfit={handleViewOutfit}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'outfitPreview' && currentOutfit && (
//           <motion.div key="outfitPreview" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <OutfitPreviewScreen
//               onBack={() => setCurrentScreen('matchingResults')}
//               outfit={currentOutfit}
//               onSaveOutfit={handleSaveOutfit}
//             />
//           </motion.div>
//         )}

//         {currentScreen === 'savedOutfits' && (
//           <motion.div key="savedOutfits" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
//             <SavedOutfitsScreen
//               onBack={() => setCurrentScreen('welcome')}
//               savedOutfits={savedOutfits}
//               onSelectOutfit={handleSelectSavedOutfit}
//               onCreateNew={handleCreateNew}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <Toaster />
//     </div>
//   );
// }


// src/App.tsx
import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StartingPointScreen } from './components/StartingPointScreen';
import { ColorInputScreen } from './components/ColorInputScreen';
import { MatchingResultsScreen } from './components/MatchingResultsScreen';
import { OutfitPreviewScreen } from './components/OutfitPreviewScreen';
import { SavedOutfitsScreen } from './components/SavedOutfitsScreen';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Moon, Sun, Download } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useTheme } from '../contexts/ThemesContext';

// Define types
export interface ColorMatch {
  color: string;
  name: string;
  description: string;
}

export interface Outfit {
  top: ColorMatch;
  bottom: ColorMatch;
  shoes: ColorMatch;
  accessory: ColorMatch;
  dateSaved: string;
}

// Base item: the piece the user starts with
export interface BaseItem {
  color: string;
  name: string;
  type: string; // e.g., "Navy Blue Shirt"
  category: 'top' | 'bottom' | 'shoes' | 'accessory';
}

type Screen = 'welcome' | 'startingPoint' | 'colorInput' | 'matchingResults' | 'outfitPreview' | 'savedOutfits';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedSkinTone, setSelectedSkinTone] = useState('#D2B48C');
  const [startingPoint, setStartingPoint] = useState<'top' | 'bottom' | 'shoes' | 'accessory' | null>(null);
  const [baseItem, setBaseItem] = useState<BaseItem | null>(null);
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

  // === PWA Install State ===
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showIosInstallGuide, setShowIosInstallGuide] = useState(false);

  const { theme, toggleTheme } = useTheme();

  // Load saved outfits
  useEffect(() => {
    const saved = localStorage.getItem('outfitMatch_savedOutfits');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Repair missing dateSaved
          const repaired = parsed.map((outfit: any) => ({
            ...outfit,
            dateSaved: outfit.dateSaved || new Date().toISOString(),
          }));
          setSavedOutfits(repaired);
        }
      } catch (e) {
        console.error('Failed to parse saved outfits', e);
      }
    }
  }, []);

  // Save outfits
  useEffect(() => {
    if (savedOutfits.length > 0) {
      localStorage.setItem('outfitMatch_savedOutfits', JSON.stringify(savedOutfits));
    }
  }, [savedOutfits]);

  // === PWA Install Logic ===
  useEffect(() => {
    // Handle desktop install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = (window as any).navigator.standalone || 
      window.matchMedia('(display-mode: standalone)').matches;

    // let iosTimer: NodeJS.Timeout | null = null;
    let iosTimer: number | null = null;

    if (isIOS && !isStandalone) {
      const hasSeenIosGuide = localStorage.getItem('coutone_ios_guide_shown');
      if (!hasSeenIosGuide) {
        iosTimer = setTimeout(() => {
          setShowIosInstallGuide(true);
        }, 5000);
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          toast.success('App installed! 🎉');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  const handleIosGuideDismiss = () => {
    setShowIosInstallGuide(false);
    localStorage.setItem('coutone_ios_guide_shown', 'true');
  };

  // Handlers
  const handleSelectGender = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setCurrentScreen('startingPoint');
  };

  const handleSelectStartingPoint = (point: 'top' | 'bottom' | 'shoes' | 'accessory') => {
    setStartingPoint(point);
    setCurrentScreen('colorInput');
  };

  const handleFindMatches = (color: string, name: string, itemType: string) => {
    if (!startingPoint) return;
    setBaseItem({ color, name, type: itemType, category: startingPoint });
    setCurrentScreen('matchingResults');
  };

  const handleViewOutfit = (partialOutfit: Omit<Outfit, 'dateSaved'>) => {
    const fullOutfit: Outfit = {
      ...partialOutfit,
      dateSaved: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setCurrentOutfit(fullOutfit);
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
    setCurrentScreen('startingPoint');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="size-full bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Floating Saved Outfits + Theme + Install Buttons */}
      {!['welcome', 'savedOutfits'].includes(currentScreen) && (
        <div className="fixed top-4 right-4 z-50 flex gap-3">
          {/* Saved Outfits Button */}
          <button
            onClick={() => setCurrentScreen('savedOutfits')}
            className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-[var(--border-color)]"
          >
            <Bookmark className="w-5 h-5 text-[var(--text-primary)]" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-[var(--border-color)]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-[var(--text-primary)]" />
            ) : (
              <Sun className="w-5 h-5 text-[var(--text-primary)]" />
            )}
          </button>

          {/* Install Button (Desktop only) */}
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-[var(--border-color)]"
              aria-label="Install app"
            >
              <Download className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          )}
        </div>
      )}

      {/* iOS Install Guide */}
      {showIosInstallGuide && (
        <div className="fixed bottom-20 left-4 right-4 bg-[var(--bg-secondary)] rounded-2xl p-4 shadow-lg z-50 border border-[var(--border-color)]">
          <p className="text-[var(--text-primary)] text-sm">
            💡 <strong>Install Coutone</strong><br />
            Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to use like an app!
          </p>
          <button
            onClick={handleIosGuideDismiss}
            className="mt-2 text-xs text-[var(--text-secondary)]"
          >
            Don’t show again
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <WelcomeScreen onSelectGender={handleSelectGender} />
          </motion.div>
        )}

        {currentScreen === 'startingPoint' && (
          <motion.div key="startingPoint" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <StartingPointScreen
              gender={selectedGender}
              onSelectStartingPoint={handleSelectStartingPoint}
              onBack={() => setCurrentScreen('welcome')}
            />
          </motion.div>
        )}

        {currentScreen === 'colorInput' && startingPoint && (
          <motion.div key="colorInput" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <ColorInputScreen
              gender={selectedGender}
              startingPoint={startingPoint}
              onBack={() => setCurrentScreen('startingPoint')}
              onFindMatches={handleFindMatches}
            />
          </motion.div>
        )}

        {currentScreen === 'matchingResults' && baseItem && (
          <motion.div key="matchingResults" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <MatchingResultsScreen
              onBack={() => setCurrentScreen('colorInput')}
              baseItem={baseItem}
              startingPoint={baseItem.category}
              onViewOutfit={handleViewOutfit}
            />
          </motion.div>
        )}

        {currentScreen === 'outfitPreview' && currentOutfit && (
          <motion.div key="outfitPreview" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <OutfitPreviewScreen
              onBack={() => setCurrentScreen('matchingResults')}
              outfit={currentOutfit}
              onSaveOutfit={handleSaveOutfit}
            />
          </motion.div>
        )}

        {currentScreen === 'savedOutfits' && (
          <motion.div key="savedOutfits" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
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