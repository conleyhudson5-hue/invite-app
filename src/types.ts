export type EmailProviderId = 
  | 'outlook' 
  | 'office365' 
  | 'gmail' 
  | 'yahoo' 
  | 'aol' 
  | 'other';

export interface EmailProviderConfig {
  id: EmailProviderId;
  name: string;
  label: string;
  bgClass: string;
  hoverClass: string;
  gradientClass: string;
  iconType: 'outlook' | 'office365' | 'gmail' | 'yahoo' | 'aol' | 'other';
  brandColor: string;
  textColor: string;
  defaultEmailSuffix: string;
  portalName: string;
  headerLogoUrl?: string;
  accentBg: string;
}

export interface AuthSession {
  providerId: EmailProviderId;
  email: string;
  loginTime: string;
  authenticated: boolean;
  avatarLetter: string;
}

export interface RSVPData {
  status: 'attending' | 'declined' | 'tentative' | null;
  guestCount: number;
  guestNames: string[];
  dietaryNotes: string;
  messageToHost: string;
  submittedAt?: string;
}

export interface InvitationDetails {
  id: string;
  title: string;
  subtitle: string;
  eventType: string;
  hosts: string;
  date: string;
  time: string;
  isoDateTime: string;
  venueName: string;
  venueAddress: string;
  dressCode: string;
  themeColor: string;
  coverImage: string;
  envelopeLiningColor: string;
  sealColor: string;
  customMessage: string;
  schedule: Array<{
    time: string;
    activity: string;
    description: string;
  }>;
  rsvpDeadline: string;
}
