import React, { useEffect, useState } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { DEFAULT_PROFILE, PortfolioProfile } from '../data/portfolioData';

interface PlaceholderCustomizerModalProps {
  isOpen: boolean;
  profile: PortfolioProfile;
  isDark: boolean;
  onSave: (updated: PortfolioProfile) => void;
  onReset: () => void;
  onClose: () => void;
}

export const PlaceholderCustomizerModal: React.FC<PlaceholderCustomizerModalProps> = ({
  isOpen,
  profile,
  isDark,
  onSave,
  onReset,
  onClose,
}) => {
  const [formState, setFormState] = useState<PortfolioProfile>(profile);

  useEffect(() => {
    setFormState(profile);
  }, [profile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    onClose();
  };

  const handleRestoreDefaults = () => {
    setFormState(DEFAULT_PROFILE);
    onReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-2xl border overflow-hidden ${
          isDark
            ? 'bg-[#0F172A] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <div>
            <h3 id="customizer-title" className="text-base font-semibold tracking-tight">
              Personalize Portfolio Placeholders
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Preview your personal details or keep the default template placeholders.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer modal"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="input-name"
              className={`block text-xs font-medium mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Your Name Placeholder
            </label>
            <input
              id="input-name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="[YOUR NAME]"
              className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="input-github-repo"
              className={`block text-xs font-medium mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              GitHub Profile / Project URL
            </label>
            <input
              id="input-github-repo"
              type="text"
              value={formState.githubUrl}
              onChange={(e) => setFormState({ ...formState, githubUrl: e.target.value })}
              placeholder="https://github.com/YOUR_USERNAME"
              className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="input-linkedin"
              className={`block text-xs font-medium mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              LinkedIn Placeholder / URL
            </label>
            <input
              id="input-linkedin"
              type="text"
              value={formState.linkedinUrl}
              onChange={(e) => setFormState({ ...formState, linkedinUrl: e.target.value })}
              placeholder="[YOUR LINKEDIN URL]"
              className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="input-email"
              className={`block text-xs font-medium mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Email Address Placeholder
            </label>
            <input
              id="input-email"
              type="text"
              value={formState.emailPlaceholder}
              onChange={(e) => setFormState({ ...formState, emailPlaceholder: e.target.value })}
              placeholder="[YOUR EMAIL]"
              className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Placeholders</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
