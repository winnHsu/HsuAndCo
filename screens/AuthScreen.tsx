import React, { useState } from 'react';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('qwe123!!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'test@example.com' && password === 'qwe123!!') {
      onSuccess();
    } else {
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-stone-50 dark:bg-stone-950 p-8 text-stone-900 dark:text-white">
      {/* Header */}
      <div className="pt-4 pb-12">
        <h1 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">Hsu & Co.</h1>
      </div>

      {/* Main Form */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h2 className="text-3xl font-light mb-8">Sign in</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-sm text-base outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-4">
             <p className="text-xs text-stone-400">This is a demo environment.</p>
             <p className="text-xs text-stone-400 mt-1">Don’t have an account? <span className="text-stone-900 dark:text-white font-medium cursor-pointer">Create one</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
