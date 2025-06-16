export enum ArtStyle {
  NONE = '',
  PHOTOREALISTIC = "Photorealistic",
  CARTOON = "Cartoon",
  ANIME_MANGA = "Anime/Manga",
  WATERCOLOR = "Watercolor",
  OIL_PAINTING = "Oil Painting",
  PIXEL_ART = "Pixel Art",
  THREE_D_RENDER = "3D Render",
  IMPRESSIONISTIC = "Impressionistic",
  SURREALIST = "Surrealist",
  FANTASY_ART = "Fantasy Art",
  CONCEPT_ART = "Concept Art",
  ABSTRACT = "Abstract",
  MINIMALIST = "Minimalist",
  CYBERPUNK = "Cyberpunk",
  STEAMPUNK = "Steampunk",
  VINTAGE_PHOTO = "Vintage Photography",
  LINE_ART = "Line Art",
  SKETCH = "Sketch",
}

export enum Lighting {
  NONE = '',
  CINEMATIC = "Cinematic Lighting",
  STUDIO = "Studio Lighting",
  NATURAL = "Natural Light",
  GOLDEN_HOUR = "Golden Hour Sunlight",
  BLUE_HOUR = "Blue Hour Twilight",
  LOW_KEY = "Low Key (Dark & Moody)",
  HIGH_KEY = "High Key (Bright & Airy)",
  DRAMATIC = "Dramatic Shadows",
  SOFT_DIFFUSED = "Soft Diffused Light",
  RIM_LIGHTING = "Rim Lighting",
  NEON = "Neon Glow",
  VOLUMETRIC = "Volumetric Lighting",
  CANDLELIGHT = "Candlelight",
}

export enum Composition {
  NONE = '',
  CLOSE_UP = "Close-up Shot",
  EXTREME_CLOSE_UP = "Extreme Close-up",
  MEDIUM_SHOT = "Medium Shot",
  FULL_SHOT = "Full Body Shot",
  WIDE_SHOT = "Wide Angle Shot",
  ESTABLISHING_SHOT = "Establishing Shot (Environment)",
  PORTRAIT = "Portrait Orientation",
  LANDSCAPE = "Landscape Orientation",
  DUTCH_ANGLE = "Dutch Angle (Tilted)",
  BIRDS_EYE_VIEW = "Bird's Eye View (Top-down)",
  WORM_EYE_VIEW = "Worm's Eye View (Low Angle Up)",
  RULE_OF_THIRDS = "Rule of Thirds",
  SYMMETRICAL = "Symmetrical Composition",
  LEADING_LINES = "Leading Lines",
}

export const artStyleOptions = Object.entries(ArtStyle).map(([key, value]) => ({ value: value, label: value || `Any (${key})`}));
export const lightingOptions = Object.entries(Lighting).map(([key, value]) => ({ value: value, label: value || `Any (${key})` }));
export const compositionOptions = Object.entries(Composition).map(([key, value]) => ({ value: value, label: value || `Any (${key})` }));
