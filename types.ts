export type TabName = 'overview' | 'request' | 'orders' | 'account';

export type OrderStatus = 
  | 'submitted' 
  | 'verified' 
  | 'scheduled' 
  | 'installed' 
  | 'live' 
  | 'removal_scheduled' 
  | 'reset_completed';

export interface Order {
  id: string;
  spaceType: string;
  address: string;
  productType: string;
  status: OrderStatus;
  installDate: string;
  removalDate: string;
  price: number;
}

export interface ServicePackage {
  id: string;
  type: 'residential' | 'commercial';
  title: string;
  image: string;
  bestFor: string;
  durationLabel: string;
  useCase: string;
  requirements: string[]; // Mapped to "Suitable for" for Residential
  durationSpecs: string[]; // Mapped to "Frequency" or "Duration" options
  whatThisDoes: string[];
  included: string[];
  notIncluded: string[];
  importantNote?: string;
  accessNote?: string;
  resetGuarantee?: string;
}

export type CommercialPackage = ServicePackage; // Alias for backward compatibility if needed

export interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  durationLabel: string;
  priceLabel: string;
  priceValue: number;
  isPopular?: boolean;
}

export interface RequestData {
  spaceType: 'residential' | 'commercial' | null;
  selectedPackageId: string | null;
  address: string;
  size: string;
  floor: string;
  accessNotes: string;
  startDate: string;
  duration: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7782-A',
    spaceType: 'Commercial',
    address: '128 W 22nd St, Ground Floor',
    productType: 'Vacancy Bridge Activation',
    status: 'live',
    installDate: 'Oct 12, 2023',
    removalDate: 'Jan 12, 2024',
    price: 4500
  },
  {
    id: 'ORD-9921-C',
    spaceType: 'Commercial',
    address: '45 Grand St, Ground Floor',
    productType: 'Brand Pop-Up Showroom',
    status: 'verified',
    installDate: 'Nov 01, 2023',
    removalDate: 'Nov 15, 2023',
    price: 8200
  }
];

