import Button from './Button';
import Card from './Card';

interface InstructorCardProps {
  name: string;
  role: string;
  bio: string;
  cta: string;
  ctaHref: string;
}

export default function InstructorCard({
  name,
  role,
  bio,
  cta,
  ctaHref,
}: InstructorCardProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Photo placeholder */}
        <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-cafe-100 to-cafe-200 rounded-full flex-shrink-0 flex items-center justify-center">
          <span className="text-5xl md:text-6xl">☕</span>
        </div>
        
        {/* Info */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl font-bold text-warmGray-800 mb-1">{name}</h3>
          <p className="text-cafe-600 font-medium mb-4">{role}</p>
          <p className="text-warmGray-600 leading-relaxed mb-6">{bio}</p>
          <Button href={ctaHref} variant="outline">
            {cta}
          </Button>
        </div>
      </div>
    </Card>
  );
}
