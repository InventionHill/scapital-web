export interface FeatureItem {
  text: string;
  isActive: boolean;
}

export interface CtaButton {
  label: string;
  url?: string;
  enabled: boolean;
}

export interface DocumentItem {
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface RateItem {
  label: string;
  value: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface LoanBanner {
  id: string;
  title: string;
  heading?: string;
  headingHighlight?: string;
  imageUrl: string;
  icon?: string;
  description: string;
  
  // New Sections
  overviewTitle?: string;
  overviewTitleHighlight?: string;
  overviewContent?: string;
  benefitsTitle?: string;
  benefitsTitleHighlight?: string;
  benefits?: BenefitItem[];
  documentsTitle?: string;
  documents?: (string | DocumentItem)[];

  // Rates & Charges Section
  ratesTitle?: string;
  ratesTitleHighlight?: string;
  ratesImage?: string;

  ratesTable?: RateItem[];

  // Steps Section
  stepsTitle?: string;
  stepsTitleHighlight?: string;
  stepsButtonLabel?: string;
  steps?: StepItem[];

  // Comparison Section
  comparisonTitle?: string;
  comparisonTitleHighlight?: string;
  comparisonTable?: { feature: string; scapital: string; banks: string; nbfcs: string }[];

  features: FeatureItem[];
  ctaPrimary?: CtaButton;
  ctaSecondary?: CtaButton;
  order: number;
  isActive: boolean;
  isDefault: boolean;

  // Configuration
  defaultAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  
  defaultTenure?: number;
  minTenure?: number;
  maxTenure?: number;
  
  defaultInterest?: number;
  minInterest?: number;
  maxInterest?: number;
}

export interface KeyDepartment {
  id: string;
  title: string;
  experience: string;
  isActive: boolean;
}

export interface EmployeeTestimonial {
  id: string;
  name: string;
  position: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  workingHours: string;
  address: string;
  mapUrl?: string;
  isActive: boolean;
}