export const COMMERCIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'vacancy-bridge',
    type: 'commercial',
    title: 'Vacancy Bridge Activation',
    image: 'https://hsuandco.carrd.co/assets/images/image02.jpg?v=11bcdbae',
    bestFor: 'Monetizing short vacancy gaps',
    durationLabel: '2–12 weeks',
    useCase: 'Keep storefront active between long-term leases',
    requirements: ['500 – 3,000 sq ft', 'Ground-floor retail', 'Empty or near-empty shell'],
    durationSpecs: ['2 – 12 weeks'],
    whatThisDoes: ['Makes the space usable, presentable, and leasable', 'Supports short-term tenants, showings, or events', 'Removes “dark storefront” stigma'],
    included: ['Neutral showroom staging', 'Modular walls / partitions (non-permanent)', 'Basic lighting upgrade (plug-in)', 'Temporary flooring options', 'Signage placeholders', 'Full install + removal + reset'],
    notIncluded: ['Permanent construction', 'Heavy MEP work', 'Food prep build-outs']
  },
  {
    id: 'brand-popup',
    type: 'commercial',
    title: 'Brand Pop-Up Showroom',
    image: 'https://hsuandco.carrd.co/assets/images/image03.jpg?v=11bcdbae',
    bestFor: 'DTCs, fashion, beauty, consumer tech',
    durationLabel: '1–8 weeks',
    useCase: 'High-impact physical touchpoint for digital native brands',
    requirements: ['400 – 2,500 sq ft', 'High foot traffic corridor'],
    durationSpecs: ['1 – 8 weeks'],
    whatThisDoes: ['Creates an immersive brand environment', 'Turnkey merchandising system', 'Instagrammable moments'],
    included: ['Premium modular shelving', 'Display plinths and tables', 'Feature lighting grid', 'Fitting room modules', 'POS station setup', 'Branding surface application'],
    notIncluded: ['Inventory management', 'Staffing', 'Custom fabrication']
  },
  {
    id: 'sample-sale',
    type: 'commercial',
    title: 'Sample Sale / Flash Retail',
    image: 'https://hsuandco.carrd.co/assets/images/image05.jpg?v=11bcdbae',
    bestFor: 'Apparel, footwear, beauty brands',
    durationLabel: '3 days – 3 weeks',
    useCase: 'Rapid inventory liquidation or exclusive drops',
    requirements: ['1,000 – 5,000 sq ft', 'Open floor plan'],
    durationSpecs: ['3 days – 3 weeks'],
    whatThisDoes: ['Maximizes capacity for product density', 'Efficient traffic flow design', 'Loss prevention friendly layout'],
    included: ['High-capacity rolling racks', 'Bin tables and dump displays', 'Portable fitting rooms', 'Queue management stanchions', 'Heavy-duty folding tables', 'Rapid load-in/load-out crew'],
    notIncluded: ['Security guards', 'Cash handling systems', 'Marketing']
  },
  {
    id: 'seasonal-flagship',
    type: 'commercial',
    title: 'Seasonal Micro-Flagship',
    image: 'https://hsuandco.carrd.co/assets/images/image06.jpg?v=11bcdbae',
    bestFor: 'Established brands testing a corridor',
    durationLabel: '1–3 months',
    useCase: 'Market testing with flagship-level presence',
    requirements: ['1,500 – 4,000 sq ft', 'Premium location'],
    durationSpecs: ['1 – 3 months'],
    whatThisDoes: ['Simulates a permanent store experience', 'High-finish materials (temporary)', 'Full brand immersion'],
    included: ['Architectural temporary walls', 'Premium lounge seating', 'Custom-look joinery (rental)', 'Advanced lighting package', 'Window display installation', 'Concierge desk'],
    notIncluded: ['Long-term lease negotiation', 'Permanent signage permits']
  },
  {
    id: 'content-popup',
    type: 'commercial',
    title: 'Content-First Pop-Up',
    image: 'https://hsuandco.carrd.co/assets/images/image07.jpg?v=11bcdbae',
    bestFor: 'Brands prioritizing content + community',
    durationLabel: '1–6 weeks',
    useCase: 'Influencer events, launches, and community gathering',
    requirements: ['800 – 2,000 sq ft', 'Interesting architectural details'],
    durationSpecs: ['1 – 6 weeks'],
    whatThisDoes: ['Prioritizes photo/video moments', 'Flexible event space', 'Acoustic treatment'],
    included: ['Backdrop systems', 'Soft lighting for video', 'Modular seating cubes', 'AV support stand', 'Catering prep area set up', 'Acoustic baffling'],
    notIncluded: ['Live stream equipment', 'Talent booking']
  },
  {
    id: 'wellness-popup',
    type: 'commercial',
    title: 'Wellness / Clinic-Style Pop-Up',
    image: 'https://hsuandco.carrd.co/assets/images/image08.jpg?v=11bcdbae',
    bestFor: 'Aesthetic, wellness, recovery brands',
    durationLabel: '2–12 weeks',
    useCase: 'Treatments, consultations, and product demo',
    requirements: ['Water access', 'Private areas'],
    durationSpecs: ['2 – 12 weeks'],
    whatThisDoes: ['Creates clean, serene, clinical environment', 'Privacy partitions', 'Washable surfaces'],
    included: ['Privacy pods / curtains', 'Treatment recliner rentals', 'Sanitation stations', 'Reception area', 'Calming ambient lighting', 'White noise systems'],
    notIncluded: ['Medical licensing', 'Specialized medical equipment']
  },
  {
    id: 'gallery-mode',
    type: 'commercial',
    title: 'Gallery / Exhibition Mode',
    image: 'https://hsuandco.carrd.co/assets/images/image09.jpg?v=11bcdbae',
    bestFor: 'Artists, galleries, fairs, cultural orgs',
    durationLabel: '1–8 weeks',
    useCase: 'Art shows, traveling exhibitions, auctions',
    requirements: ['High ceilings preferred', 'Good wall space'],
    durationSpecs: ['1 – 8 weeks'],
    whatThisDoes: ['Museum-quality viewing conditions', 'Protect artwork', 'Neutral background'],
    included: ['Temporary exhibition walls', 'Museum track lighting', 'Plinths and vitrines', 'Vinyl lettering application', 'Climate monitoring', 'Art handling assistance'],
    notIncluded: ['Fine art insurance', 'Curatorial services']
  },
  {
    id: 'leasing-showcase',
    type: 'commercial',
    title: 'Leasing Showcase Mode',
    image: 'https://hsuandco.carrd.co/assets/images/image10.jpg?v=11bcdbae',
    bestFor: 'Landlords / brokers',
    durationLabel: '2–6 weeks',
    useCase: 'Marketing center for new developments',
    requirements: ['Near development site', 'Glass frontage'],
    durationSpecs: ['2 – 6 weeks'],
    whatThisDoes: ['Sales center functionality', 'Model unit feel', 'Closing area'],
    included: ['Large format rendering displays', 'Closing tables and chairs', 'Scale model stands', 'Reception hospitality', 'Lifestyle vignette staging', 'Brochure displays'],
    notIncluded: ['Printing services', 'Brokerage services']
  }
];

