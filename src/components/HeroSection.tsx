import { ReactNode } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  centered?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  children,
  size = 'medium',
  centered = true,
}: HeroSectionProps) {
  const paddingClasses = {
    small: 'py-12 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
  };

  return (
    <section className={`${paddingClasses[size]} bg-gradient-to-b from-warmWhite to-cream`}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${centered ? 'text-center' : ''}`}>
        {subtitle && (
          <p className="text-cafe-600 font-medium text-sm md:text-base mb-3 tracking-wide">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmGray-800 leading-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-warmGray-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
