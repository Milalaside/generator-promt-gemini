import React, { useState, useCallback } from 'react';
import { PromptElements } from './types';
import { ArtStyle, Lighting, Composition } from './constants';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImageFromApi } from './services/geminiService';

const initialPromptElements: PromptElements = {
  subject: '',
  action: '',
  setting: '',
  artStyle: ArtStyle.NONE,
  artistInfluence: '',
  colorPalette: '',
  lighting: Lighting.NONE,
  composition: Composition.NONE,
  mood: '',
  negativePrompt: '',
  faceDescription: '',
  faceShape: '',
  eyeDescription: '',
  hairDescription: '',
  facialHair: '',
  distinctiveFeatures: '',
};

const App: React.FC = () => {
  const [promptInputs, setPromptInputs] = useState<PromptElements>(initialPromptElements);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPromptInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const buildPrompt = useCallback((inputs: PromptElements): string => {
    const parts: string[] = [];
    let mainSubjectDescription = inputs.subject.trim();

    if (inputs.faceDescription.trim()) mainSubjectDescription += `, ${inputs.faceDescription.trim()}`;
    if (inputs.faceShape.trim()) mainSubjectDescription += `, with a ${inputs.faceShape.trim()} face`;
    if (inputs.eyeDescription.trim()) mainSubjectDescription += `, ${inputs.eyeDescription.trim()}`;
    if (inputs.hairDescription.trim()) mainSubjectDescription += `, ${inputs.hairDescription.trim()}`;
    if (inputs.facialHair.trim()) mainSubjectDescription += `, ${inputs.facialHair.trim()}`;
    if (inputs.distinctiveFeatures.trim()) mainSubjectDescription += `, ${inputs.distinctiveFeatures.trim()}`;
    
    if (mainSubjectDescription) parts.push(mainSubjectDescription);
    if (inputs.action.trim()) parts.push(inputs.action.trim());
    if (inputs.setting.trim()) parts.push(`in ${inputs.setting.trim()}`);

    const mainClause = parts.filter(p => p).join(" ");
    const descriptiveClauses: string[] = [];

    if (mainClause) descriptiveClauses.push(mainClause);
    if (inputs.artStyle) descriptiveClauses.push(`Art Style: ${inputs.artStyle}`);
    if (inputs.artistInfluence.trim()) descriptiveClauses.push(`Inspired by ${inputs.artistInfluence.trim()}`);
    if (inputs.colorPalette.trim()) descriptiveClauses.push(`Color Palette: ${inputs.colorPalette.trim()}`);
    if (inputs.lighting) descriptiveClauses.push(`Lighting: ${inputs.lighting}`);
    if (inputs.composition) descriptiveClauses.push(`Composition: ${inputs.composition}`);
    if (inputs.mood.trim()) descriptiveClauses.push(`Mood: ${inputs.mood.trim()}`);
    
    let finalPrompt = descriptiveClauses.join(". ");
    if (descriptiveClauses.length > 0 && !finalPrompt.endsWith('.') && finalPrompt.length > 0) {
        finalPrompt += ".";
    }

    if (inputs.negativePrompt.trim()) {
      finalPrompt += ` Negative Prompt: (Avoid: ${inputs.negativePrompt.trim()}).`;
    }
    
    return finalPrompt.replace(/\.\./g, '.').replace(/\s\s+/g, ' ').trim();
  }, []);

  const handleComposePrompt = useCallback(() => {
    const newPrompt = buildPrompt(promptInputs);
    setGeneratedPrompt(newPrompt);
    setError(null);
    setGeneratedImageUrl(null);
  }, [promptInputs, buildPrompt]);

  const handleGenerateImage = useCallback(async () => {
    if (!generatedPrompt) {
      setError("Please compose a prompt first by filling the form and clicking 'Compose Prompt'.");
      return;
    }
    setIsGeneratingImage(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      // Add a small delay for UX, to show loading state even for quick errors
      await new Promise(resolve => setTimeout(resolve, 300));
      const base64Image = await generateImageFromApi(generatedPrompt);
      setGeneratedImageUrl(`data:image/jpeg;base64,${base64Image}`);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`Image generation failed: ${err.message}. Check API Key and console.`);
      } else {
        setError("An unknown error occurred during image generation.");
      }
    } finally {
      setIsGeneratingImage(false);
    }
  }, [generatedPrompt]);

  const handleResetForm = useCallback(() => {
    setPromptInputs(initialPromptElements);
    setGeneratedPrompt('');
    setGeneratedImageUrl(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center antialiased">
      <Header />
      <div className="container mx-auto w-full max-w-screen-2xl mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          <PromptForm
            promptInputs={promptInputs}
            onInputChange={handleInputChange}
            onComposePrompt={handleComposePrompt}
            onResetForm={handleResetForm}
            isProcessing={isGeneratingImage}
          />
          <ImageDisplay
            composedPrompt={generatedPrompt}
            imageUrl={generatedImageUrl}
            isLoading={isGeneratingImage}
            error={error}
            onGenerateImage={handleGenerateImage}
          />
        </div>
      </div>
       <footer className="w-full text-center py-8 mt-12 text-gray-400 text-sm">
        <p>Gemini Image Prompt Artisan &copy; {new Date().getFullYear()}. For educational purposes.</p>
        <p>Ensure your Gemini API Key is set in the environment variables.</p>
      </footer>
    </div>
  );
};

export default App;
