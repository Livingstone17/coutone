// Color compatibility utility based on color theory

interface RGB {
    r: number;
    g: number;
    b: number;
  }
  
  interface HSL {
    h: number;
    s: number;
    l: number;
  }
  
  // Convert hex to RGB
  function hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }
  
  // Convert RGB to HSL
  function rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
  
    return {
      h: h * 360,
      s: s * 100,
      l: l * 100,
    };
  }
  
  // Check if color is neutral (low saturation)
  function isNeutral(hsl: HSL): boolean {
    return hsl.s < 20;
  }
  
  // Calculate color harmony score based on hue relationship
  function calculateHueHarmony(hue1: number, hue2: number): number {
    const hueDiff = Math.abs(hue1 - hue2);
    const minDiff = Math.min(hueDiff, 360 - hueDiff);
  
    // Complementary colors (opposite on wheel) - 180 degrees
    if (minDiff >= 150 && minDiff <= 210) return 95;
  
    // Triadic colors - 120 degrees
    if (minDiff >= 100 && minDiff <= 140) return 88;
  
    // Analogous colors - 30-60 degrees
    if (minDiff >= 20 && minDiff <= 60) return 92;
  
    // Split complementary - 150 degrees
    if (minDiff >= 140 && minDiff <= 160) return 85;
  
    // Very similar colors - 0-20 degrees
    if (minDiff < 20) return 70;
  
    // Awkward angles
    return 65;
  }
  
  // Calculate contrast compatibility
  function calculateContrast(hsl1: HSL, hsl2: HSL): number {
    const lightnessDiff = Math.abs(hsl1.l - hsl2.l);
  
    // Good contrast (one dark, one light)
    if (lightnessDiff > 40) return 95;
  
    // Moderate contrast
    if (lightnessDiff > 25) return 80;
  
    // Low contrast
    return 60;
  }
  
  // Calculate saturation compatibility
  function calculateSaturationHarmony(hsl1: HSL, hsl2: HSL): number {
    const satDiff = Math.abs(hsl1.s - hsl2.s);
  
    // Similar saturation levels work well
    if (satDiff < 20) return 90;
  
    // One saturated, one desaturated can work
    if (satDiff > 50) return 85;
  
    return 75;
  }
  
  /**
   * Calculate color compatibility percentage between two colors
   * @param color1 - Hex color code (e.g., "#FF5733")
   * @param color2 - Hex color code (e.g., "#000000")
   * @returns Compatibility percentage (0-100)
   */
  export function calculateCompatibility(color1: string, color2: string): number {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const hsl1 = rgbToHsl(rgb1);
    const hsl2 = rgbToHsl(rgb2);
  
    // Neutrals (black, white, gray, beige) match with everything
    if (isNeutral(hsl1) || isNeutral(hsl2)) {
      return 95;
    }
  
    // Calculate different harmony aspects
    const hueScore = calculateHueHarmony(hsl1.h, hsl2.h);
    const contrastScore = calculateContrast(hsl1, hsl2);
    const saturationScore = calculateSaturationHarmony(hsl1, hsl2);
  
    // Weighted average
    const finalScore = hueScore * 0.5 + contrastScore * 0.3 + saturationScore * 0.2;
  
    return Math.round(finalScore);
  }
  
  /**
   * Get compatibility level label
   */
  export function getCompatibilityLevel(score: number): {
    label: string;
    color: string;
  } {
    if (score >= 90) return { label: 'Excellent', color: '#16a34a' };
    if (score >= 80) return { label: 'Great', color: '#22c55e' };
    if (score >= 70) return { label: 'Good', color: '#84cc16' };
    if (score >= 60) return { label: 'Fair', color: '#eab308' };
    return { label: 'Needs work', color: '#ef4444' };
  }
  
  /**
   * Calculate overall outfit compatibility
   */
  export function calculateOutfitCompatibility(colors: string[]): number {
    if (colors.length < 2) return 100;
  
    let totalScore = 0;
    let comparisons = 0;
  
    // Compare each color with every other color
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        totalScore += calculateCompatibility(colors[i], colors[j]);
        comparisons++;
      }
    }
  
    return Math.round(totalScore / comparisons);
  }
  