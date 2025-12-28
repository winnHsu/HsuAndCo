import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COMMERCIAL_PACKAGES, RESIDENTIAL_PACKAGES } from '../types';

interface OverviewScreenProps {
  onStartRequest: (packageId?: string) => void;
  onShowHowItWorks: () => void;
}

const OverviewScreen: React.FC<OverviewScreenProps> = ({ onStartRequest, onShowHowItWorks }) => {
  return (
    <div className="flex h-full w-full flex-col bg-stone-50 dark:bg-stone-950 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="px-6 py-6 pt-12">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">Hsu & Co.</h1>
      </header>

      {/* Hero */}
      <section className="px-6 mb-12">
        <h2 className="text-3xl font-light tracking-tight text-stone-900 dark:text-white leading-[1.15] mb-4">
          Short-term retail, <br/>
          <span className="text-stone-400 dark:text-stone-600">without long-term consequences.</span>
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 leading-relaxed max-w-xs">
          Turnkey pop-ups. Fully reversible. Installed, removed, restored.
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => onStartRequest()}
            className="group flex items-center justify-between w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-4 rounded-sm text-sm font-medium transition-all active:scale-[0.99]"
          >
            <span>Start a new request</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
          </button>
          <div className="text-center">
            <button 
              onClick={onShowHowItWorks}
              className="text-xs text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="px-6 mb-12">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-stone-900 dark:text-white">Residential Services</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Temporary home readiness, without permanence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {RESIDENTIAL_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => onStartRequest(pkg.id)}
              className="group relative h-24 w-full rounded-sm overflow-hidden cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                style={{ backgroundImage: `url('${pkg.image}')` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <span className="text-white font-medium text-base leading-tight max-w-[80%]">{pkg.title}</span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Focus Block */}
      <section className="px-6 pb-12">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-stone-900 dark:text-white">Commercial Activations</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Designed for landlords, brokers, and brands operating between long-term leases.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {COMMERCIAL_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => onStartRequest(pkg.id)}
              className="group relative h-28 w-full rounded-sm overflow-hidden cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${pkg.image}')` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <span className="text-white font-medium text-lg leading-tight max-w-[70%]">{pkg.title}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OverviewScreen;
