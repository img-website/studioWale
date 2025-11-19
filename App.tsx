import React, { useState, useEffect } from 'react';
import { View, User, ToolType } from './types';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PricingPage } from './components/Pricing/PricingPage';
import { SettingsPage } from './components/Settings/SettingsPage';
import { CreditsPage } from './components/Settings/CreditsPage';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);

  // Mock Login
  const handleLogin = (email: string) => {
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      credits: 200, // Default monthly limit
      plan: 'Free'
    });
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.LOGIN);
    setSelectedTool(null);
  };

  const navigateTo = (view: View, toolId?: ToolType) => {
    setCurrentView(view);
    if (toolId) {
      setSelectedTool(toolId);
    } else {
      setSelectedTool(null);
    }
  };

  const deductCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: Math.max(0, user.credits - amount) });
    }
  };

  const updateApiKey = (key: string) => {
      if(user) {
          setUser({...user, apiKey: key});
      }
  }

  // Auth Guard
  if (!user && currentView !== View.LOGIN && currentView !== View.SIGNUP) {
     setCurrentView(View.LOGIN);
  }

  return (
    <div className="min-h-screen flex flex-col bg-darker text-white font-sans selection:bg-primary selection:text-white">
      {user && (
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            currentView={currentView} 
            selectedTool={selectedTool} 
            onNavigate={navigateTo} 
            userCredits={user.credits}
          />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="absolute inset-0 bg-hero-glow pointer-events-none z-0 opacity-20"></div>
            <Header user={user} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scroll-smooth">
              {currentView === View.DASHBOARD && (
                <Dashboard 
                   selectedTool={selectedTool} 
                   onSelectTool={(t) => navigateTo(View.DASHBOARD, t)}
                   user={user}
                   deductCredits={deductCredits}
                />
              )}
              {currentView === View.PRICING && <PricingPage onBuy={() => alert("Redirecting to payment gateway...")} />}
              {currentView === View.SETTINGS && <SettingsPage user={user} onUpdateKey={updateApiKey} />}
              {currentView === View.CREDITS && <CreditsPage user={user} />}
            </main>
          </div>
        </div>
      )}

      {!user && currentView === View.LOGIN && <Login onLogin={handleLogin} onSwitch={() => setCurrentView(View.SIGNUP)} />}
      {!user && currentView === View.SIGNUP && <Signup onSignup={handleLogin} onSwitch={() => setCurrentView(View.LOGIN)} />}
    </div>
  );
}