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
    '受付中': 'bg-sage-100 text-sage-700',
    'Available': 'bg-sage-100 text-sage-700',
    '準備中': 'bg-warmGray-100 text-warmGray-600',
    'Coming Soon': 'bg-warmGray-100 text-warmGray-600',
    '近日開講': 'bg-cafe-100 text-cafe-700',
  };

  const statusClass = statusStyles[status as keyof typeof statusStyles] || 'bg-warmGray-100 text-warmGray-600';

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-cafe-50 text-cafe-700 rounded-full">
          {level}
        </span>
        <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${statusClass}`}>
          {status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-warmGray-800 mb-2">{title}</h3>
      <p className="text-warmGray-600 text-sm leading-relaxed flex-grow">{description}</p>
    </Card>
  );
}