export const RESIDENTIAL_PACKAGES: ServicePackage[] = [
  {
    id: 'sublet-ready',
    type: 'residential',
    title: 'Sublet-Ready Conversion',
    image: 'https://hsuandco.carrd.co/assets/images/image11.jpg?v=7e274954',
    bestFor: 'Furnished or partially furnished homes',
    durationLabel: '30+ days',
    useCase: 'Prepare a lived-in home for short-term sublet or guests.',
    requirements: ['Studio – 3BR apartments', 'Furnished or partially furnished homes'], // Mapped to Suitable For
    durationSpecs: ['30 Days', '60 Days', '90 Days', '120 Days', '120+ Days'],
    whatThisDoes: ['Increases short-term rental readiness', 'Improves sleep capacity (non-structural)', 'Provides hotel-grade hygiene and completeness'],
    included: ['Sleeping setup (bed, mattress protection, linens)', 'Sealed towel sets', 'Kitchen starter kit (cookware, tableware)', 'Bathroom essentials (sealed consumables)', 'Light staging layer', 'Install, removal, and full reset'],
    notIncluded: ['Structural changes', 'Storage of owner belongings', 'Tenant management'],
    importantNote: 'Sleeping configuration does not alter legal bedroom classification.'
  },
  {
    id: 'seasonal-refresh',
    type: 'residential',
    title: 'Seasonal Home Refresh',
    image: 'https://hsuandco.carrd.co/assets/images/image13.jpg?v=7e274954',
    bestFor: 'Owner-occupied or lightly used homes',
    durationLabel: 'Quarterly / Annual',
    useCase: 'Change the feel of your home without renovation or storage.',
    requirements: ['Owner-occupied or lightly used homes'],
    durationSpecs: ['Quarterly', 'Bi-annual', 'Annual'], // Frequency
    whatThisDoes: ['Rotates soft goods and key visual elements', 'Keeps home feeling current and maintained', 'Requires minimal owner involvement'],
    included: ['Soft goods swap (pillows, throws, rugs, decor)', 'Optional 1–2 hero furniture swaps (plan-dependent)', 'On-site refresh and removal', 'Sanitized inventory'],
    notIncluded: ['Built-in changes', 'Full room redesign', 'Storage of personal items'],
    accessNote: 'Owner presence not required if access is arranged.'
  },
  {
    id: 'turnkey-setup',
    type: 'residential',
    title: 'Turnkey Furnished Setup',
    image: 'https://hsuandco.carrd.co/assets/images/image12.jpg?v=7e274954',
    bestFor: 'Empty apartments or transitional homes',
    durationLabel: '90–180 days',
    useCase: 'Convert an empty home into a fully usable furnished unit.',
    requirements: ['Empty apartments', 'Newly purchased or transitional homes'],
    durationSpecs: ['90 Days', '120 Days', '150 Days', '180 Days', '180+ Days'],
    whatThisDoes: ['Delivers a complete, move-in-ready setup', 'No furniture purchase required', 'Fully reversible'],
    included: ['Living, sleeping, dining furniture', 'Lighting and rugs', 'Kitchen and bath essentials', 'Install, removal, and reset'],
    notIncluded: ['Permanent fixtures', 'Long-term storage', 'Custom fabrication'],
    resetGuarantee: 'Space is returned to original empty condition.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'residential-staging',
    title: 'Residential Staging',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
    description: 'Full furniture rental and styling for residential sales.',
    durationLabel: '1-6 months',
    priceLabel: 'From $2k',
    priceValue: 2000,
    isPopular: true
  },
  {
    id: 'event-rental',
    title: 'Event Rental',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000',
    description: 'Short-term furniture for events and gatherings.',
    durationLabel: '1-7 days',
    priceLabel: 'From $500',
    priceValue: 500
  }
];