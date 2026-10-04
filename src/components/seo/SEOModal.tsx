import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  Code, 
  Share2, 
  BarChart3, 
  Check, 
  Copy, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Info,
  Pencil,
  Play,
  CheckCircle,
  AlertTriangle,
  FileCode,
  LogOut,
  Lock,
  KeyRound,
  Globe,
  Smartphone,
  Monitor,
  Eye,
  ArrowRight,
  Link as LinkIcon
} from 'lucide-react';
import { 
  getActiveSEOConfig, 
  saveActiveSEOConfig, 
  resetSEOConfigToDefaults, 
  applySEOMetadata, 
  exportConfigAsCode,
  testExecuteSnippet 
} from '../../services/seoService';
import { SEOConfig, CustomScript, CodeType, PageSEO } from '../../config/seoConfig';
import { logoutAdmin, updateAdminPasskey } from '../../services/adminAuthService';

interface SEOModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  onLogout?: () => void;
}

export const SEOModal: React.FC<SEOModalProps> = ({ 
  isOpen, 
  onClose, 
  currentPage = 'home', 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'seo' | 'analytics' | 'scripts' | 'schema' | 'export' | 'security'>('seo');
  const [config, setConfig] = useState<SEOConfig>(() => getActiveSEOConfig());
  const [selectedPage, setSelectedPage] = useState<string>(currentPage || 'home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewPlatform, setPreviewPlatform] = useState<'google' | 'social'>('google');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security passkey update state
  const [currentPasskey, setCurrentPasskey] = useState('');
  const [newPasskey, setNewPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [passkeyStatus, setPasskeyStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Script editor state
  const [editingScriptId, setEditingScriptId] = useState<string | null>(null);
  const [newScriptName, setNewScriptName] = useState('');
  const [newScriptCode, setNewScriptCode] = useState('');
  const [newScriptType, setNewScriptType] = useState<CodeType>('javascript');
  const [newScriptLocation, setNewScriptLocation] = useState<'head' | 'body'>('head');
  const [newScriptDescription, setNewScriptDescription] = useState('');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const editorFormRef = useRef<HTMLFormElement>(null);

  // Schema new social link state
  const [newSocialUrl, setNewSocialUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      const active = getActiveSEOConfig();
      setConfig(active);
      setSelectedPage(currentPage || 'home');
      setSavedSuccess(false);
      setTestResult(null);
      setPasskeyStatus(null);
    }
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  // Retrieve current SEO object for selected page
  const currentSEO: PageSEO = selectedPage === 'default' 
    ? config.default 
    : {
        ...config.default,
        ...(config.pages[selectedPage] || {})
      };

  // Editable handler that cleanly updates active page without freezing
  const handleUpdatePageSEO = (field: keyof PageSEO, value: string) => {
    setConfig(prev => {
      if (selectedPage === 'default') {
        return {
          ...prev,
          default: {
            ...prev.default,
            [field]: value
          }
        };
      } else {
        const existingOverrides = prev.pages[selectedPage] || {};
        const updatedPages = {
          ...prev.pages,
          [selectedPage]: {
            ...existingOverrides,
            [field]: value
          }
        };

        // If editing the primary home page, keep default in sync so there are no override discrepancies
        const updatedDefault = selectedPage === 'home'
          ? { ...prev.default, [field]: value }
          : prev.default;

        return {
          ...prev,
          default: updatedDefault,
          pages: updatedPages
        };
      }
    });
  };

  // One-click helper to sync current title & description to all pages
  const handleSyncToAllPages = () => {
    if (window.confirm('Apply the current title, description, and keywords to all pages (Home, Privacy, Terms, and Global Default)?')) {
      setConfig(prev => ({
        ...prev,
        default: {
          ...prev.default,
          title: currentSEO.title,
          description: currentSEO.description,
          keywords: currentSEO.keywords,
          ogTitle: currentSEO.ogTitle || currentSEO.title,
          ogDescription: currentSEO.ogDescription || currentSEO.description,
          ogImage: currentSEO.ogImage,
          robots: currentSEO.robots,
        },
        pages: {
          home: {
            title: currentSEO.title,
            description: currentSEO.description,
          },
          privacy: {
            title: `Privacy Policy | ${config.structuredData.organizationName || 'Taskmare Labs'}`,
            description: currentSEO.description,
            robots: 'index, follow',
          },
          terms: {
            title: `Terms & Conditions | ${config.structuredData.organizationName || 'Taskmare Labs'}`,
            description: currentSEO.description,
            robots: 'index, follow',
          }
        }
      }));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleSave = () => {
    saveActiveSEOConfig(config);
    // Apply live to DOM immediately
    applySEOMetadata(selectedPage === 'default' ? 'home' : selectedPage, config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all SEO, meta tags, and script settings back to project defaults?')) {
      const def = resetSEOConfigToDefaults();
      setConfig(def);
      applySEOMetadata(selectedPage === 'default' ? 'home' : selectedPage, def);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleUpdatePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasskey !== confirmPasskey) {
      setPasskeyStatus({ success: false, message: 'New passkey and confirmation do not match.' });
      return;
    }
    const res = updateAdminPasskey(currentPasskey, newPasskey);
    setPasskeyStatus(res);
    if (res.success) {
      setCurrentPasskey('');
      setNewPasskey('');
      setConfirmPasskey('');
      setTimeout(() => setPasskeyStatus(null), 4000);
    }
  };

  // Script editing handlers
  const handleStartEditScript = (script: CustomScript) => {
    setEditingScriptId(script.id);
    setNewScriptName(script.name);
    setNewScriptCode(script.code);
    setNewScriptType(script.type || 'javascript');
    setNewScriptLocation(script.location);
    setNewScriptDescription(script.description || '');
    setTestResult(null);
    editorFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelEdit = () => {
    setEditingScriptId(null);
    setNewScriptName('');
    setNewScriptCode('');
    setNewScriptType('javascript');
    setNewScriptLocation('head');
    setNewScriptDescription('');
    setTestResult(null);
  };

  const handleSaveOrUpdateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScriptName.trim() || !newScriptCode.trim()) return;

    if (editingScriptId) {
      setConfig(prev => ({
        ...prev,
        customScripts: prev.customScripts.map(s => 
          s.id === editingScriptId 
            ? {
                ...s,
                name: newScriptName.trim(),
                code: newScriptCode,
                type: newScriptType,
                location: newScriptLocation,
                description: newScriptDescription.trim() || undefined
              }
            : s
        )
      }));
    } else {
      const newScript: CustomScript = {
        id: `custom-${Date.now()}`,
        name: newScriptName.trim(),
        code: newScriptCode,
        type: newScriptType,
        location: newScriptLocation,
        enabled: true,
        description: newScriptDescription.trim() || undefined
      };
      setConfig(prev => ({
        ...prev,
        customScripts: [...prev.customScripts, newScript]
      }));
    }

    handleCancelEdit();
  };

  const handleTestSnippet = () => {
    if (!newScriptCode.trim()) {
      setTestResult({ success: false, message: 'Please enter code before testing.' });
      return;
    }
    const result = testExecuteSnippet(newScriptCode, newScriptType);
    setTestResult(result);
  };

  const handleApplyPresetTemplate = (templateKey: string) => {
    switch (templateKey) {
      case 'ga4':
        setNewScriptName('Google Analytics 4 (Inline Tag)');
        setNewScriptType('javascript');
        setNewScriptLocation('head');
        setNewScriptCode(`// Google Analytics (GA4) Tag\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XXXXXXXXXX');`);
        break;
      case 'meta-pixel':
        setNewScriptName('Meta / Facebook Pixel');
        setNewScriptType('javascript');
        setNewScriptLocation('head');
        setNewScriptCode(`// Meta Pixel Code\n!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', 'YOUR_PIXEL_ID');\nfbq('track', 'PageView');`);
        break;
      case 'crisp':
        setNewScriptName('Crisp Live Chat');
        setNewScriptType('javascript');
        setNewScriptLocation('body');
        setNewScriptCode(`// Crisp Live Chat Widget\nwindow.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_CRISP_WEBSITE_ID";\n(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`);
        break;
      case 'css-theme':
        setNewScriptName('Custom CSS Theme Override');
        setNewScriptType('css');
        setNewScriptLocation('head');
        setNewScriptCode(`/* Custom CSS Styles */\n:root {\n  --brand-primary: #E11D48;\n}\n\n.custom-banner {\n  border: 1px solid #E11D48;\n  background: rgba(225, 29, 72, 0.08);\n}`);
        break;
      case 'html-banner':
        setNewScriptName('Custom Announcement Notice');
        setNewScriptType('html');
        setNewScriptLocation('body');
        setNewScriptCode(`<!-- Custom Notification Bar -->\n<div style="background:#111;color:#fff;padding:8px 12px;font-size:12px;text-align:center;border-bottom:1px solid #333;">\n  🚀 <strong>Notice:</strong> Taskmare Labs is currently scheduling new development sprints.\n</div>`);
        break;
      default:
        break;
    }
  };

  const handleDeleteScript = (id: string) => {
    setConfig(prev => ({
      ...prev,
      customScripts: prev.customScripts.filter(s => s.id !== id)
    }));
  };

  const handleToggleScript = (id: string) => {
    setConfig(prev => ({
      ...prev,
      customScripts: prev.customScripts.map(s => 
        s.id === id ? { ...s, enabled: !s.enabled } : s
      )
    }));
  };

  const handleAddSocialLink = () => {
    if (!newSocialUrl.trim()) return;
    setConfig(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        socialLinks: [...prev.structuredData.socialLinks, newSocialUrl.trim()]
      }
    }));
    setNewSocialUrl('');
  };

  const handleRemoveSocialLink = (index: number) => {
    setConfig(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        socialLinks: prev.structuredData.socialLinks.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCopyExport = () => {
    const code = exportConfigAsCode(config);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-[#E11D48] shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                  SEO &amp; Live Site Manager
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Live Admin Engine
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                Edit page title, meta description, search previews, analytics trackers, and custom scripts in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold">
              <Lock className="w-3 h-3" />
              Authenticated
            </span>
            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                if (onLogout) onLogout();
                onClose();
              }}
              className="px-2.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:border-red-500 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Lock Admin Portal & Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'seo', label: 'Title & Meta Tags', icon: Search },
            { id: 'analytics', label: 'Analytics & Webmaster', icon: BarChart3 },
            { id: 'scripts', label: 'Custom Scripts & Styles', icon: Code },
            { id: 'schema', label: 'Schema.org JSON-LD', icon: Layers },
            { id: 'export', label: 'Export Code', icon: FileCode },
            { id: 'security', label: 'Security & Passkey', icon: Shield },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#E11D48] text-[#E11D48] bg-white dark:bg-neutral-900 shadow-xs'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: TITLE & META TAGS */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              
              {/* Page Selector & Quick Actions */}
              <div className="p-4 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#E11D48] shrink-0" />
                  <div>
                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">
                      Target Page to Edit:
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { key: 'home', label: '🏠 Home Page (/)' },
                        { key: 'privacy', label: '📄 Privacy Policy (/privacy)' },
                        { key: 'terms', label: '📜 Terms & Conditions (/terms)' },
                        { key: 'default', label: '🌐 Global Default (Fallback)' },
                      ].map(p => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setSelectedPage(p.key)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedPage === p.key
                              ? 'bg-[#E11D48] text-white shadow-xs'
                              : 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#E11D48]'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={handleSyncToAllPages}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#E11D48] hover:border-[#E11D48] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Apply current title, description & keywords across all pages"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>Sync to All Pages</span>
                  </button>
                </div>
              </div>

              {/* Real-time Previews Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Google Search Snippet Preview */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                    <span className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-[#E11D48]" /> Google Search Result Preview
                    </span>
                    <div className="flex items-center gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold' : 'text-neutral-400'}`}
                        title="Desktop view"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold' : 'text-neutral-400'}`}
                        title="Mobile view"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 bg-white dark:bg-neutral-900 p-3.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#E11D48] flex items-center justify-center text-[9px] text-white font-bold shrink-0">
                        T
                      </div>
                      <div className="text-[11px] text-neutral-700 dark:text-neutral-300 truncate">
                        taskmare.online <span className="text-neutral-400">› {selectedPage === 'home' ? '' : selectedPage}</span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] line-clamp-1 hover:underline cursor-pointer">
                      {currentSEO.title || 'Page Title Placeholder'}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {currentSEO.description || 'Provide a meta description to see how your site appears on search engine results.'}
                    </div>
                  </div>
                </div>

                {/* Social Share Card Preview */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                    <span className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-[#E11D48]" /> Social Card (X / WhatsApp / LinkedIn)
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">1200 × 630</span>
                  </div>
                  <div className="rounded-lg border border-neutral-200/80 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-xs">
                    <div className="h-28 bg-neutral-800 relative overflow-hidden flex items-center justify-center">
                      {currentSEO.ogImage ? (
                        <img 
                          src={currentSEO.ogImage} 
                          alt="OG Card Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xs text-neutral-400">No Image Specified</span>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] uppercase font-mono text-neutral-400">taskmare.online</div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {currentSEO.ogTitle || currentSEO.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {currentSEO.ogDescription || currentSEO.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editable Fields for the Selected Page */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Pencil className="w-4 h-4 text-[#E11D48]" />
                    <span>Editing Metadata for: <span className="text-[#E11D48] uppercase tracking-wider font-mono">{selectedPage}</span></span>
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    All inputs update state live as you type
                  </span>
                </div>

                {/* 1. Page Title */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Page Title (&lt;title&gt;) <span className="text-[#E11D48]">*</span>
                    </label>
                    <span className={`text-[10px] font-mono font-bold ${currentSEO.title.length > 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {currentSEO.title.length} / 60 chars {currentSEO.title.length > 60 ? '(may truncate on Google)' : '✓'}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={currentSEO.title}
                    onChange={e => handleUpdatePageSEO('title', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:border-transparent transition-all"
                    placeholder="e.g. Custom Software & Mobile App Development Company in India | Taskmare Labs"
                  />
                </div>

                {/* 2. Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Meta Description (&lt;meta name=&quot;description&quot;&gt;) <span className="text-[#E11D48]">*</span>
                    </label>
                    <span className={`text-[10px] font-mono font-bold ${currentSEO.description.length > 160 ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {currentSEO.description.length} / 160 chars (recommended: 120–160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={currentSEO.description}
                    onChange={e => handleUpdatePageSEO('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:border-transparent transition-all"
                    placeholder="Concise, high-converting summary of your services and value proposition..."
                  />
                </div>

                {/* 3. Meta Keywords */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                    Meta Keywords (&lt;meta name=&quot;keywords&quot;&gt;)
                  </label>
                  <input
                    type="text"
                    value={currentSEO.keywords || ''}
                    onChange={e => handleUpdatePageSEO('keywords', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48] focus:border-transparent transition-all"
                    placeholder="custom software development company, mobile app development, flutter, android..."
                  />
                  <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                    Comma-separated keywords targeting search indexers and generative AI models.
                  </p>
                </div>

                {/* 4. OpenGraph Title & Description Custom Overrides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        OpenGraph Title (og:title)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleUpdatePageSEO('ogTitle', currentSEO.title)}
                        className="text-[10px] font-mono text-[#E11D48] hover:underline"
                      >
                        Copy Page Title
                      </button>
                    </div>
                    <input
                      type="text"
                      value={currentSEO.ogTitle || ''}
                      onChange={e => handleUpdatePageSEO('ogTitle', e.target.value)}
                      placeholder={currentSEO.title || 'Defaults to page title'}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        OpenGraph Description (og:description)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleUpdatePageSEO('ogDescription', currentSEO.description)}
                        className="text-[10px] font-mono text-[#E11D48] hover:underline"
                      >
                        Copy Description
                      </button>
                    </div>
                    <input
                      type="text"
                      value={currentSEO.ogDescription || ''}
                      onChange={e => handleUpdatePageSEO('ogDescription', e.target.value)}
                      placeholder={currentSEO.description || 'Defaults to meta description'}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                    />
                  </div>
                </div>

                {/* 5. Canonical URL & Image URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      Canonical URL (&lt;link rel=&quot;canonical&quot;&gt;)
                    </label>
                    <input
                      type="url"
                      value={currentSEO.canonicalUrl || ''}
                      onChange={e => handleUpdatePageSEO('canonicalUrl', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                      placeholder="https://taskmare.online/"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      Social Share Image URL (og:image &amp; twitter:image)
                    </label>
                    <input
                      type="text"
                      value={currentSEO.ogImage || ''}
                      onChange={e => handleUpdatePageSEO('ogImage', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                      placeholder="/assets/taskmare/creative-post.png"
                    />
                  </div>
                </div>

                {/* 6. Card Type & Robots Directives */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      OpenGraph Type (og:type)
                    </label>
                    <select
                      value={currentSEO.ogType || 'website'}
                      onChange={e => handleUpdatePageSEO('ogType', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    >
                      <option value="website">website</option>
                      <option value="article">article</option>
                      <option value="profile">profile</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      Twitter Card Style
                    </label>
                    <select
                      value={currentSEO.twitterCard || 'summary_large_image'}
                      onChange={e => handleUpdatePageSEO('twitterCard', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    >
                      <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                      <option value="summary">summary (Square Thumbnail)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      Robots Directive
                    </label>
                    <input
                      type="text"
                      value={currentSEO.robots || 'index, follow'}
                      onChange={e => handleUpdatePageSEO('robots', e.target.value)}
                      placeholder="index, follow, max-snippet:-1"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANALYTICS & WEBMASTER VERIFICATION */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                <p>
                  Configure your analytics tracking IDs and search engine ownership tokens. When enabled and saved, the engine immediately mounts the official SDKs into the page head.
                </p>
              </div>

              {/* Google Analytics GA4 */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#E11D48]" />
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Google Analytics (GA4)</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                      {config.analytics.googleAnalyticsEnabled ? 'Active' : 'Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={config.analytics.googleAnalyticsEnabled}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        analytics: { ...prev.analytics, googleAnalyticsEnabled: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-neutral-300 text-[#E11D48] focus:ring-[#E11D48]"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={config.analytics.googleAnalyticsId || ''}
                  onChange={e => setConfig(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, googleAnalyticsId: e.target.value }
                  }))}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
              </div>

              {/* Google Tag Manager */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Google Tag Manager (GTM)</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                      {config.analytics.googleTagManagerEnabled ? 'Active' : 'Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={config.analytics.googleTagManagerEnabled}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        analytics: { ...prev.analytics, googleTagManagerEnabled: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-neutral-300 text-[#E11D48] focus:ring-[#E11D48]"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={config.analytics.googleTagManagerId || ''}
                  onChange={e => setConfig(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, googleTagManagerId: e.target.value }
                  }))}
                  placeholder="GTM-XXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
              </div>

              {/* Meta / Facebook Pixel */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Meta / Facebook Pixel</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                      {config.analytics.metaPixelEnabled ? 'Active' : 'Disabled'}
                    </span>
                    <input
                      type="checkbox"
                      checked={config.analytics.metaPixelEnabled}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        analytics: { ...prev.analytics, metaPixelEnabled: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-neutral-300 text-[#E11D48] focus:ring-[#E11D48]"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={config.analytics.metaPixelId || ''}
                  onChange={e => setConfig(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, metaPixelId: e.target.value }
                  }))}
                  placeholder="e.g. 123456789012345"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                />
              </div>

              {/* Search Console & Webmaster Verification */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">Webmaster Site Verification Tokens</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                    Google Search Console (content code for google-site-verification)
                  </label>
                  <input
                    type="text"
                    value={config.verification.googleSiteVerification || ''}
                    onChange={e => setConfig(prev => ({
                      ...prev,
                      verification: { ...prev.verification, googleSiteVerification: e.target.value }
                    }))}
                    placeholder="e.g. AbC123dEf456GhI789"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                    Bing Webmaster Tools (msvalidate.01)
                  </label>
                  <input
                    type="text"
                    value={config.verification.bingSiteVerification || ''}
                    onChange={e => setConfig(prev => ({
                      ...prev,
                      verification: { ...prev.verification, bingSiteVerification: e.target.value }
                    }))}
                    placeholder="e.g. 1234567890ABCDEF1234567890ABCDEF"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                    Yandex Verification (yandex-verification)
                  </label>
                  <input
                    type="text"
                    value={config.verification.yandexVerification || ''}
                    onChange={e => setConfig(prev => ({
                      ...prev,
                      verification: { ...prev.verification, yandexVerification: e.target.value }
                    }))}
                    placeholder="e.g. 123456789abcdef"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM SCRIPTS & STYLES */}
          {activeTab === 'scripts' && (
            <div className="space-y-6">
              {/* Quick Preset Templates */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Insert One-Click Preset Templates:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'ga4', label: 'Google Analytics 4' },
                    { key: 'meta-pixel', label: 'Meta Pixel' },
                    { key: 'crisp', label: 'Crisp Live Chat' },
                    { key: 'css-theme', label: 'Custom CSS Style' },
                    { key: 'html-banner', label: 'HTML Notice Bar' },
                  ].map(tmpl => (
                    <button
                      key={tmpl.key}
                      type="button"
                      onClick={() => handleApplyPresetTemplate(tmpl.key)}
                      className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-[#E11D48] hover:text-[#E11D48] transition-all cursor-pointer"
                    >
                      + {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form to add or edit a script */}
              <form 
                ref={editorFormRef}
                onSubmit={handleSaveOrUpdateScript} 
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  editingScriptId 
                    ? 'border-[#E11D48] bg-red-500/5 dark:bg-red-500/10 shadow-md' 
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    {editingScriptId ? (
                      <Pencil className="w-4 h-4 text-[#E11D48]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#E11D48]" />
                    )}
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {editingScriptId ? `Editing: ${newScriptName || 'Script'}` : 'Add Any Code, Script, or Style'}
                    </span>
                  </div>

                  {editingScriptId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {/* Code Type Selector */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 mb-1.5">Code Format / Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'javascript' as CodeType, label: 'JavaScript (<script>)', icon: Code },
                      { type: 'css' as CodeType, label: 'CSS (<style>)', icon: FileCode },
                      { type: 'html' as CodeType, label: 'HTML Embed / Markup', icon: Layers },
                    ].map(t => {
                      const Icon = t.icon;
                      const isSelected = newScriptType === t.type;
                      return (
                        <button
                          key={t.type}
                          type="button"
                          onClick={() => setNewScriptType(t.type)}
                          className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#E11D48] bg-white dark:bg-neutral-800 text-[#E11D48] shadow-xs'
                              : 'border-neutral-200 dark:border-neutral-700 bg-neutral-100/60 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="truncate">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 mb-1">Snippet Name / Purpose</label>
                    <input
                      type="text"
                      required
                      value={newScriptName}
                      onChange={e => setNewScriptName(e.target.value)}
                      placeholder="e.g. Meta Pixel, Crisp Chat Widget, Custom CSS"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 mb-1">Injection Destination</label>
                    <select
                      value={newScriptLocation}
                      onChange={e => setNewScriptLocation(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    >
                      <option value="head">&lt;head&gt; (Analytics, Verification, Custom CSS)</option>
                      <option value="body">&lt;body&gt; (Chatbots, Widgets, HTML Embeds, Pixels)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-neutral-500">
                      Code Editor ({newScriptType.toUpperCase()})
                    </label>
                    <button
                      type="button"
                      onClick={handleTestSnippet}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#E11D48] dark:hover:text-[#E11D48] transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-[#E11D48]" />
                      <span>Test / Validate Code</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    required
                    value={newScriptCode}
                    onChange={e => {
                      setNewScriptCode(e.target.value);
                      if (testResult) setTestResult(null);
                    }}
                    placeholder={
                      newScriptType === 'css' 
                        ? '/* Enter CSS rules */\nbody {\n  font-smooth: always;\n}' 
                        : newScriptType === 'html'
                        ? '<!-- Enter HTML tags or embed code -->\n<div class="banner">Welcome!</div>'
                        : '// Enter JavaScript code or <script> tags\nconsole.log("Custom script active");'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-950 text-emerald-400 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#E11D48]"
                    spellCheck={false}
                  />

                  {/* Inline Test Result Feedback */}
                  {testResult && (
                    <div className={`mt-2 p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
                      testResult.success 
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
                    }`}>
                      {testResult.success ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <span>{testResult.message}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Changes take effect on page when saved.
                  </div>
                  <div className="flex items-center gap-2">
                    {editingScriptId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn-tactile-primary px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                    >
                      {editingScriptId ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Update Code Changes</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Code Registry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Existing Scripts & Codes List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Active Code Registry ({config.customScripts.length})
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Click Pencil to edit any code snippet
                  </span>
                </div>

                {config.customScripts.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-xs font-mono border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
                    No custom code snippets registered yet. Use the editor above to add one.
                  </div>
                ) : (
                  config.customScripts.map(script => (
                    <div 
                      key={script.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        editingScriptId === script.id
                          ? 'border-[#E11D48] bg-red-500/5'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${script.enabled ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {script.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                            {script.type || 'JS'}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                            &lt;{script.location}&gt;
                          </span>
                        </div>
                        <pre className="mt-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate bg-neutral-50 dark:bg-neutral-950 p-2 rounded max-w-xl border border-neutral-200/60 dark:border-neutral-800/60">
                          {script.code}
                        </pre>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEditScript(script)}
                          className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-[#E11D48] hover:border-[#E11D48] transition-all cursor-pointer"
                          title="Edit this code snippet"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleScript(script.id)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                            script.enabled
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {script.enabled ? 'Enabled' : 'Disabled'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteScript(script.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete script"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SCHEMA.ORG JSON-LD */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-purple-500" />
                <p>
                  Schema.org structured data (JSON-LD) powers Google Rich Results, knowledge graph cards, and gives AI models like ChatGPT, Gemini, and Claude exact facts about your company.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider">
                    Organization &amp; Business Profile
                  </h4>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.structuredData.enableLocalBusinessSchema}
                        onChange={e => setConfig(prev => ({
                          ...prev,
                          structuredData: { ...prev.structuredData, enableLocalBusinessSchema: e.target.checked }
                        }))}
                        className="rounded border-neutral-300 text-[#E11D48] focus:ring-[#E11D48]"
                      />
                      <span>LocalBusiness Schema</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.structuredData.enableFaqSchema}
                        onChange={e => setConfig(prev => ({
                          ...prev,
                          structuredData: { ...prev.structuredData, enableFaqSchema: e.target.checked }
                        }))}
                        className="rounded border-neutral-300 text-[#E11D48] focus:ring-[#E11D48]"
                      />
                      <span>FAQPage Schema</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Organization / Studio Name
                    </label>
                    <input
                      type="text"
                      value={config.structuredData.organizationName || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, organizationName: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Official Website URL
                    </label>
                    <input
                      type="url"
                      value={config.structuredData.organizationUrl || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, organizationUrl: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Direct Phone
                    </label>
                    <input
                      type="text"
                      value={config.structuredData.telephone || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, telephone: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Direct Contact Email
                    </label>
                    <input
                      type="email"
                      value={config.structuredData.email || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, email: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      Logo Asset URL
                    </label>
                    <input
                      type="text"
                      value={config.structuredData.logoUrl || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, logoUrl: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Address Details */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-neutral-500 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={config.structuredData.streetAddress || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, streetAddress: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 mb-1">State / Region</label>
                    <input
                      type="text"
                      value={config.structuredData.addressRegion || ''}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, addressRegion: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 mb-1">Country Code</label>
                    <input
                      type="text"
                      value={config.structuredData.addressCountry || 'IN'}
                      onChange={e => setConfig(prev => ({
                        ...prev,
                        structuredData: { ...prev.structuredData, addressCountry: e.target.value }
                      }))}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Social Profiles / sameAs Links */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Social Profiles (sameAs links for Knowledge Graph)
                  </label>
                  
                  <div className="space-y-1.5">
                    {config.structuredData.socialLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <LinkIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <input
                          type="url"
                          value={link}
                          onChange={e => {
                            const val = e.target.value;
                            setConfig(prev => ({
                              ...prev,
                              structuredData: {
                                ...prev.structuredData,
                                socialLinks: prev.structuredData.socialLinks.map((l, i) => i === idx ? val : l)
                              }
                            }));
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(idx)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Remove social link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="url"
                      value={newSocialUrl}
                      onChange={e => setNewSocialUrl(e.target.value)}
                      placeholder="Add social profile link (e.g. https://www.linkedin.com/company/...)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleAddSocialLink}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-[#E11D48] hover:text-white transition-all cursor-pointer"
                    >
                      + Add Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EXPORT CODE */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    TypeScript Configuration Output
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Copy and paste into <code className="text-[#E11D48]">src/config/seoConfig.ts</code> to permanently commit changes to repository code.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyExport}
                  className="btn-tactile-primary px-3.5 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Config Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-[11px] overflow-x-auto max-h-96 border border-neutral-800 leading-relaxed select-all">
                {exportConfigAsCode(config)}
              </pre>
            </div>
          )}

          {/* TAB 6: ADMIN SECURITY & PASSKEY SETTINGS */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl mx-auto py-2">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Restricted Admin Access Protected</div>
                  <p className="mt-0.5 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    This control center allows live modification of search indexing and JavaScript execution. You can change your master admin passkey below. Keep this passkey confidential.
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdatePasskey} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <KeyRound className="w-4 h-4 text-[#E11D48]" />
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                    Change Master Admin Passkey
                  </h4>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1">Current Passkey</label>
                  <input
                    type="password"
                    required
                    value={currentPasskey}
                    onChange={e => setCurrentPasskey(e.target.value)}
                    placeholder="Enter current passkey..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1">New Passkey (min 6 characters)</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPasskey}
                    onChange={e => setNewPasskey(e.target.value)}
                    placeholder="Enter new passkey..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1">Confirm New Passkey</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPasskey}
                    onChange={e => setConfirmPasskey(e.target.value)}
                    placeholder="Re-enter new passkey..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-mono"
                  />
                </div>

                {passkeyStatus && (
                  <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    passkeyStatus.success
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                  }`}>
                    {passkeyStatus.success ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    <span>{passkeyStatus.message}</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="btn-tactile-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Update Passkey</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1.5 animate-pulse">
                <Check className="w-4 h-4" />
                Saved &amp; Applied Live!
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="btn-tactile-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
