export interface DemoType {
  id: string;
  name: string;
  description: string;
  duration: string;
  capacity: number;
  features: string[];
  requirements?: string[];
  cost?: string;
}

export const demoTypes: Record<string, DemoType> = {
  virtual: {
    id: 'virtual',
    name: 'Virtual Demo',
    description: 'Interactive online demonstration of costs and usage',
    duration: '45 minutes',
    capacity: 20,
    features: [
      'Cost breakdown analysis',
      'Live usage demonstration',
      'Q&A session',
      'Follow-up resources'
    ],
    cost: 'Free'
  },
  nexus: {
    id: 'nexus',
    name: 'Nexus Event',
    description: 'Premium showcase event at regional hub',
    duration: '4 hours',
    capacity: 100,
    features: [
      'Product demonstrations',
      'Raffle prizes',
      'Free Sherpas',
      'Networking opportunities',
      'Refreshments provided',
      'Expert panels'
    ]
  },
  onsite: {
    id: 'onsite',
    name: 'On-site Friday Demo',
    description: 'Weekly demonstrations with our sales representatives',
    duration: '3 hours (10:00 AM - 1:00 PM)',
    capacity: 15,
    features: [
      'Hands-on demonstration',
      'One-on-one consultation',
      'Product testing',
      'Immediate feedback'
    ],
    requirements: [
      'Friday only',
      'Advanced booking required'
    ]
  },
  onlocation: {
    id: 'onlocation',
    name: 'Premium On-location Demo',
    description: 'Exclusive demonstration at your location',
    duration: 'Full day',
    capacity: 30,
    features: [
      'Customized presentation',
      'Full team support',
      'Environment setup',
      'Extended Q&A',
      'Implementation planning'
    ],
    cost: 'Contact for pricing'
  }
};