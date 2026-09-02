import { InvitationDetails } from '../types';

export const SAMPLE_INVITATIONS: InvitationDetails[] = [
  {
    id: 'gala-2026',
    title: 'The Annual Luminary Gala & Awards',
    subtitle: 'An Evening of Distinction, Fine Dining & Artistry',
    eventType: 'Formal Evening Gala & Charity Auction',
    hosts: 'The Sincere Foundation & Executive Committee',
    date: 'Saturday, October 24, 2026',
    time: '6:30 PM - 11:30 PM EST',
    isoDateTime: '2026-10-24T18:30:00',
    venueName: 'The St. Regis Grand Ballroom & Terrace',
    venueAddress: 'Two East 55th Street at Fifth Avenue, New York, NY 10022',
    dressCode: 'Black Tie Optional / Formal Evening Attire',
    themeColor: '#d4af37',
    coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    envelopeLiningColor: '#1e293b',
    sealColor: '#c59b27',
    customMessage: 'We have the distinct honor of inviting you as our distinguished guest to celebrate an extraordinary year of impact, culture, and philanthropy.',
    rsvpDeadline: 'October 10, 2026',
    schedule: [
      { time: '6:30 PM', activity: 'Champagne Reception & Red Carpet Arrivals', description: 'Featuring live string quartet and passed canapés on the Mezzanine.' },
      { time: '7:45 PM', activity: 'Welcome Address & Four-Course Dinner', description: 'Curated tasting menu paired with sommelier reserve vintages.' },
      { time: '9:15 PM', activity: 'Honoree Awards Ceremony & Live Auction', description: 'Recognizing visionaries and community leaders.' },
      { time: '10:00 PM', activity: 'Live Jazz Orchestra & Dancing', description: 'Celebratory dessert buffet and signature cocktails.' }
    ]
  },
  {
    id: 'wedding-celebration',
    title: 'Elena & Alexander',
    subtitle: 'Together with their families, request the pleasure of your company',
    eventType: 'Wedding Ceremony & Reception',
    hosts: 'Elena Vance & Alexander Sterling',
    date: 'Sunday, November 15, 2026',
    time: '4:00 PM - 10:00 PM PST',
    isoDateTime: '2026-11-15T16:00:00',
    venueName: 'Villa Bellavista Rose Garden Estate',
    venueAddress: '14200 Meadowview Ridge Road, Sonoma Valley, CA 95476',
    dressCode: 'Cocktail Attire / Garden Elegant',
    themeColor: '#e0a96d',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    envelopeLiningColor: '#33272a',
    sealColor: '#b87d4b',
    customMessage: 'We are so excited to celebrate our special day surrounded by our closest family and friends. Join us as we exchange vows under the Sonoma sunset.',
    rsvpDeadline: 'November 1, 2026',
    schedule: [
      { time: '4:00 PM', activity: 'Arrival & Welcome Drinks', description: 'Sparkling cider & prosecco in the citrus grove.' },
      { time: '4:30 PM', activity: 'Outdoor Ceremony', description: 'Exchange of vows at the Roman Pavilion.' },
      { time: '5:30 PM', activity: 'Cocktail Hour & Lawn Games', description: 'Artisanal cheese boards and acoustic guitar.' },
      { time: '7:00 PM', activity: 'Dinner & Sunset Toasts', description: 'Farm-to-table banquet followed by dancing under fairy lights.' }
    ]
  },
  {
    id: 'birthday-bash',
    title: "Julian's 40th Milestone Celebration",
    subtitle: 'Four Decades of Good Times, Great Friends & Legendary Stories',
    eventType: 'Milestone Birthday Party',
    hosts: 'Hosted by Sarah & Friends',
    date: 'Friday, December 4, 2026',
    time: '7:30 PM - Late',
    isoDateTime: '2026-12-04T19:30:00',
    venueName: 'The Skylight Penthouse & Rooftop Lounge',
    venueAddress: '540 West 26th Street, Chelsea, New York, NY 10001',
    dressCode: 'Smart Casual & Chic',
    themeColor: '#38bdf8',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    envelopeLiningColor: '#0f172a',
    sealColor: '#0284c7',
    customMessage: 'Come ready to toast, roast, and dance the night away! Your presence is the only gift requested.',
    rsvpDeadline: 'November 25, 2026',
    schedule: [
      { time: '7:30 PM', activity: 'Doors Open & Craft Cocktails', description: 'Open bar with signature 80s-inspired drinks.' },
      { time: '8:45 PM', activity: 'Tapas & Heavy Hors d’oeuvres', description: 'Gourmet sliders, sushi bar, and flatbreads.' },
      { time: '9:30 PM', activity: 'Surprise Toast & Birthday Cake', description: 'Short tribute video and custom cake cutting.' },
      { time: '10:00 PM', activity: 'DJ Set & Rooftop Dancing', description: 'DJ spinning throwback classics and current hits.' }
    ]
  }
];
