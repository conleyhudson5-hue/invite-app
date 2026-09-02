import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

// Microsoft 4-color grid logo + Wordmark
export const MicrosoftLogo: React.FC<LogoProps> = ({ className = "h-6" }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
      <div className="bg-[#f25022] w-2 h-2" />
      <div className="bg-[#7fba00] w-2 h-2" />
      <div className="bg-[#00a4ef] w-2 h-2" />
      <div className="bg-[#ffb900] w-2 h-2" />
    </div>
    <span className="font-semibold text-base text-[#737373] tracking-normal font-['Segoe_UI',-apple-system,sans-serif]">
      Microsoft
    </span>
  </div>
);

// Outlook modern icon
export const OutlookModernIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="2" y="4" width="13" height="16" rx="2" fill="#0078D4" />
    <path d="M15 7.5L21 4V20L15 16.5V7.5Z" fill="#28A8EA" />
    <circle cx="8.5" cy="12" r="3.5" fill="#FFFFFF" />
    <circle cx="8.5" cy="12" r="2" fill="#0078D4" />
  </svg>
);

// Yahoo bold wordmark
export const YahooLogo: React.FC<LogoProps> = ({ className = "h-8" }) => (
  <div className={`flex items-baseline select-none ${className}`}>
    <span className="text-3xl font-black tracking-tight text-[#6001d2] font-['Helvetica_Neue',Helvetica,sans-serif] italic">
      yahoo!
    </span>
  </div>
);

// Google 4-color logo
export const GoogleColorLogo: React.FC<LogoProps> = ({ className = "h-6" }) => (
  <svg viewBox="0 0 272 92" className={className}>
    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
    <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
    <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-14.7-8.15l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
    <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.35 53.8.35 34.83.35 15.86 16.32.31 35.3.31c10.42 0 17.9 4.08 23.44 9.37l-6.6 6.6c-4.03-3.78-9.49-6.72-16.84-6.72-13.61 0-24.44 11.01-24.44 24.62s10.83 24.62 24.44 24.62c8.82 0 13.84-3.53 17.05-6.75 2.65-2.65 4.37-6.47 5.08-11.68H35.29z" fill="#4285F4" />
  </svg>
);

// AOL wordmark
export const AolWordmark: React.FC<LogoProps> = ({ className = "h-7" }) => (
  <div className={`flex items-baseline font-black tracking-tight text-2xl text-black ${className}`}>
    <span>Aol.</span>
  </div>
);
