import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
  onSwitch: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-darker z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] z-0 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-10 glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/30">
             <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your AI Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-400 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded bg-slate-800 border-slate-700 text-primary focus:ring-0" />
              Remember me
            </label>
            <a href="#" className="text-primary hover:text-white transition-colors">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-transform hover:scale-[1.02] shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400 text-sm">
          Don't have an account? 
          <button onClick={onSwitch} className="text-white font-bold ml-2 hover:underline">Create Account</button>
        </div>
      </div>
    </div>
  );
};