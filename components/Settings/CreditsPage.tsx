import React from 'react';
import { User } from '../../types';

export const CreditsPage: React.FC<{user: User}> = ({ user }) => {
    return (
        <div className="max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-8">Credit History</h2>
             <div className="glass-panel p-6 rounded-2xl text-center py-12">
                 <p className="text-4xl font-bold text-white mb-2">{user.credits}</p>
                 <p className="text-slate-400 mb-8">Credits Remaining</p>
                 
                 <div className="border-t border-white/5 pt-8">
                     <p className="text-slate-500 italic">No usage history available yet.</p>
                 </div>
             </div>
        </div>
    )
}