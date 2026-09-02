import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Outlook Logo - Blue O badge with envelope and white letter
export const OutlookIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="15" y="6" width="13" height="20" rx="1.5" fill="#0078D4" />
    <path d="M15 8.5L28 17.5V7.5L15 6V8.5Z" fill="#28A8EA" />
    <path d="M15 17.5L28 17.5V26L15 24.5V17.5Z" fill="#005A9E" opacity="0.8" />
    <rect x="3" y="5" width="15" height="22" rx="2.5" fill="#0078D4" />
    <circle cx="10.5" cy="16" r="4.8" fill="#FFFFFF" />
    <circle cx="10.5" cy="16" r="2.6" fill="#0078D4" />
  </svg>
);

// 2. Office 365 Logo - Classic Orange 3D isometric perspective logo matching the user uploaded images.png
export const Office365Icon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Classic Office 365 Orange isometric structure matching images.png */}
    {/* Left vertical door flap */}
    <path
      d="M14.5 25.5V74.5L31.5 69.5V26.5L14.5 25.5Z"
      fill="#EB3C00"
    />
    {/* Top roof arch & Right main perspective block */}
    <path
      d="M31.5 26.5L60.5 21.5V82.5L85.5 85.5V8.5L60.5 8.5L31.5 26.5Z"
      fill="#EB3C00"
    />
    {/* Bottom angled wedge connecting to lowest front point */}
    <path
      d="M14.5 74.5L60.5 91.5V82.5L14.5 74.5Z"
      fill="#EB3C00"
    />
  </svg>
);

// 3. Gmail Logo - Official modern Google Workspace 4-color M logo matching the user uploaded gmail.jpg
export const GmailIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Blue Column */}
    <path
      d="M8 19.5V48.5C8 51.8 10.7 54.5 14 54.5H19V28.5L8 19.5Z"
      fill="#4285F4"
    />
    {/* Right Green Column */}
    <path
      d="M56 19.5V48.5C56 51.8 53.3 54.5 50 54.5H45V28.5L56 19.5Z"
      fill="#34A853"
    />
    {/* Center Red V Fold & Top bar */}
    <path
      d="M19 28.5L32 39L45 28.5V16C45 11.6 39.8 9 36.2 11.8L32 15.2L27.8 11.8C24.2 9 19 11.6 19 16V28.5Z"
      fill="#EA4335"
    />
    {/* Left Red Corner Upper Overlap */}
    <path
      d="M8 19.5L19 28.5V16C19 11.6 13.8 9 10.2 11.8L8 13.5V19.5Z"
      fill="#C5221F"
    />
    {/* Right Yellow Corner Upper Overlap */}
    <path
      d="M56 19.5L45 28.5V16C45 11.6 50.2 9 53.8 11.8L56 13.5V19.5Z"
      fill="#FBBC04"
    />
  </svg>
);

// 4. Yahoo Mail Icon - Crisp Yahoo signature purple logo
export const YahooIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="28" height="28" rx="6" fill="#6001D2" />
    <path
      d="M7 8.5L13 16.5V23.5H19V16.5L25 8.5H19.5L16 13.8L12.5 8.5H7Z"
      fill="#FFFFFF"
    />
    <circle cx="24.5" cy="22.5" r="2" fill="#FF0033" />
  </svg>
);

// 5. AOL Icon - Crisp AOL black & white pill badge
export const AolIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="28" height="28" rx="14" fill="#111827" />
    <text
      x="16"
      y="20.5"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="11.5"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
      letterSpacing="-0.5px"
    >
      Aol.
    </text>
  </svg>
);

// 6. Other Mail / Webmail Icon
export const OtherMailIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="6" width="26" height="20" rx="4" fill="#2563eb" />
    <path
      d="M4 8L16 17.5L28 8"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Greenvelope Brand Logo
export const GreenvelopeBirdLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    <path
      d="M14 19L24 27L34 19"
      stroke="#cbd5e1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 18C13 16.8954 13.8954 16 15 16H33C34.1046 16 35 16.8954 35 18V30C35 31.1046 34.1046 32 33 32H15C13.8954 32 13 31.1046 13 30V18Z"
      stroke="#94a3b8"
      strokeWidth="1.8"
    />
    <path
      d="M24 12C21 15 19 19 24 23C29 19 27 15 24 12Z"
      fill="#38bdf8"
      opacity="0.85"
    />
  </svg>
);
