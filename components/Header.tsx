import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-screen-2xl text-center py-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Gemini Image Prompt Artisan
      </h1>
      <p className="mt-2 text-lg text-gray-300">Craft detailed prompts and bring your visions to life with Gemini.</p>
    </header>
  );
};
