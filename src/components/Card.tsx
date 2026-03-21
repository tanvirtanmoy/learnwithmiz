import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl border border-cafe-100 p-6
        ${hover ? 'transition-all duration-200 hover:shadow-lg hover:border-cafe-200 hover:-translate-y-0.5' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
