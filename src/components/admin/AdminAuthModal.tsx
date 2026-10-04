import React, { useState } from 'react';
import { ShieldAlert, Lock, Eye, EyeOff, ArrowRight, X, KeyRound, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/adminAuthService';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passkey, setPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = loginAdmin(passkey);
      setIsSubmitting(false);

      if (result.success) {
        setPasskey('');
        onSuccess();
      } else {
        setErrorMsg(result.message);
      }
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 p-6 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Subtle decorative glowing corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 bg-[#E11D48]/20 rounded-full blur-2xl"
        />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E11D48]/15 border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>Admin Authorization</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                  Private
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Restricted to Taskmare Labs Studio administrators
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative / Context */}
        <div className="py-4 text-xs text-neutral-300 leading-relaxed font-normal">
          The SEO tags, analytics trackers, and code injection engine can modify live page behavior and search indexing. Please authenticate with your master passkey to continue.
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5">
              Master Admin Passkey
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={passkey}
                onChange={e => {
                  setPasskey(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Enter admin passkey..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-700 bg-neutral-950 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:border-transparent placeholder-neutral-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Default Passkey Hint for first setup */}
          <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2 font-mono">
            <KeyRound className="w-4 h-4 shrink-0 text-[#E11D48] mt-0.5" />
            <div>
              <span>Initial Setup Passkey: </span>
              <code className="text-white bg-neutral-800 px-1.5 py-0.5 rounded font-bold">
                taskmare@admin2026
              </code>
              <p className="text-[10px] text-neutral-500 mt-1">
                You can change this passkey anytime inside the manager settings.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !passkey.trim()}
              className="btn-tactile-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Verifying...' : 'Unlock Admin Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
