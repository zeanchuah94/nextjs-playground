// Portfolio types
export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'design' | 'other';
  level: 1 | 2 | 3 | 4 | 5; // 1: 初級, 5: エキスパート
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  description?: string;
  achievements?: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'youtube' | 'instagram' | 'other';
  url: string;
  username?: string;
}

// Portfolio Item types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'game' | 'web' | 'mobile';
  category: string;
  technologies: string[];
  url?: string;
  demoUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  images?: string[];
  gameConfig?: GameConfig;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GameConfig {
  engine: 'unity' | 'unreal' | 'godot' | 'other';
  width: number;
  height: number;
  buildUrl: string;
  buildType: 'webgl' | 'html5';
  controls?: string[];
  systemRequirements?: string;
}

// Admin types
export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'editor';
  lastLogin: Date;
}

// UI types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter types
export interface PortfolioFilter {
  category?: string;
  type?: PortfolioItem['type'];
  technology?: string;
  featured?: boolean;
  search?: string;
}

// Analytics types
export interface PageView {
  page: string;
  timestamp: Date;
  userAgent?: string;
  referrer?: string;
}
