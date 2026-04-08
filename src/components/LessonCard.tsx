import Card from './Card';

interface LessonCardProps {
  title: string;
  description: string;
  level: string;
  status: string;
}

export default function LessonCard({
  title,
  description,
  level,
  status,
}: LessonCardProps) {
  const statusStyles = {
    '受付中': 'bg-green-100 text-green-700',
    'Available': 'bg-green-100 text-green-700',
    '準備中': 'bg-border-light text-brown-secondary',
    'Coming Soon': 'bg-border-light text-brown-secondary',
    '近日開講': 'bg-brown-accent text-brown-primary',
  };

  const statusClass = statusStyles[status as keyof typeof statusStyles] || 'bg-border-light text-brown-secondary';

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-bg-section text-brown-primary rounded-full">
          {level}
        </span>
        <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${statusClass}`}>
          {status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-brown-primary mb-2">{title}</h3>
      <p className="text-brown-secondary text-sm leading-relaxed flex-grow">{description}</p>
    </Card>
  );
}
