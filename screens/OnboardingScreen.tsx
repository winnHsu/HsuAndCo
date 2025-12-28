import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onLogin: () => void;
  onSkip: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onLogin, onSkip }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col justify-between bg-stone-50 dark:bg-stone-950 p-8 text-stone-900 dark:text-white transition-colors">
      
      {/* Top Header */}
      <div className="pt-4">
        <h1 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">Hsu & Co.</h1>
      </div>

      {/* Main Content Area - Click to advance */}
      <div className="flex-1 flex flex-col justify-center cursor-pointer" onClick={nextStep}>
        
        {/* Slide 1 */}
        {step === 0 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl font-light tracking-tight leading-[1.15]">
              Temporary space transformation.
            </h2>
            <p className="text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs font-light">
              We install, remove, and restore spaces for a defined period — without permanence.
            </p>
          </div>
        )}

        {/* Slide 2 */}
        {step === 1 && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-4xl font-light tracking-tight leading-[1.15]">
              Designed for certainty.
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-stone-800 dark:text-stone-200 font-light">
                Select a predefined transformation
              </p>
              <p className="text-lg text-stone-800 dark:text-stone-200 font-light">
                We handle design, staging, and operations
              </p>
              <p className="text-lg text-stone-800 dark:text-stone-200 font-light">
                Your space is returned to its original condition
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 w-12"></div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              No long-term commitment. No resale. No storage.
            </p>
          </div>
        )}

        {/* Slide 3 */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl font-light tracking-tight leading-[1.15]">
              Continue when you’re ready.
            </h2>
            <p className="text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs font-light">
              You can explore freely.<br/>
              Login is required to submit requests or track progress.
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pb-8">
        {step === 2 ? (
          <div className="space-y-4 animate-fade-in">
            <button 
              onClick={onLogin}
              className="w-full h-14 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-sm active:scale-[0.99] transition-transform"
            >
              Log in or create account
            </button>
            <div className="text-center">
              <button 
                onClick={onSkip}
                className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-end h-14" onClick={nextStep}>
            <span className="text-xs font-medium text-stone-400 dark:text-stone-600 tracking-wider">
              {step + 1} / 3
            </span>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;
