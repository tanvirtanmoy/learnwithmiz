import Button from './Button';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'highlight';
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
}: CTASectionProps) {
  const bgClasses = variant === 'highlight' 
    ? 'bg-gradient-to-r from-cafe-50 to-cream' 
    : 'bg-cream';

  return (
    <section className={`py-16 md:py-20 ${bgClasses}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-warmGray-600 mb-8 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryButton && (
            <Button href={primaryButton.href} variant="primary" size="large">
              {primaryButton.label}
            </Button>
          )}
          {secondaryButton && (
            <Button href={secondaryButton.href} variant="outline" size="large">
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
