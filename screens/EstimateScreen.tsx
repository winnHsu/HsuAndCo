import React from 'react';
import { ArrowLeft, Calendar, CheckCircle, Armchair, Truck, PenTool, MinusCircle, Lock, Info } from 'lucide-react';
import { Product } from '../types';

interface EstimateScreenProps {
  selectedProduct: Product;
  onBack: () => void;
}

const EstimateScreen: React.FC<EstimateScreenProps> = ({ selectedProduct, onBack }) => {
  // Mock calculation based on product base price
  const basePrice = selectedProduct.priceValue;
  const minPrice = basePrice - 100;
  const maxPrice = basePrice + 300;

  return (
    <div className="flex h-full flex-col bg-white dark:bg-background-dark relative">
      {/* Header */}
      <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button 
          onClick={onBack}
          aria-label="Go back" 
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-stone-800 dark:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500 dark:text-gray-400">Estimate</h2>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Price Section */}
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <span className="text-stone-500 dark:text-gray-400 text-sm font-medium mb-2 tracking-wide">Estimated Total</span>
          <h1 className="text-stone-900 dark:text-white text-4xl font-bold tracking-tight text-center leading-tight">
            ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}
          </h1>
          <p className="text-stone-400 dark:text-gray-500 text-xs mt-3 text-center max-w-[240px]">
            Includes all taxes and fees. Final adjustment after site visit.
          </p>
        </div>

        {/* Timeline Card */}
        <div className="px-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-stone-400 w-5 h-5" />
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wide">Timeline</h3>
            </div>
            <div className="grid grid-cols-2 gap-8 relative">
              <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700 -translate-x-1/2 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-stone-500 dark:text-gray-400 text-xs font-medium">Install</span>
                <span className="text-stone-900 dark:text-white text-base font-medium">Oct 12</span>
                <span className="text-stone-400 dark:text-gray-500 text-sm">9:00 AM</span>
              </div>
              <div className="flex flex-col gap-1 sm:pl-4">
                <span className="text-stone-500 dark:text-gray-400 text-xs font-medium">Removal</span>
                <span className="text-stone-900 dark:text-white text-base font-medium">Oct 14</span>
                <span className="text-stone-400 dark:text-gray-500 text-sm">5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="px-6 mb-8">
          <h3 className="text-stone-900 dark:text-white text-lg font-semibold mb-4 flex items-center gap-2">
            Included
            <CheckCircle className="text-green-600 w-5 h-5" />
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start group">
              <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-stone-600 dark:text-gray-300">
                <Armchair className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <p className="text-stone-900 dark:text-white font-medium text-sm">Furniture Rental</p>
                <p className="text-stone-500 dark:text-gray-400 text-sm leading-relaxed mt-0.5">Premium sofa, 2 armchairs, coffee table, and rug.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-stone-600 dark:text-gray-300">
                <Truck className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <p className="text-stone-900 dark:text-white font-medium text-sm">Delivery & Setup</p>
                <p className="text-stone-500 dark:text-gray-400 text-sm leading-relaxed mt-0.5">White-glove delivery, assembly, and placement.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-stone-600 dark:text-gray-300">
                <PenTool className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <p className="text-stone-900 dark:text-white font-medium text-sm">Design Consultation</p>
                <p className="text-stone-500 dark:text-gray-400 text-sm leading-relaxed mt-0.5">30-min virtual walkthrough with a stylist.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mx-6 h-px bg-gray-100 dark:bg-gray-800 mb-8"></div>

        {/* What's Excluded */}
        <div className="px-6 mb-8">
          <h3 className="text-stone-500 dark:text-gray-400 text-lg font-medium mb-4 flex items-center gap-2">
            Excluded
            <MinusCircle className="text-stone-300 dark:text-gray-600 w-5 h-5" />
          </h3>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3 items-center text-stone-500 dark:text-gray-400">
              <span className="block size-1.5 rounded-full bg-stone-300 dark:bg-gray-600 mt-0.5"></span>
              <span className="text-sm">Damage Waiver (Optional add-on)</span>
            </li>
            <li className="flex gap-3 items-center text-stone-500 dark:text-gray-400">
              <span className="block size-1.5 rounded-full bg-stone-300 dark:bg-gray-600 mt-0.5"></span>
              <span className="text-sm">Rush Fees</span>
            </li>
            <li className="flex gap-3 items-center text-stone-500 dark:text-gray-400">
              <span className="block size-1.5 rounded-full bg-stone-300 dark:bg-gray-600 mt-0.5"></span>
              <span className="text-sm">Styling of personal items</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Sticky Footer CTA */}
      <div className="absolute bottom-0 w-full bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 p-6 pb-8 z-20">
        <div className="flex flex-col gap-3">
          <button className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-white font-semibold h-14 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span>Hold payment ($500)</span>
            <Lock className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-gray-400">
            <Info className="w-4 h-4" />
            <p className="text-xs font-medium">Fully refundable until 48hrs prior to install.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateScreen;
