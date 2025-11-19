import React, { useState } from 'react';
import { View, ToolType } from '../../types';
import { TOOLS } from '../../constants';

interface SidebarProps {
  currentView: View;
  selectedTool: ToolType | null;
  onNavigate: (view: View, tool?: ToolType) => void;
  userCredits: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, selectedTool, onNavigate, userCredits }) => {
  const [isOpen, setIsOpen] = useState(true); // Mobile toggle state could go here

  const renderToolItem = (tool: typeof TOOLS[0]) => {
    const isActive = currentView === View.DASHBOARD && selectedTool === tool.id;
    return (
      <button
        key={tool.id}
        onClick={() => onNavigate(View.DASHBOARD, tool.id)}
        className={`w-full text-left flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">{tool.icon}</span>
        <span className="text-sm font-medium truncate">{tool.title}</span>
      </button>
    );
  };

  return (
    <aside className="w-72 bg-[#020617] border-r border-white/5 flex flex-col hidden md:flex z-20 shadow-2xl">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3 shadow-lg">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">AI Studio</h1>
          <p className="text-[10px] text-primary tracking-wider font-semibold uppercase">Pro Suite</p>
        </div>
      </div>

      {/* Credits Counter */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-xl rounded-full -mr-8 -mt-8"></div>
          <p className="text-xs text-slate-400 mb-1">Monthly Credits</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">{userCredits}</span>
            <span className="text-xs text-slate-500 mb-1">/ 200</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500" 
              style={{ width: `${(userCredits / 200) * 100}%` }}
            ></div>
          </div>
          <button 
             onClick={() => onNavigate(View.PRICING)}
             className="mt-4 w-full text-xs py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-center transition-colors text-primary font-medium"
          >
            Buy More
          </button>
        </div>
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-8">
        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Creative Tools</h3>
          <div className="space-y-1">
            {TOOLS.filter(t => t.category === 'Image' || t.category === 'Video').map(renderToolItem)}
          </div>
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Productivity</h3>
          <div className="space-y-1">
            {TOOLS.filter(t => t.category === 'Audio' || t.category === 'Document' || t.category === 'Utility').map(renderToolItem)}
          </div>
        </div>
      </div>

      {/* User Menu */}
      <div className="p-4 border-t border-white/5">
         <button 
           onClick={() => onNavigate(View.SETTINGS)}
           className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${currentView === View.SETTINGS ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
         >
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
               ⚙️
            </div>
            <div className="text-left">
                <p className="text-sm font-medium">Settings</p>
            </div>
         </button>
      </div>
    </aside>
  );
};