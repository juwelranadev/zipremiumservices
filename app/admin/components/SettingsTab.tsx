'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'zi_maintenance_mode';

// ── tiny inline SVG icons ─────────────────────────────────────────────────────
const IconGlobe = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);
const IconMail = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconCoin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9.5A3 3 0 0 0 9 9.5c0 1.66 3 3 3 3s3 1.34 3 3a3 3 0 0 1-6 0" />
  </svg>
);
const IconShield = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconLock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconEye = ({ open }: { open: boolean }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
const IconTool = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconSave = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);

// ── reusable field wrapper ────────────────────────────────────────────────────
function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="group">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        <span className="text-purple-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── password input with show/hide toggle ─────────────────────────────────────
function PasswordInput({ placeholder }: { placeholder: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
      >
        <IconEye open={show} />
      </button>
    </div>
  );
}

// ── card wrapper ──────────────────────────────────────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden ${className}`}>
      {/* subtle top-glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      {children}
    </div>
  );
}

// ── section heading ───────────────────────────────────────────────────────────
function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="my-5 border-t border-white/5" />;
}

// ── main component ────────────────────────────────────────────────────────────
export default function SettingsTab() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setMaintenanceMode(stored === 'true');
  }, []);

  const handleToggle = () => {
    const next = !maintenanceMode;
    setMaintenanceMode(next);
    localStorage.setItem(STORAGE_KEY, String(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your site preferences and security</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/15 border border-green-400/30 text-green-300 animate-fade-in">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
            Changes saved
          </span>
        )}
      </div>

      {/* ── General Settings ── */}
      <Card>
        <SectionHeading
          icon={<IconGlobe />}
          title="General Settings"
          subtitle="Basic site identity and display preferences"
        />

        <div className="space-y-4">
          <Field label="Site Name" icon={<IconGlobe />}>
            <input
              type="text"
              defaultValue="ZI PREMIUM SERVICES"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200 text-sm"
            />
          </Field>

          <Field label="Admin Email" icon={<IconMail />}>
            <input
              type="email"
              defaultValue="admin@zipremium.com"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200 text-sm"
            />
          </Field>

          <Field label="Currency" icon={<IconCoin />}>
            <select className="w-full px-4 py-2.5 bg-[#0d0d0d] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/50 transition-all duration-200 text-sm appearance-none cursor-pointer">
              <option className="bg-[#0d0d0d]">BDT (৳)</option>
              <option className="bg-[#0d0d0d]">USDT ($)</option>
            </select>
          </Field>
        </div>

        <Divider />

        {/* Maintenance Toggle */}
        <div className={`relative rounded-xl border p-4 transition-all duration-500 ${maintenanceMode
            ? 'bg-red-950/30 border-red-500/30 shadow-lg shadow-red-950/20'
            : 'bg-white/[0.02] border-white/10'
          }`}>
          {maintenanceMode && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-t-xl" />
          )}

          <div className="flex items-center justify-between gap-4">
            {/* Left: icon + text */}
            <div className="flex items-start gap-3 min-w-0">
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${maintenanceMode ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-400'
                }`}>
                <IconTool />
              </div>
              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white">Maintenance Mode</span>
                  {/* status badge */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border transition-all duration-300 ${maintenanceMode
                      ? 'bg-red-500/20 border-red-400/40 text-red-300'
                      : 'bg-gray-800/60 border-gray-600/40 text-gray-500'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${maintenanceMode ? 'bg-red-400 animate-pulse' : 'bg-gray-600'
                      }`} />
                    {maintenanceMode ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {maintenanceMode
                    ? '⚠️ The maintenance banner is currently shown to all visitors'
                    : 'Show a maintenance banner across the entire site'}
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={handleToggle}
              aria-label="Toggle maintenance mode"
              className={`relative flex-shrink-0 inline-flex h-7 w-13 w-[52px] items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${maintenanceMode
                  ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-600/30 focus:ring-red-500'
                  : 'bg-gray-700 focus:ring-gray-500'
                }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${maintenanceMode ? 'translate-x-[29px]' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* ── Security Settings ── */}
      <Card>
        <SectionHeading
          icon={<IconShield />}
          title="Security Settings"
          subtitle="Update your admin password to keep your account secure"
        />

        <div className="space-y-4">
          <Field label="Current Password" icon={<IconLock />}>
            <PasswordInput placeholder="Enter current password" />
          </Field>

          <Field label="New Password" icon={<IconLock />}>
            <PasswordInput placeholder="Enter new password" />
          </Field>

          <Field label="Confirm Password" icon={<IconLock />}>
            <PasswordInput placeholder="Confirm new password" />
          </Field>
        </div>

        <p className="mt-4 text-xs text-gray-600 flex items-center gap-1.5">
          <IconShield />
          Use at least 8 characters with a mix of letters, numbers & symbols
        </p>
      </Card>

      {/* ── Save Button ── */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200">
          Discard
        </button>
        <button className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white overflow-hidden transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 hover:scale-[1.02] active:scale-[0.98]">
          {/* gradient bg */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:from-purple-500 group-hover:to-pink-500" />
          {/* shimmer sweep */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="relative flex items-center gap-2">
            <IconSave />
            Save Changes
          </span>
        </button>
      </div>
    </div>
  );
}
