// src/types.ts
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