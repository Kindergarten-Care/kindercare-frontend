export interface NavLink {
  href: string;
  label: string;
  icon?: string;
}

export type HeroSlideVariant = 'forest' | 'spring' | 'amber';

export interface HeroSlide {
  variant: HeroSlideVariant;
  eyebrow: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  primaryCta: { label: string; href: string; tone?: 'green' | 'amber' };
  secondaryCta: { label: string; href: string };
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface EnvCard {
  icon: string;
  title: string;
  description: string;
}

export interface EnrollmentRow {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  tag: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
}

export interface TechCardKind {
  id: string;
  title: string;
  description: string;
  mockKind: 'dashboard' | 'camera' | 'menu' | 'payments' | 'progress';
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterBadge {
  label: string;
}

export type ChildAgeValue = '18-24m' | '2' | '3' | '4' | '5';
export type PricingPlanValue = 'month' | 'quarter' | 'year';
