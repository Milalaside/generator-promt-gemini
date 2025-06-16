import { ArtStyle, Lighting, Composition } from './constants';

export interface PromptElements {
  subject: string;
  action: string;
  setting:   string;
  artStyle: ArtStyle | '';
  artistInfluence: string;
  colorPalette: string;
  lighting: Lighting | '';
  composition: Composition | '';
  mood: string;
  negativePrompt: string;
  // Face Characterization
  faceDescription: string; 
  faceShape: string;
  eyeDescription: string; // Combined color and other eye details
  hairDescription: string; // Combined style and color
  facialHair: string;
  distinctiveFeatures: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
