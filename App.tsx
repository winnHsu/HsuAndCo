import React, { useState } from 'react';
import { LayoutGrid, PlusCircle, List, User, Lock, X } from 'lucide-react';
import OverviewScreen from './screens/LandingScreen'; 
import RequestScreen from './screens/WizardScreen'; 
import OrdersScreen from './screens/OrdersScreen';
import AccountScreen from './screens/AccountScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AuthScreen from './screens/AuthScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import { TabName } from './types';

type AppFlow = 'onboarding' | 'auth' | 'main';

export default function App() {
  const [flow, setFlow] = useState<AppFlow>('onboarding');
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // --- Handlers ---

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setFlow('main');
    setActiveTab('overview');
  };

  const handleSkip = () => {
    setIsAuthenticated(false);
    setFlow('main');
    setActiveTab('overview');
  };

  const handleTabChange = (tab: TabName) => {
    // Access Control Logic
    if (!isAuthenticated && (tab === 'orders' || tab === 'request')) {
      setShowLoginModal(true);
      return;
    }
    
    // Reset selected package if manually navigating to request to allow fresh start
    if (tab === 'request') {
      setSelectedPackageId(null);
    }
    
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  const handleStartRequest = (packageId?: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      if (packageId) {
        setSelectedPackageId(packageId);
      } else {
        setSelectedPackageId(null);
      }
      setActiveTab('request');
      window.scrollTo(0, 0);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setFlow('auth');
    setActiveTab('overview');
  };

  // --- Renders ---

  if (flow === 'onboarding') {
    return <OnboardingScreen onLogin={() => setFlow('auth')} onSkip={handleSkip} />;
  }

  if (flow === 'auth') {
    return <AuthScreen onSuccess={handleLoginSuccess} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewScreen onStartRequest={handleStartRequest} onShowHowItWorks={() => setShowHowItWorks(true)} />;
      case 'request':
        if (!isAuthenticated) return <OverviewScreen onStartRequest={handleStartRequest} onShowHowItWorks={() => setShowHowItWorks(true)} />;
        return (
          <RequestScreen 
            initialPackageId={selectedPackageId} 
            onComplete={() => setActiveTab('orders')} 
          />
        );
      case 'orders':
        if (!isAuthenticated) return <OverviewScreen onStartRequest={handleStartRequest} onShowHowItWorks={() => setShowHowItWorks(true)} />;
        return <OrdersScreen />;
      case 'account':
        return <AccountScreen isAuthenticated={isAuthenticated} onLogin={() => setFlow('auth')} onLogout={handleLogout} />;
      default:
        return <OverviewScreen onStartRequest={handleStartRequest} onShowHowItWorks={() => setShowHowItWorks(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-50 antialiased">
      <div className="relative mx-auto h-full min-h-screen w-full max-w-md bg-stone-50 dark:bg-stone-950 shadow-2xl overflow-hidden flex flex-col border-x border-stone-200 dark:border-stone-800">
        
        {/* Screen Content */}
        <div className="flex-1 overflow-hidden relative">
          {renderScreen()}
        </div>

        {/* How It Works Modal Overlay */}
        {showHowItWorks && (
          <HowItWorksScreen onClose={() => setShowHowItWorks(false)} />
        )}

        {/* Bottom Tab Bar */}
        <nav className="flex-none bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pb-safe pt-2 px-2 z-50">
          <div className="flex items-center justify-around h-16">
            <TabButton 
              isActive={activeTab === 'overview'} 
              onClick={() => handleTabChange('overview')} 
              icon={<LayoutGrid strokeWidth={1.5} />} 
              label="Overview" 
            />
            <TabButton 
              isActive={activeTab === 'request'} 
              onClick={() => handleTabChange('request')} 
              icon={<PlusCircle strokeWidth={1.5} />} 
              label="Request" 
            />
            <TabButton 
              isActive={activeTab === 'orders'} 
              onClick={() => handleTabChange('orders')} 
              icon={<List strokeWidth={1.5} />} 
              label="Orders" 
            />
            <TabButton 
              isActive={activeTab === 'account'} 
              onClick={() => handleTabChange('account')} 
              icon={<User strokeWidth={1.5} />} 
              label="Account" 
            />
          </div>
        </nav>

        {/* Gentle Login Modal */}
        {showLoginModal && (
          <div className="absolute inset-0 z-[60] bg-black/20 dark:bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="w-full bg-white dark:bg-stone-900 rounded-lg shadow-xl p-6 border border-stone-100 dark:border-stone-800 animate-in slide-in-from-bottom-10 fade-in duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-stone-900 dark:text-white" />
                </div>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">Sign in required</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
                Please log in to submit requests, track orders, or view account details.
              </p>
              <div className="flex gap-3">
                 <button 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 h-12 rounded-sm font-medium text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { setShowLoginModal(false); setFlow('auth'); }}
                  className="flex-1 h-12 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const TabButton = ({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 ${isActive ? 'text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400'}`}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);
