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
        bg-bg-white rounded-2xl border border-border-light p-6
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:border-border-soft hover:-translate-y-0.5' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
