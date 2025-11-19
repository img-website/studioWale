import React, { useState } from 'react';
import { User } from '../../types';

interface SettingsPageProps {
    user: User;
    onUpdateKey: (key: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateKey }) => {
    const [keyInput, setKeyInput] = useState(user.apiKey || "");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        onUpdateKey(keyInput);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Account Settings</h2>
            
            {/* Profile Section */}
            <div className="glass-panel p-6 rounded-2xl mb-6">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Profile Information</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Name</label>
                        <div className="text-slate-300">{user.name}</div>
                    </div>
                    <div>
                        <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email</label>
                        <div className="text-slate-300">{user.email}</div>
                    </div>
                    <div>
                        <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Plan</label>
                        <div className="text-primary font-bold">{user.plan}</div>
                    </div>
                </div>
            </div>

            {/* API Keys Section */}
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-primary">
                <h3 className="text-lg font-bold text-white mb-2">API Configuration</h3>
                <p className="text-sm text-slate-400 mb-6">
                    To use the AI generation features, you can provide your own Gemini API Key. 
                    Your key is stored locally in your session.
                </p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Gemini API Key</label>
                        <input 
                            type="password" 
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                            placeholder="AIzaSy..."
                            value={keyInput}
                            onChange={(e) => setKeyInput(e.target.value)}
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-300 mb-2">OpenAI API Key (Optional)</label>
                         <input 
                             type="password" 
                             className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                             placeholder="sk-..."
                             disabled
                         />
                         <p className="text-xs text-slate-600 mt-1">Currently disabled for this demo version.</p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                        Get a Gemini API Key &rarr;
                    </a>
                    <button 
                        onClick={handleSave}
                        className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    >
                        {saved ? "Saved!" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};