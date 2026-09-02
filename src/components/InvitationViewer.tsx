import React, { useState, useEffect } from 'react';
import { InvitationDetails, AuthSession } from '../types';
import { SAMPLE_INVITATIONS } from '../data/mockInvitations';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  XCircle,
  Users,
  Utensils,
  MessageSquare,
  LogOut,
  Navigation,
  PartyPopper,
  Info,
  Share2
} from 'lucide-react';
import {
  OutlookIcon,
  Office365Icon,
  GmailIcon,
  YahooIcon,
  AolIcon,
  OtherMailIcon
} from './ProviderIcons';

interface InvitationViewerProps {
  session: AuthSession;
  onSignOut: () => void;
}

export const InvitationViewer: React.FC<InvitationViewerProps> = ({
  session,
  onSignOut
}) => {
  const [activeInvitation, setActiveInvitation] = useState<InvitationDetails>(SAMPLE_INVITATIONS[0]);
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(false);
  const [hasUnsealed, setHasUnsealed] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'rsvp' | 'schedule' | 'venue'>('card');
  const [copiedLink, setCopiedLink] = useState(false);

  // RSVP Form State
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined' | 'tentative' | null>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [messageToHost, setMessageToHost] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(activeInvitation.isoDateTime).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeInvitation]);

  const handleUnsealEnvelope = () => {
    setIsOpenEnvelope(true);
    setHasUnsealed(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e0a96d', '#38bdf8', '#a855f7']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#ffd700', '#ff9a9e']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#38bdf8', '#a855f7', '#4ade80']
        });
      }, 300);
    } catch {
      // ignore
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenvelope//Event Invitation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${activeInvitation.title}
DESCRIPTION:${activeInvitation.subtitle} - Hosts: ${activeInvitation.hosts}
LOCATION:${activeInvitation.venueName}, ${activeInvitation.venueAddress}
DTSTART:20261024T183000Z
DTEND:20261024T233000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeInvitation.id}-invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getProviderIcon = () => {
    switch (session.providerId) {
      case 'outlook':
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <OutlookIcon className="w-3.5 h-3.5" />
          </span>
        );
      case 'office365':
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <Office365Icon className="w-3.5 h-3.5" />
          </span>
        );
      case 'gmail':
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <GmailIcon className="w-3.5 h-3.5" />
          </span>
        );
      case 'yahoo':
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <YahooIcon className="w-3.5 h-3.5" />
          </span>
        );
      case 'aol':
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <AolIcon className="w-3.5 h-3.5" />
          </span>
        );
      case 'other':
      default:
        return (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
            <OtherMailIcon className="w-3.5 h-3.5" />
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 box-border" id="invitation-viewer-root">
      {/* Top Authenticated Ribbon - Responsive and never overflows */}
      <div className="w-full bg-slate-800/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 box-border overflow-hidden">
        {/* User identification info */}
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
            {session.avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Verified Guest
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-300 min-w-0">
                {getProviderIcon()}
                <span className="truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">{session.email}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              Authorized via {session.providerId.toUpperCase()} • Authenticated {session.loginTime}
            </p>
          </div>
        </div>

        {/* Action buttons & invitation selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/60">
          <div className="relative flex-1 sm:flex-initial min-w-0">
            <select
              value={activeInvitation.id}
              onChange={(e) => {
                const found = SAMPLE_INVITATIONS.find(inv => inv.id === e.target.value);
                if (found) {
                  setActiveInvitation(found);
                  setRsvpSubmitted(false);
                }
              }}
              className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer max-w-[220px] truncate"
              id="select-invitation-template"
            >
              {SAMPLE_INVITATIONS.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onSignOut}
            className="px-3 py-1.5 rounded-xl bg-slate-700/80 hover:bg-rose-900/60 hover:text-rose-200 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer shrink-0"
            title="Log out & return to provider select"
            id="btn-sign-out"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span className="inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {!isOpenEnvelope ? (
        /* Envelope Unsealing Stage */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl text-center flex flex-col items-center justify-center min-h-[420px] w-full max-w-full overflow-hidden box-border"
          id="envelope-stage"
        >
          {/* Ambient lighting effects */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="z-10 max-w-md w-full space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
                Exclusive Personal Delivery
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-['Cinzel',serif] tracking-wide leading-snug">
                You have received a private invitation
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Addressed to <span className="font-semibold text-white break-all">{session.email}</span> from {activeInvitation.hosts}.
              </p>
            </div>

            {/* Interactive Envelope Graphic */}
            <div 
              className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] h-44 sm:h-52 bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-600 flex items-center justify-center p-4 cursor-pointer group"
              onClick={handleUnsealEnvelope}
            >
              {/* Envelope flap visual */}
              <div 
                className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-[#334155] rounded-t-2xl shadow-md flex items-center justify-center pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                }}
              />

              {/* Envelope liner pattern */}
              <div className="absolute inset-3 sm:inset-4 bg-slate-900/70 rounded-lg border border-slate-700/60 flex items-center justify-center text-center p-2">
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-serif">
                  {activeInvitation.eventType}
                </span>
              </div>

              {/* Wax Seal / Stamp Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnsealEnvelope();
                }}
                className="relative z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex flex-col items-center justify-center cursor-pointer border-2 border-amber-300/60"
                style={{
                  background: `radial-gradient(circle at 30% 30%, #f59e0b, #b45309 70%, #78350f 100%)`,
                  boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)'
                }}
                id="btn-unseal-wax"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100 animate-pulse" />
                <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-100 tracking-tighter mt-0.5">
                  OPEN
                </span>
              </motion.button>
            </div>

            {/* Call to action */}
            <div className="w-full flex justify-center">
              <button
                onClick={handleUnsealEnvelope}
                className="w-full max-w-xs py-2.5 sm:py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                id="btn-open-invitation"
              >
                <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Click Wax Seal to Open</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Unfolded Invitation Card Experience */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full space-y-4 sm:space-y-6 box-border"
        >
          {/* Responsive 4-Column Navigation Sub-Tabs - Fits completely without pushing outside */}
          <div className="w-full bg-slate-800/90 p-1 sm:p-1.5 rounded-2xl border border-slate-700/80 grid grid-cols-4 gap-1 box-border">
            {[
              { id: 'card', label: 'Card', fullLabel: 'Invitation', icon: Sparkles },
              { id: 'rsvp', label: 'RSVP', fullLabel: 'RSVP', icon: CheckCircle2 },
              { id: 'schedule', label: 'Schedule', fullLabel: 'Schedule', icon: Clock },
              { id: 'venue', label: 'Venue', fullLabel: 'Venue', icon: MapPin },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 sm:py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer min-w-0 w-full text-center
                    ${isActive 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}
                  `}
                  id={`tab-btn-${tab.id}`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    <span className="inline sm:hidden">{tab.label}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Main Invitation Card */}
          {activeTab === 'card' && (
            <div className="w-full space-y-4 sm:space-y-6 box-border">
              {/* Luxury Digital Card Canvas */}
              <div 
                className="relative bg-slate-950 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden text-center text-slate-100 box-border w-full"
                style={{
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.15)'
                }}
              >
                {/* Decorative corner flourishes */}
                <div className="absolute top-3 left-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-3 right-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

                {/* Cover Backdrop with subtle overlay */}
                <div 
                  className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none filter blur-xs"
                  style={{ backgroundImage: `url(${activeInvitation.coverImage})` }}
                />

                <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
                  {/* Event Type Header */}
                  <div className="space-y-1">
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase font-sans">
                      {activeInvitation.eventType}
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-1" />
                  </div>

                  {/* Main Title */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-200 tracking-wide leading-tight px-2">
                    {activeInvitation.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-300 italic font-serif max-w-lg mx-auto px-2">
                    {activeInvitation.subtitle}
                  </p>

                  {/* Host note */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 sm:p-5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg mx-auto">
                    <p className="text-amber-300/90 font-medium mb-1 font-serif text-xs sm:text-sm truncate">
                      Personal Message to {session.email}:
                    </p>
                    <p className="italic text-slate-300">"{activeInvitation.customMessage}"</p>
                  </div>

                  {/* Key Event Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-lg mx-auto text-left pt-1">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5">
                      <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Date</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-100">{activeInvitation.date}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5">
                      <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Time</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-100">{activeInvitation.time}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start space-x-2.5 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Location</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-100">{activeInvitation.venueName}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{activeInvitation.venueAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dress Code Badge */}
                  <div className="inline-flex items-center space-x-2 bg-amber-950/40 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Dress Code:</strong> {activeInvitation.dressCode}</span>
                  </div>
                </div>
              </div>

              {/* Countdown & Quick Action Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
                {/* Countdown Timer */}
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Event Countdown
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 w-full max-w-xs">
                    {[
                      { label: 'Days', val: timeLeft.days },
                      { label: 'Hours', val: timeLeft.hours },
                      { label: 'Mins', val: timeLeft.minutes },
                      { label: 'Secs', val: timeLeft.seconds }
                    ].map((item, i) => (
                      <div key={i} className="text-center bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-1">
                        <span className="text-base sm:text-xl font-bold font-mono text-amber-400 block leading-tight">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] uppercase font-semibold text-slate-400 block mt-0.5">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fast action controls */}
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center space-y-2">
                  <button
                    onClick={() => setActiveTab('rsvp')}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    id="btn-card-rsvp-action"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{rsvpSubmitted ? 'Edit Your RSVP Status' : 'Respond / Submit RSVP'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleDownloadIcs}
                      className="py-2 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">Add to Cal (.ics)</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="py-2 px-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{copiedLink ? 'Link Copied!' : 'Share Card'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RSVP Form */}
          {activeTab === 'rsvp' && (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl max-w-2xl mx-auto space-y-5 w-full box-border">
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-amber-400">
                  Guest Response Form
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                  RSVP for {activeInvitation.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Please confirm by <span className="font-semibold text-amber-300">{activeInvitation.rsvpDeadline}</span>
                </p>
              </div>

              {rsvpSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-5 text-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-emerald-200">
                    RSVP Successfully Confirmed!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-white break-all">{session.email}</span>. Your attendance status ({rsvpStatus?.toUpperCase()}) for <strong>{guestCount} guest(s)</strong> has been recorded.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => setRsvpSubmitted(false)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Update Response
                    </button>
                    <button
                      onClick={() => setActiveTab('card')}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-xs text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Return to Invitation
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4" id="rsvp-interactive-form">
                  {/* Attendance Choice Buttons */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Will you be attending?
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                      {[
                        { id: 'attending', label: 'Accept', fullLabel: 'Accept with Pleasure', icon: CheckCircle2, active: 'border-emerald-500 bg-emerald-950/80 text-emerald-200' },
                        { id: 'declined', label: 'Decline', fullLabel: 'Decline with Regret', icon: XCircle, active: 'border-rose-500 bg-rose-950/80 text-rose-200' },
                        { id: 'tentative', label: 'Tentative', fullLabel: 'Tentative / Maybe', icon: Info, active: 'border-amber-500 bg-amber-950/80 text-amber-200' },
                      ].map(item => {
                        const Icon = item.icon;
                        const isChosen = rsvpStatus === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setRsvpStatus(item.id as any)}
                            className={`
                              p-2 sm:p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer min-w-0
                              ${isChosen ? item.active : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'}
                            `}
                          >
                            <Icon className="w-4 h-4 mb-1 shrink-0" />
                            <span className="text-[11px] sm:text-xs font-bold leading-tight truncate w-full">
                              <span className="inline sm:hidden">{item.label}</span>
                              <span className="hidden sm:inline">{item.fullLabel}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {rsvpStatus === 'attending' && (
                    <>
                      {/* Guest Count */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-indigo-400" />
                          Total Attending Guests (Including You)
                        </label>
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
                          {[1, 2, 3, 4].map(num => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setGuestCount(num)}
                              className={`
                                py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                                ${guestCount === num 
                                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' 
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}
                              `}
                            >
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Guest Names if > 1 */}
                      {guestCount > 1 && (
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="input-guest-names">
                            Accompanying Guest Name(s)
                          </label>
                          <input
                            id="input-guest-names"
                            type="text"
                            value={guestNames}
                            onChange={(e) => setGuestNames(e.target.value)}
                            placeholder="e.g. Jane Doe"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      )}

                      {/* Dietary notes */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" htmlFor="input-dietary">
                          <Utensils className="w-3.5 h-3.5 text-amber-400" />
                          Dietary Preferences or Allergies
                        </label>
                        <input
                          id="input-dietary"
                          type="text"
                          value={dietaryNotes}
                          onChange={(e) => setDietaryNotes(e.target.value)}
                          placeholder="e.g. Vegetarian, Gluten-Free, Nut Allergy, none"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Personal Note to Host */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5" htmlFor="input-host-message">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      Message to Host
                    </label>
                    <textarea
                      id="input-host-message"
                      rows={2}
                      value={messageToHost}
                      onChange={(e) => setMessageToHost(e.target.value)}
                      placeholder="Can't wait to celebrate with you!"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    id="btn-submit-rsvp"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Submit RSVP</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: Event Schedule / Itinerary */}
          {activeTab === 'schedule' && (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl max-w-2xl mx-auto space-y-4 w-full box-border">
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-amber-400">
                  Program Schedule
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                  Event Timeline & Itinerary
                </h3>
                <p className="text-xs text-slate-400">
                  {activeInvitation.date} • {activeInvitation.venueName}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {activeInvitation.schedule.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 sm:p-4 flex items-start space-x-3 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="bg-slate-950 border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-center min-w-[70px] sm:min-w-[80px] shrink-0">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.activity}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Venue & Map */}
          {activeTab === 'venue' && (
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl max-w-2xl mx-auto space-y-4 w-full box-border">
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-amber-400">
                  Location Information
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                  {activeInvitation.venueName}
                </h3>
                <p className="text-xs text-slate-300">
                  {activeInvitation.venueAddress}
                </p>
              </div>

              {/* Simulated Map / Directions Card */}
              <div className="relative bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden h-48 sm:h-56 flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
                    <MapPin className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{activeInvitation.venueName}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 max-w-xs mx-auto">{activeInvitation.venueAddress}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeInvitation.venueName} ${activeInvitation.venueAddress}`)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Parking & Transportation Details */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 text-xs space-y-1.5 text-slate-300">
                <span className="font-bold text-white block">Arrival & Valet Instructions:</span>
                <p>• Complimentary valet parking provided at the main porte-cochère entrance.</p>
                <p>• Rideshare drop-off zone located at the East Portico.</p>
                <p>• For accessibility accommodations, please notify event staff upon arrival.</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
