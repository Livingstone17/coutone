// // Convert hex to RGB
// export const hexToRgb = (hex: string): [number, number, number] => {
//     const clean = hex.replace('#', '');
//     const bigint = parseInt(clean, 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     return [r, g, b];
//   };
  
//   // Convert RGB to LAB
//   export const rgbToLab = (r: number, g: number, b: number): [number, number, number] => {
//     r /= 255; g /= 255; b /= 255;
  
//     r = r > 0.04045 ? Math.pow((r+0.055)/1.055, 2.4) : r/12.92;
//     g = g > 0.04045 ? Math.pow((g+0.055)/1.055, 2.4) : g/12.92;
//     b = b > 0.04045 ? Math.pow((b+0.055)/1.055, 2.4) : b/12.92;
  
//     const x = (r*0.4124 + g*0.3576 + b*0.1805)/0.95047;
//     const y = (r*0.2126 + g*0.7152 + b*0.0722)/1.00000;
//     const z = (r*0.0193 + g*0.1192 + b*0.9505)/1.08883;
  
//     const fx = x > 0.008856 ? Math.cbrt(x) : (7.787*x) + 16/116;
//     const fy = y > 0.008856 ? Math.cbrt(y) : (7.787*y) + 16/116;
//     const fz = z > 0.008856 ? Math.cbrt(z) : (7.787*z) + 16/116;
  
//     const l = (116*fy) - 16;
//     const a = 500*(fx - fy);
//     const b2 = 200*(fy - fz);
  
//     return [l, a, b2];
//   };
  
//   export const hexToLab = (hex: string): [number, number, number] => {
//     const [r,g,b] = hexToRgb(hex);
//     return rgbToLab(r,g,b);
//   };
  
//   // Euclidean distance in LAB space
//   export const labColorDistance = (lab1: [number, number, number], lab2: [number, number, number]) => {
//     return Math.sqrt(
//       Math.pow(lab1[0]-lab2[0],2) +
//       Math.pow(lab1[1]-lab2[1],2) +
//       Math.pow(lab1[2]-lab2[2],2)
//     );
//   };
  

/**
 * HSL color type
 */
export interface HSL {
    h: number; // [0, 360]
    s: number; // [0, 100]
    l: number; // [0, 100]
  }
  
  /**
   * RGB color type
   */
  interface RGB {
    r: number; // [0, 255]
    g: number; // [0, 255]
    b: number; // [0, 255]
  }
  
  /**
   * Converts an RGB color value to HSL.
   * Assumes R, G, and B are in the set [0, 255]
   * Returns H, S, and L in the set [0, 360], [0, 100], [0, 100]
   */
  function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number;
    const l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h! *= 60;
    }
  
    return {
      h: Math.round(h!),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }
  
  /**
   * Converts an HSL color value to RGB.
   * Assumes H in [0, 360], S and L in [0, 100]
   * Returns R, G, B in [0, 255]
   */
  function hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r: number, g: number, b: number;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }
  
  /**
   * Converts HEX (e.g. "#FF5733" or "FF5733") to HSL
   */
  export function hexToHsl(hex: string): HSL {
    // Remove # if present
    const cleanHex = hex.replace(/^#/, '');
  
    // Handle 3-digit shorthand (e.g. #F1A → #FF11AA)
    const expanded = cleanHex.length === 3
      ? cleanHex.split('').map(c => c + c).join('')
      : cleanHex;
  
    if (expanded.length !== 6) {
      throw new Error(`Invalid HEX color: ${hex}`);
    }
  
    const r = parseInt(expanded.slice(0, 2), 16);
    const g = parseInt(expanded.slice(2, 4), 16);
    const b = parseInt(expanded.slice(4, 6), 16);
  
    return rgbToHsl(r, g, b);
  }
  
  /**
   * Converts HSL to HEX (e.g. { h: 120, s: 50, l: 50 } → "#4CAF50")
   */
  export function hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = hslToRgb(h, s, l);
    return (
      '#' +
      [r, g, b]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('')
    ).toUpperCase();
  }
  
  /**
   * Normalizes hue to [0, 360)
   */
  export function normalizeHue(hue: number): number {
    return ((hue % 360) + 360) % 360;
  }
  
  /**
   * Classifies a color based on saturation and lightness
   */
  export function classifyColor(hsl: HSL): {
    isNeutral: boolean;
    isVibrant: boolean;
    isPastel: boolean;
  } {
    const { s, l } = hsl;
    const isNeutral = s < 20 || l < 15 || l > 90;
    const isVibrant = s > 60 && l > 20 && l < 80;
    const isPastel = s < 50 && l > 70 && l < 95;
    return { isNeutral, isVibrant, isPastel };
  }