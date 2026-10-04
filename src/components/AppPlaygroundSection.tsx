import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Send,
  Eye,
  EyeOff,
  ShieldCheck,
  Wifi,
  Battery,
  Sparkles,
  Cpu,
  Scan,
  CheckCircle2,
  Bell,
  RotateCcw,
  Code2,
  Activity,
  Heart,
  Zap,
  ArrowRight,
  CreditCard,
  TrendingUp,
  MapPin,
  Compass,
  FileText,
  Volume2,
  Sliders,
  DollarSign,
  Plus
} from 'lucide-react';
import { PlatformChoice } from '../types';

interface AppPlaygroundSectionProps {
  onOpenEnquiry: (platform?: PlatformChoice, prefillDetails?: string) => void;
}

type DemoAppType = 'fintech' | 'ai_scanner' | 'logistics' | 'health';
type OSType = 'ios' | 'android';

export const AppPlaygroundSection: React.FC<AppPlaygroundSectionProps> = ({ onOpenEnquiry }) => {
  const [activeApp, setActiveApp] = useState<DemoAppType>('fintech');
  const [activeOS, setActiveOS] = useState<OSType>('ios');
  const [currentTime, setCurrentTime] = useState('09:41');
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture'>('preview');

  // Interactive state for Fintech App
  const [balance, setBalance] = useState(84500.00);
  const [showBalance, setShowBalance] = useState(true);
  const [transferAmount, setTransferAmount] = useState('1500');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferring, setTransferring] = useState(false);

  // Interactive state for AI Scanner
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: string;
    confidence: number;
    tokensPerSec: number;
    extractedFields: Record<string, string>;
  } | null>(null);

  // Interactive state for Logistics
  const [driverPinged, setDriverPinged] = useState(false);
  const [courierProgress, setCourierProgress] = useState(68);

  // Interactive state for Health
  const [heartRate, setHeartRate] = useState(74);
  const [waterCups, setWaterCups] = useState(5);
  const [pulseActive, setPulseActive] = useState(true);

  // Push notification simulator
  const [activeNotification, setActiveNotification] = useState<{
    title: string;
    message: string;
    app: string;
  } | null>(null);

  // Live phone clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Heart rate pulse jitter
  useEffect(() => {
    if (activeApp !== 'health') return;
    const interval = setInterval(() => {
      setHeartRate((prev) => Math.min(88, Math.max(68, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2200);
    return () => clearInterval(interval);
  }, [activeApp]);

  // Trigger push notification helper
  const triggerNotification = (title: string, message: string, app: string) => {
    setActiveNotification({ title, message, app });
    setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
  };

  // Handle Fintech transfer simulation
  const handleTransfer = () => {
    const amountNum = parseFloat(transferAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    setTransferring(true);
    setTimeout(() => {
      setBalance((prev) => Math.max(0, prev - amountNum));
      setTransferring(false);
      setTransferSuccess(true);
      triggerNotification('UPI Payment Sent', `₹${amountNum.toLocaleString('en-IN')} sent via UPI to Priya Verma (priya@okhdfcbank)`, 'BharatPay');
      setTimeout(() => setTransferSuccess(false), 2800);
    }, 800);
  };

  // Handle AI Scan simulation
  const handleRunScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        status: 'B2B Purchase Order & Data Verified',
        confidence: 99.8,
        tokensPerSec: 142,
        extractedFields: {
          'Document': 'Commercial Purchase Order',
          'Order No': 'PO-IND-2026-9812',
          'Service Category': 'Custom Software Development',
          'OCR Speed': '18ms on Neural Engine',
        },
      });
      triggerNotification('Invoice Parsed', 'Extracted vendor, items & totals in 18ms', 'ApexVision AI');
    }, 1200);
  };

  // Handle Driver ping
  const handlePingDriver = () => {
    setDriverPinged(true);
    setCourierProgress((prev) => Math.min(95, prev + 10));
    triggerNotification('Delhivery / Shiprocket Sync', 'Courier vehicle #UP-20-T-8412 confirmed live GPS ping', 'HyperRoute');
    setTimeout(() => setDriverPinged(false), 3000);
  };

  // Reset demo
  const handleResetDemo = () => {
    setBalance(84500.00);
    setTransferAmount('1500');
    setScanResult(null);
    setWaterCups(5);
    setCourierProgress(68);
    setActiveNotification(null);
  };

  const appMeta = {
    fintech: {
      name: 'BharatPay UPI Pro',
      category: 'Indian UPI & Fintech Rails',
      description: 'Zero-latency UPI 1-click checkout with biometric authentication, PhonePe/GPay deep-linking, and instant bank reconciliation.',
      techStack: ['Swift / SwiftUI', 'Kotlin Multiplatform', 'Razorpay & UPI Intent', 'WebSockets', 'Hardware Security Enclave'],
    },
    ai_scanner: {
      name: 'ApexVision Bharat OCR',
      category: 'On-Device Neural Document & OCR Scanner',
      description: 'Local neural inference pipeline running sub-30ms boundary detection, PAN, Aadhaar, and purchase invoice parsing.',
      techStack: ['CoreML / TensorFlow Lite', 'Metal Shaders', 'Rust Core', 'FastAPI Proxy', 'Vector Embeddings'],
    },
    logistics: {
      name: 'HyperRoute India Fleet',
      category: 'Indian Express Telemetry & ONDC',
      description: 'Real-time WebSocket dispatch engine integrated with Shiprocket & Delhivery with offline-first caching for spotty highway connectivity.',
      techStack: ['Flutter Native', 'Node.js Cluster', 'Redis Pub/Sub', 'Mapbox GL', 'MQTT Telemetry'],
    },
    health: {
      name: 'PulseSync Ayushman Health',
      category: 'Digital Health & ABHA Gateway',
      description: 'ABHA (Ayushman Bharat Digital Mission) health record integration with biometric telemetry and doctor e-prescriptions.',
      techStack: ['HealthKit / Health Connect', 'Swift & Kotlin', 'Zero-Knowledge Crypto', 'TimescaleDB', 'Bluetooth LE'],
    },
  };

  return (
    <section id="demo-playground" className="py-20 bg-neutral-900 text-neutral-100 relative overflow-hidden border-y border-neutral-800">
      {/* Ambient background grid & glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E11D48]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#E11D48] mb-3">
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">03</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="uppercase tracking-wider font-bold">Interactive Sandbox</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400 font-medium">Production Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Touch and test the craftsmanship.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-normal">
            We don’t just write code; we engineer 60fps micro-interactions, rock-solid offline sync, and sub-second APIs. Click, toggle, and test our live simulated architectures below.
          </p>
        </div>

        {/* Master Grid: Left Playground Controller, Center Phone Simulator, Right Technical Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: App Category Selector & Hardware Toggles */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-neutral-950/80 rounded-2xl border border-neutral-800 p-5 backdrop-blur-md">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center justify-between">
                <span>Select Live App Experience</span>
                <span className="text-[#E11D48] font-bold">4 Presets</span>
              </h3>

              <div className="space-y-2">
                {(['fintech', 'ai_scanner', 'logistics', 'health'] as DemoAppType[]).map((appKey) => {
                  const info = appMeta[appKey];
                  const isSelected = activeApp === appKey;
                  return (
                    <button
                      key={appKey}
                      type="button"
                      onClick={() => setActiveApp(appKey)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                        isSelected
                          ? 'bg-neutral-800/90 border-[#E11D48]/60 text-white shadow-lg shadow-black/40'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#E11D48] text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {appKey === 'fintech' && <DollarSign className="w-4 h-4" />}
                        {appKey === 'ai_scanner' && <Cpu className="w-4 h-4" />}
                        {appKey === 'logistics' && <Compass className="w-4 h-4" />}
                        {appKey === 'health' && <Activity className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold flex items-center gap-2">
                          <span className="truncate">{info.name}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                          {info.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hardware OS & Simulation Controls */}
            <div className="bg-neutral-950/80 rounded-2xl border border-neutral-800 p-5 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Simulated Device Frame
              </h3>

              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveOS('ios')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeOS === 'ios'
                      ? 'bg-neutral-800 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>iOS (iPhone 16)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOS('android')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeOS === 'android'
                      ? 'bg-neutral-800 text-white shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Android (Pixel 9)</span>
                </button>
              </div>

              {/* Simulation Quick Action Triggers */}
              <div className="pt-2 border-t border-neutral-800 space-y-2">
                <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  Live Event Triggers
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => triggerNotification('TestFlight Release v2.4.0', 'Production build ready for internal QA staging', 'Taskmare CI/CD')}
                    className="py-2 px-2.5 text-xs rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span className="truncate">Simulate Push</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDemo}
                    className="py-2 px-2.5 text-xs rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>

              {/* Instant Inquiry Hook */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry(activeOS === 'ios' ? 'iOS' : 'Android', `Inquiring about ${appMeta[activeApp].name} architecture.`)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#b81424] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Build an app like this</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CENTER: The Interactive Phone Simulator Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[340px] sm:w-[365px] h-[720px] bg-neutral-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-neutral-800 ring-1 ring-white/10 select-none">
              {/* Outer Physical Frame details: Antenna bands & hardware accents */}
              <div className="absolute -left-[9px] top-28 w-[3px] h-10 bg-neutral-700 rounded-l" />
              <div className="absolute -left-[9px] top-42 w-[3px] h-12 bg-neutral-700 rounded-l" />
              <div className="absolute -left-[9px] top-58 w-[3px] h-12 bg-neutral-700 rounded-l" />
              <div className="absolute -right-[9px] top-36 w-[3px] h-16 bg-neutral-700 rounded-r" />

              {/* Inner Screen Display */}
              <div className="relative w-full h-full bg-[#0d1117] rounded-[38px] overflow-hidden flex flex-col text-white font-sans border border-neutral-800/80">
                {/* Phone Top Status Bar */}
                <div className="h-11 px-6 pt-3 flex items-center justify-between text-xs font-semibold text-neutral-300 shrink-0 z-30">
                  <span className="font-mono text-xs">{currentTime}</span>

                  {/* Dynamic Island (iOS) vs Punch Hole (Android) */}
                  {activeOS === 'ios' ? (
                    <div className="h-6 w-24 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 border border-neutral-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-800 mx-auto" />
                  )}

                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Wifi className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono">5G</span>
                    <Battery className="w-3.5 h-3.5 text-neutral-200" />
                  </div>
                </div>

                {/* Simulated Floating Push Notification Banner */}
                {activeNotification && (
                  <div className="absolute top-12 left-3 right-3 z-40 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-top duration-300">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 bg-[#E11D48] rounded-lg text-white shrink-0 mt-0.5">
                        <Bell className="w-3 h-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white truncate">{activeNotification.app}</span>
                          <span className="text-[9px] text-neutral-400 font-mono">Now</span>
                        </div>
                        <p className="text-xs font-semibold text-neutral-200 mt-0.5">{activeNotification.title}</p>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">{activeNotification.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* APP VIEW CONTAINER */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-left custom-scrollbar">
                  {/* APP 1: FINTECH APP (BharatPay) */}
                  {activeApp === 'fintech' && (
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] text-neutral-400">Welcome back,</p>
                          <h4 className="text-sm font-bold text-white">Aarav Sharma</h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-[#E11D48]">
                          AS
                        </div>
                      </div>

                      {/* Card Balance */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/60 shadow-lg relative overflow-hidden">
                        <div className="flex items-center justify-between text-neutral-400 text-xs">
                          <span className="uppercase tracking-wider text-[10px] font-mono">Current UPI Balance</span>
                          <button
                            type="button"
                            onClick={() => setShowBalance(!showBalance)}
                            className="p-1 hover:text-white"
                          >
                            {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="text-2xl font-black text-white mt-1 tracking-tight">
                          {showBalance ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '••••••••'}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <TrendingUp className="w-3 h-3" /> +18.4% monthly cashflow
                          </span>
                          <span className="font-mono text-[10px] text-neutral-300">UPI ID: aarav@okhdfc</span>
                        </div>
                      </div>

                      {/* Quick Transfer Input */}
                      <div className="bg-neutral-900/90 rounded-2xl p-3.5 border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                          <span>Instant UPI Transfer</span>
                          <span className="text-[10px] font-mono text-emerald-400">Zero IMPS fee</span>
                        </div>

                        {/* Recipient avatar chips */}
                        <div className="flex items-center gap-2">
                          <div className="px-2.5 py-1.5 rounded-lg bg-[#E11D48]/20 border border-[#E11D48]/50 text-xs font-medium text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                            <span>Priya Verma</span>
                          </div>
                          <span className="text-[11px] font-mono text-neutral-400">priya@okhdfcbank</span>
                        </div>

                        {/* Amount selector */}
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-2.5 text-xs text-neutral-400">₹</span>
                            <input
                              type="number"
                              value={transferAmount}
                              onChange={(e) => setTransferAmount(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-2 pl-6 pr-3 text-sm text-white font-mono focus:outline-none focus:border-[#E11D48]"
                              placeholder="0.00"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleTransfer}
                            disabled={transferring}
                            className="py-2 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-all disabled:opacity-50 cursor-pointer"
                          >
                            {transferring ? (
                              <span className="animate-spin text-xs">↻</span>
                            ) : transferSuccess ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            ) : (
                              <Send className="w-3.5 h-3.5" />
                            )}
                            <span>{transferring ? 'Paying...' : transferSuccess ? 'Paid!' : 'Pay UPI'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Recent Activities */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                          Recent Bank Settlements
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                              <span>AWS Mumbai Infrastructure</span>
                            </div>
                            <span className="font-mono text-neutral-300">-₹3,450.00</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Razorpay Customer Payout</span>
                            </div>
                            <span className="font-mono text-emerald-400">+₹42,850.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP 2: AI NEURAL SCANNER (ApexVision) */}
                  {activeApp === 'ai_scanner' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] text-neutral-400">Edge Pipeline</p>
                          <h4 className="text-sm font-bold text-white">Local Neural Inference</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                          CoreML Active
                        </span>
                      </div>

                      {/* Camera Viewfinder with Target Grid */}
                      <div className="relative h-48 rounded-2xl bg-neutral-950 border border-neutral-700 overflow-hidden flex flex-col items-center justify-center">
                        {/* Crosshairs & bounding box */}
                        <div className="absolute inset-4 border border-dashed border-[#E11D48]/60 rounded-xl pointer-events-none" />
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#E11D48]" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#E11D48]" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#E11D48]" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#E11D48]" />

                        {/* Animated Laser Scanning Line */}
                        {scanning && (
                          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E11D48] to-transparent animate-bounce [animation-duration:1s]" />
                        )}

                        <Scan className={`w-8 h-8 ${scanning ? 'text-[#E11D48] animate-pulse' : 'text-neutral-500'}`} />
                        <p className="text-[11px] text-neutral-400 mt-2 font-mono">
                          {scanning ? 'Running FP16 quantized model...' : 'Align document or QR pass'}
                        </p>
                      </div>

                      {/* Scan Button */}
                      <button
                        type="button"
                        onClick={handleRunScan}
                        disabled={scanning}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{scanning ? 'Inferencing Token Stream...' : 'Capture & Extract Payload'}</span>
                      </button>

                      {/* Scan Results Output */}
                      {scanResult && (
                        <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-700 text-xs space-y-2 animate-in fade-in">
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {scanResult.status}
                            </span>
                            <span>{scanResult.confidence}%</span>
                          </div>
                          <div className="space-y-1 text-[11px] text-neutral-300 font-mono pt-1 border-t border-neutral-800">
                            {Object.entries(scanResult.extractedFields).map(([key, val]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-neutral-500">{key}:</span>
                                <span>{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* APP 3: LOGISTICS & FLEET (HyperRoute) */}
                  {activeApp === 'logistics' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] text-neutral-400">Active Shipment</p>
                          <h4 className="text-sm font-bold text-white">#TRK-98214-NCR</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold">
                          In Transit
                        </span>
                      </div>

                      {/* Mock Vector Route Map View */}
                      <div className="relative h-44 rounded-2xl bg-neutral-950 border border-neutral-700 overflow-hidden p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#E11D48]" /> Central Logistics Hub · India
                          </span>
                          <span>ETA: 14 mins</span>
                        </div>

                        {/* Progress Route Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-neutral-300">
                            <span>Route Completion</span>
                            <span>{courierProgress}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-[#E11D48] transition-all duration-500 rounded-full"
                              style={{ width: `${courierProgress}%` }}
                            />
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-center justify-between text-[11px]">
                          <div>
                            <p className="font-semibold text-white">Rajesh V. (Driver)</p>
                            <p className="text-[9px] text-neutral-400">EV Cargo Van #04</p>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">-2.4°C Cold</span>
                        </div>
                      </div>

                      {/* Ping Button */}
                      <button
                        type="button"
                        onClick={handlePingDriver}
                        disabled={driverPinged}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>{driverPinged ? 'Telemetry Ping Sent...' : 'Ping Dispatch Telemetry'}</span>
                      </button>
                    </div>
                  )}

                  {/* APP 4: HEALTHTECH & BIOMETRICS (PulseSync) */}
                  {activeApp === 'health' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] text-neutral-400 font-mono">ABHA ID #91-8421-4820</p>
                          <h4 className="text-sm font-bold text-white">Ayushman Digital Health</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-rose-500 animate-pulse" /> Live Tele-OPD
                        </span>
                      </div>

                      {/* Heart Rate Display & SVG ECG Wave */}
                      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-neutral-400 font-mono">Resting Heart Rate</span>
                          <span className="text-2xl font-black text-white font-mono">{heartRate} <span className="text-xs text-neutral-400 font-normal">BPM</span></span>
                        </div>

                        {/* Simulated ECG Wave */}
                        <div className="h-12 w-full flex items-center overflow-hidden">
                          <svg className="w-full h-full stroke-[#E11D48] fill-transparent" viewBox="0 0 300 50">
                            <path
                              d="M0,25 L50,25 L60,10 L70,40 L80,25 L120,25 L130,5 L140,45 L150,25 L200,25 L210,12 L220,38 L230,25 L300,25"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="animate-pulse"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Hydration quick tracker */}
                      <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-white">Hydration Intake</p>
                          <p className="text-[11px] text-neutral-400">{waterCups} / 8 glasses logged</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setWaterCups((prev) => Math.min(12, prev + 1))}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 flex items-center gap-1 text-xs font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Log +250ml</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom App Navigation inside Phone */}
                <div className="h-14 px-6 bg-neutral-950/95 border-t border-neutral-800/80 flex items-center justify-around text-neutral-400 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveApp('fintech')}
                    className={`p-1.5 flex flex-col items-center gap-0.5 ${activeApp === 'fintech' ? 'text-[#E11D48]' : 'hover:text-white'}`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveApp('ai_scanner')}
                    className={`p-1.5 flex flex-col items-center gap-0.5 ${activeApp === 'ai_scanner' ? 'text-[#E11D48]' : 'hover:text-white'}`}
                  >
                    <Scan className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Vision</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveApp('logistics')}
                    className={`p-1.5 flex flex-col items-center gap-0.5 ${activeApp === 'logistics' ? 'text-[#E11D48]' : 'hover:text-white'}`}
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Fleet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveApp('health')}
                    className={`p-1.5 flex flex-col items-center gap-0.5 ${activeApp === 'health' ? 'text-[#E11D48]' : 'hover:text-white'}`}
                  >
                    <Activity className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Health</span>
                  </button>
                </div>

                {/* Home Indicator Bar */}
                <div className="h-4 pb-1 flex justify-center items-center bg-neutral-950 shrink-0">
                  <div className="w-28 h-1 bg-neutral-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Architecture & Engineering Transparency Specs */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-neutral-950/80 rounded-2xl border border-neutral-800 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E11D48] font-semibold mb-3">
                <Code2 className="w-4 h-4" />
                <span>Architecture Deep Dive</span>
              </div>

              <h4 className="text-base font-bold text-white">
                {appMeta[activeApp].name}
              </h4>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                {appMeta[activeApp].description}
              </p>

              {/* Verified Technology Stack Pills */}
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-2.5">
                  Production Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {appMeta[activeApp].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantees & Non-Negotiables */}
              <div className="mt-4 pt-4 border-t border-neutral-800 space-y-2">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  Taskmare Engineering Standards
                </span>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full IP & Source Code Transfer</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>60 FPS Native Performance Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct WhatsApp & TestFlight Builds</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-neutral-500 uppercase">Average Cold Start</p>
                <p className="text-xl font-mono font-bold text-white">&lt; 420ms</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-neutral-500 uppercase">Crash Free Sessions</p>
                <p className="text-xl font-mono font-bold text-emerald-400">99.96%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
