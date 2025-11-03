
import React from 'react';
import Spinner from './Spinner';

interface MockupPreviewProps {
  mockupImage: string | null;
  isLoading: boolean;
  selectedProductImageUrl: string | null;
}

const MockupPreview: React.FC<MockupPreviewProps> = ({ mockupImage, isLoading, selectedProductImageUrl }) => {
  const handleDownload = () => {
    if (!mockupImage) return;
    const link = document.createElement('a');
    link.href = mockupImage;
    link.download = 'merch-mockup.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 lg:p-8 flex flex-col items-center justify-center h-full min-h-[400px] lg:min-h-0 relative">
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 rounded-lg z-10 flex flex-col items-center justify-center gap-4">
            <Spinner />
            <p className="text-white font-semibold">AI is working its magic...</p>
          </div>
        )}
        
        {mockupImage ? (
          <img src={mockupImage} alt="Generated Mockup" className="w-full h-full object-contain rounded-lg" />
        ) : selectedProductImageUrl ? (
            <img src={selectedProductImageUrl} alt="Selected Product" className="w-full h-full object-contain rounded-lg opacity-30" />
        ) : (
          <div className="text-gray-500 text-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="mt-2">Your mockup will appear here</p>
          </div>
        )}
      </div>
      
      {mockupImage && !isLoading && (
        <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8">
            <button
                onClick={handleDownload}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Download Print File
            </button>
        </div>
      )}
    </div>
  );
};

export default MockupPreview;
