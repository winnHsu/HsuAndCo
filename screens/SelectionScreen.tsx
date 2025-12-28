import React from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Product, PRODUCTS } from '../types';

interface SelectionScreenProps {
  selectedProductId: string;
  onSelectProduct: (product: Product) => void;
  onContinue: () => void;
  onBack: () => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ 
  selectedProductId, 
  onSelectProduct, 
  onContinue,
  onBack 
}) => {
  return (
    <div className="flex h-full flex-col bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center px-6 pt-12 pb-6 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-stone-dark dark:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-stone-dark dark:text-white text-base font-semibold tracking-wide flex-1 text-center pr-10">
          Choose your transformation
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 gap-6 pb-32 overflow-y-auto no-scrollbar">
        <p className="text-stone-medium dark:text-gray-400 text-sm text-center px-4 leading-relaxed mb-2">
          Select a service package tailored to your space's immediate needs.
        </p>

        {PRODUCTS.map((product) => (
          <div 
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft overflow-hidden cursor-pointer transition-all hover:shadow-lg active:scale-[0.98] ring-2 ${selectedProductId === product.id ? 'ring-primary' : 'ring-transparent'}`}
          >
            <div 
              className="h-40 sm:h-48 w-full bg-cover bg-center" 
              style={{ backgroundImage: `url("${product.image}")` }}
            >
              {product.isPopular && (
                <div className="absolute top-4 right-4 bg-surface-light/90 dark:bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-stone-dark dark:text-white uppercase tracking-wider">Most Popular</span>
                </div>
              )}
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="text-stone-dark dark:text-white text-lg font-semibold tracking-tight">{product.title}</h3>
                <div className={`size-5 rounded-full border-2 transition-colors flex items-center justify-center ${selectedProductId === product.id ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600 group-hover:border-primary'}`}>
                  {selectedProductId === product.id && <div className="size-2 bg-white rounded-full" />}
                </div>
              </div>
              
              <p className="text-stone-medium dark:text-gray-400 text-sm font-normal leading-relaxed">
                {product.description}
              </p>
              
              <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs font-medium text-stone-dark dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {product.durationLabel}
                </span>
                <span className="text-primary font-bold text-sm">{product.priceLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pointer-events-none flex justify-center pb-8 pt-12 z-20">
        <button 
          onClick={onContinue}
          className="pointer-events-auto w-full bg-primary hover:bg-blue-700 text-white font-medium text-base h-12 rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SelectionScreen;
