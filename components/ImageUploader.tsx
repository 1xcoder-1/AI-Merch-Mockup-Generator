
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onLogoUpload: (file: File) => void;
  logo: { file: File; dataUrl: string } | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onLogoUpload, logo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onLogoUpload(file);
      } else {
        alert('Please upload a valid image file.');
      }
    }
  };

  const handleClick = () => inputRef.current?.click();

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
        accept="image/*"
      />
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`cursor-pointer p-6 border-2 border-dashed rounded-lg text-center transition-colors ${
          isDragging ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        {logo ? (
          <div className="flex flex-col items-center gap-2">
            <img src={logo.dataUrl} alt="Logo Preview" className="max-h-24 object-contain" />
            <p className="text-sm text-gray-400">{logo.file.name}</p>
            <p className="text-sm text-indigo-400 font-semibold">Click or drag to change logo</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            <p className="font-semibold text-gray-300">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, WEBP recommended</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
