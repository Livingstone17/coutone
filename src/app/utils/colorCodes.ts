// export const COLOR_NAME_MAP: Record<string, string> = {
//     '#000000': 'Black',
//     '#FFFFFF': 'White',
//     '#808080': 'Gray',
//     '#A9A9A9': 'Dark Gray',
//     '#D3D3D3': 'Light Gray',
  
//     '#1C1C1C': 'Charcoal',
//     '#F5F5DC': 'Beige',
//     '#EDE6D6': 'Cream',
//     '#C2B280': 'Khaki',
//     '#D2B48C': 'Tan',
  
//     '#8B4513': 'Brown',
//     '#A52A2A': 'Chestnut',
//     '#5C4033': 'Dark Brown',
  
//     '#000080': 'Navy Blue',
//     '#003366': 'Midnight Blue',
//     '#1E3A8A': 'Deep Blue',
//     '#2563EB': 'Royal Blue',
//     '#60A5FA': 'Sky Blue',
//     '#ADD8E6': 'Light Blue',
//     '#0F172A': 'Ink Blue',
  
//     '#008000': 'Green',
//     '#2E8B57': 'Sea Green',
//     '#556B2F': 'Olive Green',
//     '#6B8E23': 'Olive',
//     '#9ACD32': 'Lime Green',
//     '#A7F3D0': 'Mint Green',
//     '#064E3B': 'Forest Green',
  
//     '#FF0000': 'Red',
//     '#8B0000': 'Burgundy',
//     '#7F1D1D': 'Wine',
//     '#DC2626': 'Crimson',
//     '#F87171': 'Soft Red',
  
//     '#FFA500': 'Orange',
//     '#F97316': 'Burnt Orange',
//     '#FDBA74': 'Peach',
  
//     '#FFFF00': 'Yellow',
//     '#FACC15': 'Mustard',
//     '#FEF08A': 'Pastel Yellow',
  
//     '#800080': 'Purple',
//     '#6B21A8': 'Royal Purple',
//     '#A855F7': 'Lavender',
//     '#E9D5FF': 'Soft Lilac',
  
//     '#FFC0CB': 'Pink',
//     '#F472B6': 'Rose Pink',
//     '#BE185D': 'Deep Rose',
  
//     '#00008B': 'Dark Blue',
//     '#374151': 'Slate',
//     '#111827': 'Jet Black',
  
//     '#FFD700': 'Gold',
//     '#C0C0C0': 'Silver',
//   };
//   export const getColorNameFromHex = (hex: string): string => {
//     return COLOR_NAME_MAP[hex.toUpperCase()] ?? 'Custom Color';
//   };
    

// src/utils/colorCodes.ts

// Your existing color map (keep it as is)
export const COLOR_NAME_MAP: Record<string, string> = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#808080': 'Gray',
    '#A9A9A9': 'Dark Gray',
    '#D3D3D3': 'Light Gray',
  
    '#1C1C1C': 'Charcoal',
    '#F5F5DC': 'Beige',
    '#EDE6D6': 'Cream',
    '#C2B280': 'Khaki',
    '#D2B48C': 'Tan',
  
    '#8B4513': 'Brown',
    '#A52A2A': 'Chestnut',
    '#5C4033': 'Dark Brown',
  
    '#000080': 'Navy Blue',
    '#003366': 'Midnight Blue',
    '#1E3A8A': 'Deep Blue',
    '#2563EB': 'Royal Blue',
    '#60A5FA': 'Sky Blue',
    '#ADD8E6': 'Light Blue',
    '#0F172A': 'Ink Blue',
  
    '#008000': 'Green',
    '#2E8B57': 'Sea Green',
    '#556B2F': 'Olive Green',
    '#6B8E23': 'Olive',
    '#9ACD32': 'Lime Green',
    '#A7F3D0': 'Mint Green',
    '#064E3B': 'Forest Green',
  
    '#FF0000': 'Red',
    '#8B0000': 'Burgundy',
    '#7F1D1D': 'Wine',
    '#DC2626': 'Crimson',
    '#F87171': 'Soft Red',
  
    '#FFA500': 'Orange',
    '#F97316': 'Burnt Orange',
    '#FDBA74': 'Peach',
  
    '#FFFF00': 'Yellow',
    '#FACC15': 'Mustard',
    '#FEF08A': 'Pastel Yellow',
  
    '#800080': 'Purple',
    '#6B21A8': 'Royal Purple',
    '#A855F7': 'Lavender',
    '#E9D5FF': 'Soft Lilac',
  
    '#FFC0CB': 'Pink',
    '#F472B6': 'Rose Pink',
    '#BE185D': 'Deep Rose',
  
    '#00008B': 'Dark Blue',
    '#374151': 'Slate',
    '#111827': 'Jet Black',
  
    '#FFD700': 'Gold',
    '#C0C0C0': 'Silver',
  };
  
  // ─── Helper: Hex → RGB ────────────────────────────────
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '').toLowerCase();
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16),
        g: parseInt(clean[1] + clean[1], 16),
        b: parseInt(clean[2] + clean[2], 16),
      };
    }
    if (clean.length === 6) {
      return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
      };
    }
    throw new Error(`Invalid hex color: ${hex}`);
  }
  
  // ─── Helper: Compute Euclidean RGB distance ────────────
  function getColorDistance(hex1: string, hex2: string): number {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  }
  
  // ─── Main Function: Get friendly name with fallback ────
  export const getColorNameFromHex = (hex: string): string => {
    const normalized = hex.toLowerCase().replace(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/, '#$1');
    
    // 1. Exact match?
    if (COLOR_NAME_MAP[normalized]) {
      return COLOR_NAME_MAP[normalized];
    }
  
    // 2. Find closest match
    try {
      let minDistance = Infinity;
      let closestName = 'Custom';
  
      for (const [mapHex, name] of Object.entries(COLOR_NAME_MAP)) {
        const dist = getColorDistance(normalized, mapHex);
        if (dist < minDistance) {
          minDistance = dist;
          closestName = name;
        }
      }
  
      // 3. Only use closest if it's reasonably similar
      // Max possible distance is ~441 (black ↔ white)
      // 100 = visually close (e.g., #FF0000 vs #DC2626)
      return minDistance < 100 ? closestName : 'Custom';
    } catch {
      return 'Custom';
    }
  };