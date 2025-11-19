import React from 'react';
import { ToolType, User } from '../../types';
import { TOOLS } from '../../constants';
import { ToolContainer } from '../Tools/ToolContainer';

interface DashboardProps {
  selectedTool: ToolType | null;
  onSelectTool: (tool: ToolType) => void;
  user: User;
  deductCredits: (amount: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ selectedTool, onSelectTool, user, deductCredits }) => {
  
  if (selectedTool) {
    return <ToolContainer toolId={selectedTool} user={user} deductCredits={deductCredits} />;
  }

  // Dashboard Home View
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, {user.name} 👋</h2>
        <p className="text-slate-400">What would you like to create today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="glass-panel rounded-2xl p-6 text-left hover:bg-white/10 transition-all hover:-translate-y-1 group border-t border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl bg-slate-900/50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 inline-block shadow-inner">
                {tool.icon}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 border border-white/5">
                {tool.cost} Credits
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};