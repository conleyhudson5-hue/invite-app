import React from 'react';
import { EMAIL_PROVIDERS } from '../data/providers';
import { EmailProviderConfig } from '../types';
import {
  OutlookIcon,
  Office365Icon,
  GmailIcon,
  YahooIcon,
  AolIcon,
  OtherMailIcon
} from './ProviderIcons';
import { motion } from 'motion/react';

interface ProviderButtonsProps {
  onSelectProvider: (provider: EmailProviderConfig) => void;
  disabled?: boolean;
}

export const ProviderButtons: React.FC<ProviderButtonsProps> = ({
  onSelectProvider,
  disabled = false
}) => {
  const getIcon = (type: EmailProviderConfig['iconType']) => {
    switch (type) {
      case 'outlook':
        return <OutlookIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      case 'office365':
        return <Office365Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      case 'gmail':
        return <GmailIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      case 'yahoo':
        return <YahooIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      case 'aol':
        return <AolIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      case 'other':
        return <OtherMailIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2.5 my-2" id="provider-buttons-container">
      {EMAIL_PROVIDERS.map((provider, index) => (
        <motion.button
          key={provider.id}
          id={`btn-provider-${provider.id}`}
          onClick={() => onSelectProvider(provider)}
          disabled={disabled}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.05 }}
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.985 }}
          className={`
            relative group w-full py-2.5 px-3.5 rounded-full
            flex items-center justify-start gap-3.5
            text-white font-medium text-sm sm:text-base tracking-wide
            shadow-md transition-all duration-200
            border border-white/20 overflow-hidden cursor-pointer
            ${provider.bgClass}
          `}
          style={{
            boxShadow: '0 3px 10px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.3)'
          }}
        >
          {/* Subtle glossy top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-full" />
          
          {/* Bright, high-contrast white circular badge container for crisp logo visibility */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md border border-white/90 p-1 group-hover:scale-105 transition-transform">
            {getIcon(provider.iconType)}
          </div>

          {/* Provider Label */}
          <span className="flex-1 text-left font-semibold text-shadow-sm truncate">
            {provider.label}
          </span>

          {/* Right indicator */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-wider text-white/90 pr-1.5 hidden sm:inline">
            Connect &rarr;
          </span>
        </motion.button>
      ))}
    </div>
  );
};
