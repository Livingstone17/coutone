// src/components/StartingPointScreen.tsx
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface StartingPointScreenProps {
  gender: 'male' | 'female';
  onSelectStartingPoint: (itemType: 'top' | 'bottom' | 'shoes' | 'accessory') => void;
  onBack: () => void;
}

export function StartingPointScreen({ gender, onSelectStartingPoint, onBack }: StartingPointScreenProps) {
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
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-[var(--text-primary)] mb-6"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Header */}
        <div className="text-center space-y-2">
          <motion.h2
            className="text-2xl text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            What do you already have?
          </motion.h2>
          <motion.p
            className="text-stone-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Select the item you want to build your outfit around
          </motion.p>
        </div>

        {/* Animated Options */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {options.map((option, index) => (
            <motion.button
              key={option.type}
              onClick={() => onSelectStartingPoint(option.type)}
              className="w-full bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] text-[var(--text-primary)] shadow-sm overflow-hidden"
              // Staggered entry
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              // Hover & tap interactions
              whileHover={{
                y: -4,
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.98,
                y: 0,
              }}
              // Optional: bounce on select
              animate={{
                // You could add a small pulse here if desired
              }}
            >
              <div className="flex items-center justify-center gap-4">
                <motion.span
                  className="text-3xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.icon}
                </motion.span>
                <span className="text-lg font-medium">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}