
import React from 'react';
import Spinner from './Spinner';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isInitialGeneration: boolean;
  isReadyForInitial: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isLoading,
  isInitialGeneration,
  isReadyForInitial,
}) => {
  return (
    <div className="space-y-4">
      {isInitialGeneration ? (
        <button
          onClick={onGenerate}
          disabled={!isReadyForInitial || isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? <Spinner /> : null}
          {isLoading ? 'Generating...' : 'Generate Initial Mockup'}
        </button>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-white">Step 3: Edit with AI</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Change the t-shirt to black', 'Add a retro filter', 'Make the logo bigger'"
            className="w-full h-24 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
          />
          <button
            onClick={onGenerate}
            disabled={!prompt || isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <Spinner /> : (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 3.5a1.5 1.5 0 0 1 3 0V4a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v9.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5V6a1 1 0 0 1 1-1h3a1 1 0 0 0 1-1V3.5ZM12.5 5h-5V3.5a.5.5 0 0 1 1 0V4h3V3.5a.5.5 0 0 1 1 0V5Z" />
                </svg>
            )}
            {isLoading ? 'Generating...' : 'Apply Edit'}
          </button>
        </>
      )}
    </div>
  );
};

export default PromptControls;
