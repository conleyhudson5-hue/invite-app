import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, FileCode } from 'lucide-react';

export const PhpBackendSnippet: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const phpCode = `<?php
/**
 * Greenvelope Invitation Authentication Gateway & Handler
 * Secure OAuth / IMAP Handshake & Ticket Verification
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read incoming JSON payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$provider = filter_var($data['provider'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email    = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$password = $data['password'] ?? '';

if (!$email || empty($password)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Valid email and password credentials are required.'
    ]);
    exit();
}

// In production: Authenticate with Microsoft Graph, Google Identity API, or IMAP SSL
// Simulate authenticated access token generation
$sessionToken = bin2hex(random_bytes(32));
$invitationId = 'gala-2026';

$response = [
    'status' => 'success',
    'authenticated' => true,
    'user' => [
        'email' => $email,
        'provider' => $provider,
        'loginTime' => date('Y-m-d H:i:s'),
        'sessionToken' => $sessionToken
    ],
    'invitation' => [
        'id' => $invitationId,
        'accessGranted' => true,
        'role' => 'Guest Invitee',
        'portalUrl' => 'https://bowlinvit.site/view?token=' . $sessionToken
    ]
];

http_response_code(200);
echo json_encode($response, JSON_PRETTY_PRINT);
`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(phpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-5 text-slate-200 text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white text-sm">PHP Backend Authentication Script (auth.php)</span>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy PHP Code'}</span>
        </button>
      </div>

      <pre className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto text-emerald-300 border border-slate-800">
        <code>{phpCode}</code>
      </pre>
    </div>
  );
};
