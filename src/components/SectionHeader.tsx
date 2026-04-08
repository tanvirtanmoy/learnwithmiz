interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brown-secondary text-lg max-w-2xl mx-auto whitespace-pre-line">
          {subtitle}
        </p>
      )}
    </div>
  );
}
