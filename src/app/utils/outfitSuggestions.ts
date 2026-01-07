import { hexToHsl, hslToHex, normalizeHue, classifyColor, HSL } from '../utils/colorUtils';

interface ColorMatch {
  color: string; // hex
  name: string;
  description: string;
}

const getMatchingColors = (baseColor: string, gender: string): {
  bottoms: ColorMatch[];
  shoes: ColorMatch[];
  accessories: ColorMatch[];
} => {
  const baseHsl = hexToHsl(baseColor);
  const { isNeutral, isVibrant, isPastel } = classifyColor(baseHsl);
  const { h, s, l } = baseHsl;

  // Always available neutral base colors (as HSL templates)
  const neutralHslOptions: { hsl: HSL; name: string }[] = [
    { hsl: { h: 0, s: 0, l: 10 }, name: 'Black' },
    { hsl: { h: 0, s: 0, l: 30 }, name: 'Charcoal' },
    { hsl: { h: 220, s: 30, l: 35 }, name: 'Navy' },
    { hsl: { h: 30, s: 40, l: 35 }, name: 'Brown' },
    { hsl: { h: 40, s: 25, l: 60 }, name: 'Khaki' },
  ];

  // Convert HSL + name → ColorMatch
  const toColorMatch = (hsl: HSL, name: string, role: 'bottom' | 'shoes' | 'accessory'): ColorMatch => {
    const descriptions: Record<string, string> = {
      bottom: 'Balances your top and works for any occasion',
      shoes: 'Versatile and grounded',
      accessory: 'Subtle finishing touch',
    };
    return {
      color: hslToHex(hsl.h, hsl.s, hsl.l),
      name,
      description: descriptions[role],
    };
  };

  const bottoms: ColorMatch[] = [];
  const shoes: ColorMatch[] = [];
  const accessories: ColorMatch[] = [];

  // === STRATEGY: VIBRANT TOP ===
  if (isVibrant) {
    // Complementary bottom (opposite hue)
    const compHue = normalizeHue(h + 180);
    const compHsl: HSL = { h: compHue, s: Math.min(s * 0.6, 40), l: 40 };
    bottoms.push(toColorMatch(compHsl, 'Complementary', 'bottom'));

    // Add top neutrals
    bottoms.push(
      ...neutralHslOptions.slice(0, 3).map(opt =>
        toColorMatch(opt.hsl, opt.name, 'bottom')
      )
    );

    // Shoes: neutrals
    shoes.push(
      ...neutralHslOptions.slice(0, 2).map(opt =>
        toColorMatch(opt.hsl, `${opt.name} Shoes`, 'shoes')
      ),
      toColorMatch({ h: 0, s: 0, l: 100 }, 'White Sneakers', 'shoes'),
      toColorMatch({ h: 30, s: 40, l: 35 }, 'Brown Leather', 'shoes')
    );

    // Accessories: metallics + neutral
    accessories.push(
      toColorMatch({ h: 0, s: 0, l: 75 }, 'Silver', 'accessory'),
      toColorMatch({ h: 60, s: 100, l: 50 }, 'Gold', 'accessory'),
      toColorMatch({ h: 40, s: 25, l: 60 }, 'Tan Leather', 'accessory')
    );

  // === STRATEGY: PASTEL TOP ===
  } else if (isPastel) {
    // Analogous bottoms (±20°)
    const analogous1: HSL = { h: normalizeHue(h - 20), s: s, l: Math.max(l - 15, 20) };
    const analogous2: HSL = { h: normalizeHue(h + 20), s: s, l: Math.max(l - 15, 20) };
    bottoms.push(
      toColorMatch(analogous1, 'Soft Analog', 'bottom'),
      toColorMatch(analogous2, 'Warm Analog', 'bottom')
    );

    // Add earthy neutrals
    bottoms.push(
      ...neutralHslOptions.slice(2).map(opt =>
        toColorMatch(opt.hsl, opt.name, 'bottom')
      )
    );

    // Shoes: light & soft
    shoes.push(
      toColorMatch({ h: 0, s: 0, l: 100 }, 'White Sneakers', 'shoes'),
      toColorMatch({ h: 40, s: 25, l: 60 }, 'Tan Leather', 'shoes')
    );

    // Accessories: light neutrals
    accessories.push(
      toColorMatch({ h: 0, s: 0, l: 100 }, 'White', 'accessory'),
      toColorMatch({ h: 40, s: 25, l: 60 }, 'Tan Leather', 'accessory'),
      toColorMatch({ h: 0, s: 0, l: 75 }, 'Silver', 'accessory')
    );

  // === STRATEGY: NEUTRAL TOP ===
  } else {
    // Monochromatic variations
    bottoms.push(
      toColorMatch({ h, s: s * 0.8, l: 20 }, 'Monochrome Dark', 'bottom'),
      toColorMatch({ h, s: s * 0.5, l: 40 }, 'Monochrome Medium', 'bottom')
    );

    // All neutrals
    bottoms.push(
      ...neutralHslOptions.map(opt =>
        toColorMatch(opt.hsl, opt.name, 'bottom')
      )
    );

    // Shoes: all neutral options
    shoes.push(
      ...neutralHslOptions.map(opt =>
        toColorMatch(opt.hsl, `${opt.name} Shoes`, 'shoes')
      )
    );

    // Accessories: metallics + white
    accessories.push(
      toColorMatch({ h: 0, s: 0, l: 75 }, 'Silver', 'accessory'),
      toColorMatch({ h: 60, s: 100, l: 50 }, 'Gold', 'accessory'),
      toColorMatch({ h: 0, s: 0, l: 100 }, 'White', 'accessory')
    );
  }

  return { bottoms, shoes, accessories };
};

export { getMatchingColors };