import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide';
  
  const variantClasses = {
    primary: 'bg-brown-button text-brown-primary hover:bg-brown-button-hover focus:ring-brown-accent shadow-sm hover:shadow-md',
    secondary: 'bg-bg-section text-brown-secondary hover:bg-brown-light focus:ring-brown-accent',
    outline: 'border-2 border-brown-button text-brown-primary hover:bg-brown-accent/30 focus:ring-brown-accent',
  };

  const sizeClasses = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-7 py-2.5 text-base',
    large: 'px-9 py-3.5 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
