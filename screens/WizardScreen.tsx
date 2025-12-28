import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Camera, Lock, ChevronDown, CheckCircle2, Building2, Store } from 'lucide-react';
import { RequestData, COMMERCIAL_PACKAGES, RESIDENTIAL_PACKAGES, ServicePackage } from '../types';

interface RequestScreenProps {
  onComplete: () => void;
  initialPackageId?: string | null;
}

const RequestScreen: React.FC<RequestScreenProps> = ({ onComplete, initialPackageId }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RequestData>({
    spaceType: 'commercial', // Default, will change via deep link
    selectedPackageId: null,
    address: '',
    size: '1000-2000 sq ft',
    floor: 'Ground',
    accessNotes: '',
    startDate: '',
    duration: '1 Month'
  });

  // Handle deep linking/pre-selection
  useEffect(() => {
    if (initialPackageId) {
      const isCommercial = COMMERCIAL_PACKAGES.find(p => p.id === initialPackageId);
      const isResidential = RESIDENTIAL_PACKAGES.find(p => p.id === initialPackageId);
      
      if (isCommercial) {
        setData(prev => ({ ...prev, selectedPackageId: initialPackageId, spaceType: 'commercial' }));
        setStep(3); // Jump straight to Specs
      } else if (isResidential) {
        setData(prev => ({ ...prev, selectedPackageId: initialPackageId, spaceType: 'residential' }));
        setStep(3); // Jump straight to Specs
      }
    } else {
      setStep(1); // Start from beginning if no ID
    }
  }, [initialPackageId]);

  const update = (patch: Partial<RequestData>) => setData({ ...data, ...patch });
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const selectedPackage = data.spaceType === 'commercial' 
    ? COMMERCIAL_PACKAGES.find(p => p.id === data.selectedPackageId)
    : RESIDENTIAL_PACKAGES.find(p => p.id === data.selectedPackageId);
  
  const packagesToDisplay = data.spaceType === 'commercial' ? COMMERCIAL_PACKAGES : RESIDENTIAL_PACKAGES;

  // --- Step Components ---

  const Step1_SpaceType = () => (
    <StepLayout title="Your space" step={1}>
      <SelectionButton 
        icon={<Building2 className="w-5 h-5" />}
        label="Residential" 
        sub="Homes, Apartments, Condos"
        selected={data.spaceType === 'residential'} 
        onClick={() => { update({ spaceType: 'residential' }); next(); }} 
      />
      <SelectionButton 
        icon={<Store className="w-5 h-5" />}
        label="Commercial" 
        sub="Retail, Showroom, Gallery"
        selected={data.spaceType === 'commercial'} 
        onClick={() => { update({ spaceType: 'commercial' }); next(); }} 
      />
    </StepLayout>
  );

  const Step2_PackageSelection = () => (
    <StepLayout title={data.spaceType === 'commercial' ? "What do you want to activate?" : "Select a transformation"} step={2} onBack={back}>
      <div className="space-y-3">
        {packagesToDisplay.map(pkg => (
          <div 
            key={pkg.id}
            onClick={() => { update({ selectedPackageId: pkg.id }); next(); }}
            className="group flex gap-4 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm cursor-pointer hover:border-stone-400 transition-colors"
          >
            <div 
              className="w-20 h-20 flex-shrink-0 bg-cover bg-center rounded-sm bg-stone-200"
              style={{ backgroundImage: `url('${pkg.image}')` }}
            />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-medium text-stone-900 dark:text-white leading-tight mb-1">{pkg.title}</h3>
              <p className="text-xs text-stone-500 mb-1">
                <span className="text-stone-400">{data.spaceType === 'residential' ? 'Suitable for: ' : 'Best for: '}</span>
                <span className="truncate block">{pkg.bestFor}</span>
              </p>
              <p className="text-xs text-stone-400">{pkg.durationLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </StepLayout>
  );

  const Step3_Specs = () => {
    if (!selectedPackage) return null;
    const isRes = data.spaceType === 'residential';

    return (
      <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-950">
        <header className="px-6 py-6 pt-12 flex items-center justify-between bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => { if(initialPackageId) { back(); setStep(2); } else { back(); } }} className="p-2 -ml-2 mr-2 text-stone-500 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">Package Specs</span>
          </div>
        </header>
        
        <main className="flex-1 px-6 py-8 overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-light text-stone-900 dark:text-white mb-2">{selectedPackage.title}</h2>
          <div className="h-1 w-12 bg-stone-900 dark:bg-white mb-8" />

          <div className="space-y-8">
            <SpecSection title="Use Case">
              <p className="text-sm text-stone-600 dark:text-stone-300">{selectedPackage.useCase}</p>
            </SpecSection>

            <SpecSection title={isRes ? "Suitable For" : "Space Requirements"}>
              <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-300 space-y-1">
                {selectedPackage.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </SpecSection>

            <SpecSection title={selectedPackage.id === 'seasonal-refresh' ? 'Frequency' : 'Duration'}>
              <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-300 space-y-1">
                {selectedPackage.durationSpecs.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </SpecSection>

            <SpecSection title="What this does">
              <ul className="list-disc list-inside text-sm text-stone-600 dark:text-stone-300 space-y-1">
                {selectedPackage.whatThisDoes.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </SpecSection>

            <SpecSection title="Included">
              <ul className="text-sm text-stone-600 dark:text-stone-300 space-y-2">
                {selectedPackage.included.map((r, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-stone-900 dark:text-white mt-0.5 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </SpecSection>

            <SpecSection title="Not Included">
              <ul className="text-sm text-stone-400 space-y-2">
                {selectedPackage.notIncluded.map((r, i) => (
                   <li key={i} className="flex gap-2 items-start">
                   <div className="w-4 h-4 flex items-center justify-center mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-stone-300" /></div>
                   <span>{r}</span>
                 </li>
                ))}
              </ul>
            </SpecSection>

            {/* Optional Notes */}
            {selectedPackage.importantNote && (
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 border border-amber-100 dark:border-amber-900/20 text-sm text-amber-800 dark:text-amber-200">
                <span className="font-semibold block mb-1">Important</span>
                {selectedPackage.importantNote}
              </div>
            )}
             {selectedPackage.accessNote && (
              <div className="bg-stone-50 dark:bg-stone-800 p-4 border border-stone-100 dark:border-stone-700 text-sm text-stone-600 dark:text-stone-300">
                <span className="font-semibold block mb-1 text-stone-900 dark:text-white">Access</span>
                {selectedPackage.accessNote}
              </div>
            )}
            {selectedPackage.resetGuarantee && (
              <div className="bg-stone-50 dark:bg-stone-800 p-4 border border-stone-100 dark:border-stone-700 text-sm text-stone-600 dark:text-stone-300">
                <span className="font-semibold block mb-1 text-stone-900 dark:text-white">Reset Guarantee</span>
                {selectedPackage.resetGuarantee}
              </div>
            )}
          </div>
        </main>

        <div className="p-6 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
          <button 
            onClick={next}
            className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 h-14 rounded-sm font-medium active:scale-[0.98] transition-transform mb-3"
          >
            Continue with this package
          </button>
          <button 
            onClick={() => { setStep(2); update({ selectedPackageId: null }); }}
            className="w-full text-stone-500 text-sm hover:text-stone-900 dark:hover:text-white"
          >
            Choose a different package
          </button>
        </div>
      </div>
    );
  };

  const Step4_Details = () => (
    <StepLayout title="Space details" step={4} onBack={back}>
      <div className="space-y-6">
        <InputGroup label="Address">
          <input 
            type="text" 
            placeholder="Search address..." 
            className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none focus:border-stone-400 transition-colors"
            value={data.address}
            onChange={(e) => update({ address: e.target.value })}
          />
        </InputGroup>

        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Square Footage">
            <div className="relative">
              <select 
                className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none appearance-none"
                value={data.size}
                onChange={(e) => update({ size: e.target.value })}
              >
                <option>Under 1000</option>
                <option>1000-2000</option>
                <option>2000-4000</option>
                <option>4000+</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
            </div>
          </InputGroup>
          <InputGroup label="Floor Level">
             <div className="relative">
              <select 
                className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none appearance-none"
                value={data.floor}
                onChange={(e) => update({ floor: e.target.value })}
              >
                <option>Ground</option>
                <option>2nd Floor</option>
                <option>Basement</option>
                <option>Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
            </div>
          </InputGroup>
        </div>

        <InputGroup label="Access Notes">
          <textarea 
            placeholder="Loading dock, elevator, hours..." 
            className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none focus:border-stone-400 transition-colors h-24 resize-none"
            value={data.accessNotes}
            onChange={(e) => update({ accessNotes: e.target.value })}
          />
        </InputGroup>

        <div className="pt-2">
          <button className="w-full border border-dashed border-stone-300 dark:border-stone-700 p-6 rounded-sm flex flex-col items-center justify-center gap-2 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
            <Camera className="w-6 h-6" />
            <span className="text-sm font-medium">Upload photos of space</span>
          </button>
        </div>

        <button 
          onClick={next}
          disabled={!data.address}
          className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 h-14 rounded-sm font-medium mt-4 disabled:opacity-50"
        >
          Next: Timing
        </button>
      </div>
    </StepLayout>
  );

  const Step5_Timing = () => (
    <StepLayout title="Timing" step={5} onBack={back}>
       <div className="space-y-6">
        <InputGroup label="Target Start Date">
          <input 
            type="date" 
            className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none focus:border-stone-400 transition-colors"
            value={data.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
          />
        </InputGroup>

        <InputGroup label={selectedPackage?.id === 'seasonal-refresh' ? "Frequency" : "Duration"}>
           <div className="relative">
            <select 
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none appearance-none"
              value={data.duration}
              onChange={(e) => update({ duration: e.target.value })}
            >
              {selectedPackage?.durationSpecs.map(opt => (
                <option key={opt}>{opt}</option>
              )) || <option>1 Month</option>}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
           </div>
        </InputGroup>

        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-sm border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-300 text-sm">
          Estimated verification time: 24–48 hours
        </div>

        <button 
          onClick={next}
          className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 h-14 rounded-sm font-medium mt-4"
        >
          Review Estimate
        </button>
       </div>
    </StepLayout>
  );

  const Step6_Estimate = () => (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-950">
      <header className="px-6 py-6 pt-12 flex items-center">
        <button onClick={back} className="p-2 -ml-2 text-stone-500 hover:text-stone-900"><ArrowLeft className="w-6 h-6" /></button>
        <span className="ml-4 text-xs font-semibold uppercase tracking-widest text-stone-500">Estimated Scope</span>
      </header>
      
      <main className="flex-1 px-6 overflow-y-auto no-scrollbar">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800 text-center mb-8">
          <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-2">Estimated Total</h3>
          <div className="text-4xl font-light text-stone-900 dark:text-white mb-2">
            {data.spaceType === 'residential' ? '$2,800 – $3,500' : '$4,500 – $6,200'}
          </div>
          <p className="text-stone-400 text-xs">Based on {selectedPackage?.title} ({data.size})</p>
        </div>

        <div className="space-y-8 mb-12">
          <div>
             <h4 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wide mb-4 border-b border-stone-200 pb-2">Timeline</h4>
             <p className="text-stone-600 dark:text-stone-300 text-sm">Typical install window: <span className="font-medium text-stone-900 dark:text-white">3-5 days from verification.</span></p>
          </div>
          
          <div className="bg-stone-100 dark:bg-stone-900 p-4 rounded-sm text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            <span className="font-semibold text-stone-900 dark:text-white block mb-1">Reset Guarantee</span>
            Space will be returned to original condition upon removal. All modifications are temporary and reversible.
          </div>
        </div>
      </main>

      <div className="p-6 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <button 
          onClick={next}
          className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 h-14 rounded-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Lock className="w-4 h-4" />
          <span>Place refundable hold ($500)</span>
        </button>
      </div>
    </div>
  );

  const Step7_Success = () => (
    <div className="flex flex-col h-full items-center justify-center p-8 bg-stone-50 dark:bg-stone-950 text-center">
      <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-stone-900 dark:text-white" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-light text-stone-900 dark:text-white mb-4">Request received.</h2>
      <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs mb-12">
        Your request is under verification. You can track the status and next steps from your dashboard.
      </p>
      <button 
        onClick={onComplete}
        className="w-full max-w-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white h-14 rounded-sm font-medium hover:bg-stone-50 transition-colors"
      >
        View Orders
      </button>
    </div>
  );

  // --- Render ---

  switch (step) {
    case 1: return <Step1_SpaceType />;
    case 2: return <Step2_PackageSelection />;
    case 3: return <Step3_Specs />;
    case 4: return <Step4_Details />;
    case 5: return <Step5_Timing />;
    case 6: return <Step6_Estimate />;
    case 7: return <Step7_Success />;
    default: return <Step1_SpaceType />;
  }
};

// --- Helper Components ---

const StepLayout = ({ title, step, children, onBack }: React.PropsWithChildren<{ title: string, step: number, onBack?: () => void }>) => (
  <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-950">
    <header className="px-6 py-6 pt-12 flex items-center justify-between">
      <div className="flex items-center">
        {onBack && (
          <button onClick={onBack} className="p-2 -ml-2 mr-2 text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">Step {step} of 7</span>
      </div>
    </header>
    <main className="flex-1 px-6 pb-12 overflow-y-auto no-scrollbar">
      <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white mb-8">{title}</h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </main>
  </div>
);

const SelectionButton = ({ label, sub, selected, onClick, icon }: { label: string, sub?: string, selected?: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-6 rounded-sm border transition-all duration-200 ${selected ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white hover:border-stone-400'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`${selected ? 'text-white' : 'text-stone-400'}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-medium text-lg">{label}</div>
        {sub && <div className={`text-sm mt-1 ${selected ? 'text-stone-400' : 'text-stone-500'}`}>{sub}</div>}
      </div>
      {selected && <Check className="w-5 h-5 text-white" />}
    </div>
  </button>
);

const SpecSection = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div>
    <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">{title}</h4>
    {children}
  </div>
);

const InputGroup = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</label>
    {children}
  </div>
);

export default RequestScreen;
