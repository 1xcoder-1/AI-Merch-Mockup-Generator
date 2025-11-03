
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ProductSelector from './components/ProductSelector';
import MockupPreview from './components/MockupPreview';
import PromptControls from './components/PromptControls';
import Step from './components/Step';
import { Product } from './types';
import { PRODUCTS } from './constants';
import { generateInitialMockup, editImageWithPrompt } from './services/geminiService';

const blobToBase64 = (blob: Blob): Promise<{base64: string, mimeType: string}> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve({
        base64: (reader.result as string).split(',')[1],
        mimeType: blob.type
    });
    reader.onerror = error => reject(error);
});

const fileToDataUrl = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


const App: React.FC = () => {
    const [logo, setLogo] = useState<{file: File, dataUrl: string} | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [mockupImage, setMockupImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialGeneration, setIsInitialGeneration] = useState<boolean>(true);
    
    const handleLogoUpload = useCallback(async (file: File) => {
        const dataUrl = await fileToDataUrl(file);
        setLogo({ file, dataUrl });
    }, []);

    const handleProductSelect = useCallback((product: Product) => {
        setSelectedProduct(product);
        setMockupImage(null);
        setIsInitialGeneration(true);
    }, []);
    
    const isReadyForInitialGeneration = useMemo(() => !!logo && !!selectedProduct, [logo, selectedProduct]);

    const handleGenerate = useCallback(async () => {
        setError(null);

        if (isInitialGeneration) {
            if (!logo || !selectedProduct) {
                setError("Please upload a logo and select a product first.");
                return;
            }
            setIsLoading(true);
            try {
                // Fetching product image can be blocked by CORS in a real-world scenario.
                // These assets should be hosted on a domain with proper CORS headers.
                const response = await fetch(selectedProduct.imageUrl);
                if (!response.ok) throw new Error('Failed to fetch product image.');
                const productBlob = await response.blob();
                
                const { base64: productBase64, mimeType: productMimeType } = await blobToBase64(productBlob);
                const { base64: logoBase64, mimeType: logoMimeType } = await blobToBase64(logo.file);

                const newImage = await generateInitialMockup(logoBase64, logoMimeType, productBase64, productMimeType, selectedProduct.name);
                setMockupImage(newImage);
                setIsInitialGeneration(false);
            } catch (err) {
                console.error(err);
                setError("Failed to generate initial mockup. The AI might be busy, please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            if (!mockupImage || !prompt) {
                setError("No mockup image or prompt provided for editing.");
                return;
            }
            setIsLoading(true);
            try {
                const newImage = await editImageWithPrompt(mockupImage, prompt);
                setMockupImage(newImage);
                setPrompt(''); // Clear prompt after generation
            } catch (err) {
                console.error(err);
                setError("Failed to apply edit. The AI might be busy, please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    }, [isInitialGeneration, logo, selectedProduct, mockupImage, prompt]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Controls Panel */}
                    <div className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
                        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
                            <Step stepNumber={1} title="Upload Your Logo" isComplete={!!logo} />
                            <ImageUploader onLogoUpload={handleLogoUpload} logo={logo} />
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
                            <Step stepNumber={2} title="Select a Product" isComplete={!!selectedProduct} />
                            <ProductSelector selectedProduct={selectedProduct} onSelectProduct={handleProductSelect} />
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                           <PromptControls 
                             prompt={prompt}
                             setPrompt={setPrompt}
                             onGenerate={handleGenerate}
                             isLoading={isLoading}
                             isInitialGeneration={isInitialGeneration}
                             isReadyForInitial={isReadyForInitialGeneration}
                           />
                        </div>
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                                <p className="font-bold">An error occurred</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Preview Panel */}
                    <div className="w-full lg:w-2/3 xl:w-3/4">
                        <MockupPreview 
                            mockupImage={mockupImage} 
                            isLoading={isLoading}
                            selectedProductImageUrl={selectedProduct?.imageUrl || null}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
