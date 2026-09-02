import React, { useState } from 'react';
import { EmailProviderConfig, AuthSession } from './types';
import { ProviderButtons } from './components/ProviderButtons';
import { LoginModal } from './components/LoginModal';
import { InvitationViewer } from './components/InvitationViewer';
import { GreenvelopeBirdLogo } from './components/ProviderIcons';
import { Lock, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [selectedProvider, setSelectedProvider] = useState<EmailProviderConfig | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);

  const handleProviderSelect = (provider: EmailProviderConfig) => {
    setSelectedProvider(provider);
  };

  const handleLoginSuccess = (email: string, provider: EmailProviderConfig) => {
    const avatarLetter = email.charAt(0).toUpperCase() || 'U';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setSession({
      providerId: provider.id,
      email,
      loginTime: now,
      authenticated: true,
      avatarLetter
    });
    setSelectedProvider(null);
  };

  const handleSignOut = () => {
    setSession(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden box-border">
      {/* Main Content Area */}
      <main className={`w-full flex flex-col items-center justify-center my-auto transition-all ${session ? 'max-w-3xl' : 'max-w-md'} box-border`}>
        {session ? (
          /* Authenticated User View -> Interactive Invitation */
          <InvitationViewer 
            session={session} 
            onSignOut={handleSignOut} 
          />
        ) : (
          /* Responsive Webpage Card matching exact layout */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 text-center box-border"
            id="invitation-login-card"
          >
            {/* Greenvelope Logo */}
            <div className="flex justify-center">
              <GreenvelopeBirdLogo className="w-13 h-13" />
            </div>

            {/* Headline */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
              Manage your Online Invitations &amp; Greeting Card
            </h1>

            {/* Subtitle instructions */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed px-1">
              To view the invitation, please select your email provider below and log in. You were invited to access the invitation on Greenvelope.
            </p>

            {/* Provider Button List */}
            <ProviderButtons onSelectProvider={handleProviderSelect} />

            {/* Description below buttons */}
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Online Invitations &amp; Birthday Cards, greenvelope simplifies event planning with user-friendly tools for managing online invitations and greeting cards.
            </p>

            {/* Copyright footer in card */}
            <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-700/60">
              © 2026 Sincere Corporation, greenvelope is a registered trademark. All rights reserved.
            </p>
          </motion.div>
        )}
      </main>

      {/* Login Authentication Modal */}
      {selectedProvider && (
        <LoginModal
          provider={selectedProvider}
          isOpen={Boolean(selectedProvider)}
          onClose={() => setSelectedProvider(null)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
