import React from 'react';
import { PromptElements } from '../types';
import { artStyleOptions, lightingOptions, compositionOptions } from '../constants';
import { TextInputGroup } from './TextInputGroup';
import { SelectInputGroup } from './SelectInputGroup';
import { Button } from './Button';

interface PromptFormProps {
  promptInputs: PromptElements;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onComposePrompt: () => void;
  onResetForm: () => void;
  isProcessing: boolean;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-semibold text-purple-400 border-b-2 border-purple-500 pb-2 mb-6">{children}</h2>
);

export const PromptForm: React.FC<PromptFormProps> = ({
  promptInputs,
  onInputChange,
  onComposePrompt,
  onResetForm,
  isProcessing,
}) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-8 space-y-8 h-full overflow-y-auto" style={{maxHeight: 'calc(100vh - 180px)'}}>
      <div>
        <SectionTitle>Core Elements</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <TextInputGroup
            label="Main Subject"
            name="subject"
            value={promptInputs.subject}
            onChange={onInputChange}
            placeholder="e.g., A majestic dragon, a curious robot"
          />
          <TextInputGroup
            label="Action / Activity"
            name="action"
            value={promptInputs.action}
            onChange={onInputChange}
            placeholder="e.g., soaring through clouds, exploring an ancient ruin"
          />
        </div>
        <TextInputGroup
            label="Setting / Background"
            name="setting"
            value={promptInputs.setting}
            onChange={onInputChange}
            placeholder="e.g., a mystical forest, a futuristic cityscape"
            isTextArea={true}
        />
      </div>

      <div>
        <SectionTitle>Face & Character Details</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <TextInputGroup
                label="Overall Face/Character Description"
                name="faceDescription"
                value={promptInputs.faceDescription}
                onChange={onInputChange}
                placeholder="e.g., young woman with kind eyes, rugged old man"
            />
            <TextInputGroup
                label="Face Shape"
                name="faceShape"
                value={promptInputs.faceShape}
                onChange={onInputChange}
                placeholder="e.g., round, oval, square jawline"
            />
            <TextInputGroup
                label="Eye Description"
                name="eyeDescription"
                value={promptInputs.eyeDescription}
                onChange={onInputChange}
                placeholder="e.g., piercing blue eyes, gentle brown eyes with long lashes"
            />
            <TextInputGroup
                label="Hair Description"
                name="hairDescription"
                value={promptInputs.hairDescription}
                onChange={onInputChange}
                placeholder="e.g., long flowing blonde hair, short spiky black hair"
            />
            <TextInputGroup
                label="Facial Hair"
                name="facialHair"
                value={promptInputs.facialHair}
                onChange={onInputChange}
                placeholder="e.g., well-groomed beard, handlebar mustache"
            />
            <TextInputGroup
                label="Distinctive Features"
                name="distinctiveFeatures"
                value={promptInputs.distinctiveFeatures}
                onChange={onInputChange}
                placeholder="e.g., glasses, freckles, a scar, tribal tattoos"
            />
        </div>
      </div>

      <div>
        <SectionTitle>Artistic Style & Mood</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <SelectInputGroup
            label="Art Style"
            name="artStyle"
            value={promptInputs.artStyle}
            onChange={onInputChange}
            options={artStyleOptions}
          />
          <TextInputGroup
            label="Artist Influence (Optional)"
            name="artistInfluence"
            value={promptInputs.artistInfluence}
            onChange={onInputChange}
            placeholder="e.g., Van Gogh, H.R. Giger, Studio Ghibli"
          />
          <TextInputGroup
            label="Color Palette"
            name="colorPalette"
            value={promptInputs.colorPalette}
            onChange={onInputChange}
            placeholder="e.g., vibrant neon, monochromatic blue, earthy tones"
          />
           <TextInputGroup
            label="Mood / Atmosphere"
            name="mood"
            value={promptInputs.mood}
            onChange={onInputChange}
            placeholder="e.g., dreamy, mysterious, energetic, melancholic"
          />
        </div>
      </div>
      
      <div>
        <SectionTitle>Technical Details</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
           <SelectInputGroup
            label="Lighting"
            name="lighting"
            value={promptInputs.lighting}
            onChange={onInputChange}
            options={lightingOptions}
          />
          <SelectInputGroup
            label="Composition / Shot"
            name="composition"
            value={promptInputs.composition}
            onChange={onInputChange}
            options={compositionOptions}
          />
        </div>
      </div>

      <div>
        <SectionTitle>Refinements</SectionTitle>
        <TextInputGroup
          label="Negative Prompt (What to avoid)"
          name="negativePrompt"
          value={promptInputs.negativePrompt}
          onChange={onInputChange}
          placeholder="e.g., blurry, ugly, deformed hands, watermark, text"
          isTextArea={true}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={onComposePrompt} disabled={isProcessing} className="w-full sm:w-auto flex-grow">
          Compose Prompt
        </Button>
        <Button onClick={onResetForm} disabled={isProcessing} variant="secondary" className="w-full sm:w-auto">
          Reset Form
        </Button>
      </div>
    </div>
  );
};
