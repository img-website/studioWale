import React from 'react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="md:hidden">
        {/* Mobile Menu Trigger Placeholder */}
        <span className="text-2xl">☰</span>
      </div>
      <div className="flex-1"></div> {/* Spacer */}
      <div className="flex items-center space-x-6">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-slate-400">{user.plan} Plan</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px]">
           <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-sm font-bold">
              {user.name.substring(0, 2).toUpperCase()}
           </div>
        </div>
        <button 
          onClick={onLogout}
          className="text-slate-400 hover:text-red-400 transition-colors"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </header>
  );
};