import React from 'react';
import { ChevronRight, CreditCard, Building2, FileText, HelpCircle, LogOut, UserCircle } from 'lucide-react';

interface AccountScreenProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ isAuthenticated = true, onLogin, onLogout }) => {
  return (
    <div className="flex h-full w-full flex-col bg-stone-50 dark:bg-stone-950">
      <header className="px-6 py-6 pt-12 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">Account</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Profile Section */}
        {isAuthenticated ? (
          <div className="p-6 flex items-center gap-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
            <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-500 font-medium text-xl">
              JD
            </div>
            <div>
              <h2 className="text-lg font-medium text-stone-900 dark:text-white">James Doe</h2>
              <p className="text-sm text-stone-500">james.doe@example.com</p>
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
               <UserCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-stone-900 dark:text-white">Guest Account</h2>
              <p className="text-sm text-stone-500 max-w-[200px] mx-auto mt-1">Log in to manage your spaces and view orders.</p>
            </div>
            <button 
              onClick={onLogin}
              className="px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-sm text-sm font-medium hover:opacity-90"
            >
              Log in or create account
            </button>
          </div>
        )}

        {/* My Spaces - Only show if authenticated */}
        {isAuthenticated && (
          <div className="mt-8 px-6 mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">My Spaces</h3>
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm p-4 flex justify-between items-center">
                  <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">128 W 22nd St</p>
                      <p className="text-xs text-stone-500">Penthouse B • Residential</p>
                  </div>
                  <button className="text-xs font-medium text-stone-900 dark:text-white border-b border-stone-900 dark:border-white pb-0.5">
                      New Request
                  </button>
              </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="mt-8 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
            {isAuthenticated && (
              <>
                <MenuItem icon={<CreditCard className="w-5 h-5" />} label="Payments & Credits" />
                <MenuItem icon={<FileText className="w-5 h-5" />} label="Terms & Agreements" />
              </>
            )}
            <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="Support & FAQ" />
            {isAuthenticated && (
               <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-950 transition-colors"
               >
                  <div className="flex items-center gap-4 text-red-600 dark:text-red-400">
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-medium">Sign Out</span>
                  </div>
              </button>
            )}
        </div>
        
        <div className="p-8 text-center">
             <p className="text-xs text-stone-400">Hsu & Co. v1.0.4</p>
        </div>

      </main>
    </div>
  );
};

const MenuItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="w-full flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-950 transition-colors">
        <div className="flex items-center gap-4 text-stone-600 dark:text-stone-300">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-300" />
    </button>
)

export default AccountScreen;
