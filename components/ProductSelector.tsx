
import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductSelectorProps {
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelectProduct }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 aspect-square ${
              selectedProduct?.id === product.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-600 hover:border-indigo-500'
            }`}
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors duration-200 flex items-end p-2">
              <p className="text-white text-sm font-semibold">{product.name}</p>
            </div>
            {selectedProduct?.id === product.id && (
                <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
