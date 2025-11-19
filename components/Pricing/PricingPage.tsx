import React from 'react';
import { PLANS } from '../../constants';

interface PricingPageProps {
    onBuy: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBuy }) => {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-400">Upgrade to Pro and unleash your creative potential.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {PLANS.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl border flex flex-col ${plan.popular ? 'bg-white/5 border-primary/50 shadow-[0_0_40px_rgba(99,102,241,0.15)]' : 'bg-transparent border-white/10'}`}>
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                        Most Popular
                    </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-500 ml-2">{plan.period}</span>
                </div>
                <p className="text-primary font-medium mb-6 bg-primary/10 inline-block py-1 px-3 rounded-lg self-start border border-primary/20">
                    {plan.credits}
                </p>
                
                <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300 text-sm">
                            <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-3 text-xs">✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={onBuy}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {plan.popular ? 'Get Started' : 'Current Plan'}
                </button>
            </div>
        ))}
      </div>

      <div className="mt-16 glass-panel p-8 rounded-2xl text-center">
          <h3 className="text-lg font-bold text-white mb-2">Need Enterprise Scale?</h3>
          <p className="text-slate-400 mb-6">For custom API limits and dedicated support.</p>
          <button className="text-primary hover:text-white underline transition-colors">Contact Sales</button>
      </div>
    </div>
  );
};