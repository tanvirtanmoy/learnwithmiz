import Image from 'next/image';
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
        {/* Photo */}
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full flex-shrink-0 overflow-hidden">
          <Image
            src="/mizuki.jpeg"
            alt={name}
            width={192}
            height={192}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Info */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl font-semibold text-brown-primary mb-1">{name}</h3>
          <p className="text-brown-secondary font-heading font-medium mb-4">{role}</p>
          <p className="text-brown-secondary leading-relaxed mb-6">{bio}</p>
          <Button href={ctaHref} variant="outline">
            {cta}
          </Button>
        </div>
      </div>
    </Card>
  );
}
