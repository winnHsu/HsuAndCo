import React from 'react';
import { X, Layers, Camera, CreditCard, Truck, Home, RotateCcw, CheckCircle2 } from 'lucide-react';

interface HowItWorksScreenProps {
  onClose: () => void;
}

const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-stone-50 dark:bg-stone-950 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-6 pt-12 flex justify-between items-center bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">How it works</h1>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-6 pb-20">
        
        {/* Intro */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">In Short</h2>
          <div className="text-2xl font-light text-stone-900 dark:text-white leading-tight space-y-6">
            <p>Hsu & Co. helps you <span className="font-medium border-b border-stone-300 dark:border-stone-700">temporarily prepare a space</span>, then <span className="font-medium border-b border-stone-300 dark:border-stone-700">return it exactly as before</span>.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 mt-2 flex-shrink-0" />
              <p>You don’t buy furniture, manage contractors, or store anything.</p>
            </div>
            <div className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white mt-2 flex-shrink-0" />
               <p className="text-stone-900 dark:text-white font-medium">We install. You use the space. We remove and reset.</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-12 relative">
           <div className="absolute left-[19px] top-4 bottom-0 w-px bg-stone-200 dark:bg-stone-800" />
           
           <Step 
             number={1} 
             title="Choose what you need"
             icon={<Layers className="w-5 h-5" />}
             content={
               <div className="space-y-2">
                 <p>Tell us if it's <strong>Residential</strong> or <strong>Commercial</strong>, your desired outcome, and duration.</p>
                 <p className="text-xs text-stone-400">You choose from predefined packages so scope is clear from the start.</p>
               </div>
             }
           />
           
           <Step 
             number={2} 
             title="Share basic details"
             icon={<Camera className="w-5 h-5" />}
             content="Upload photos, address, and access notes so we can verify feasibility and timing."
           />

           <Step 
             number={3} 
             title="Review scope & pricing"
             icon={<CreditCard className="w-5 h-5" />}
             content={
               <div className="space-y-2">
                 <p>See inclusions, price range, and our reset guarantee.</p>
                 <p className="text-xs text-stone-400">Place a refundable hold to proceed.</p>
               </div>
             }
           />

           <Step 
             number={4} 
             title="We install"
             icon={<Truck className="w-5 h-5" />}
             content="Our team brings everything, sets it up, and documents the condition. The space is now ready."
           />

           <Step 
             number={5} 
             title="Use the space"
             icon={<Home className="w-5 h-5" />}
             content="Use it for sublet, pop-up, showroom, or personal use. No ongoing coordination required."
           />

            <Step 
             number={6} 
             title="We remove & reset"
             icon={<RotateCcw className="w-5 h-5" />}
             content="We remove items, clean, and reset to original condition with photo evidence provided."
           />

        </section>

        {/* Footer Info */}
        <section className="mt-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm p-6 shadow-sm">
           <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-900 dark:text-white mb-6">What makes this different</h3>
           <div className="space-y-4">
             <Feature text="Fully reversible — nothing permanent" />
             <Feature text="Hotel-grade hygiene — sealed inventory" />
             <Feature text="Clear scope — no surprise work" />
             <Feature text="No storage or resale — we own everything" />
             <Feature text="Self-serve — track everything in the app" />
           </div>
        </section>

      </main>
      
      {/* Sticky Bottom Action */}
      <div className="p-6 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <button 
          onClick={onClose}
          className="w-full h-14 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-sm active:scale-[0.99] transition-transform"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const Step = ({ number, title, content, icon }: { number: number, title: string, content: React.ReactNode, icon: React.ReactNode }) => (
  <div className="relative pl-12 group">
    <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-center z-10 text-stone-400 dark:text-stone-500 group-hover:border-stone-400 transition-colors">
      {icon}
    </div>
    <div className="pt-2">
      <h3 className="text-base font-medium text-stone-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="text-stone-400 text-[10px] uppercase tracking-wide border border-stone-200 dark:border-stone-800 px-1.5 py-0.5 rounded-sm">Step {number}</span>
      </h3>
      <h4 className="text-lg font-light text-stone-900 dark:text-white mb-2">{title}</h4>
      <div className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
        {content}
      </div>
    </div>
  </div>
);

const Feature = ({ text }: { text: string }) => {
  const [bold, ...rest] = text.split('—');
  return (
    <div className="flex gap-3 items-start">
      <CheckCircle2 className="w-5 h-5 text-stone-900 dark:text-white flex-shrink-0" strokeWidth={1.5} />
      <p className="text-sm text-stone-600 dark:text-stone-400">
        <span className="font-medium text-stone-900 dark:text-white">{bold}</span>
        {rest.length > 0 && <span className="text-stone-500"> —{rest.join('—')}</span>}
      </p>
    </div>
  );
}

export default HowItWorksScreen;