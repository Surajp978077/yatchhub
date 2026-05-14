'use client';

import Link from 'next/link';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-navy font-bold hover:bg-gold-light active:scale-95 shadow-md hover:shadow-gold/30',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-navy font-semibold',
  ghost:
    'text-white/80 hover:text-gold hover:bg-white/5 font-medium',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm tracking-wide',
  md: 'px-8 py-3.5 text-base tracking-wide',
  lg: 'px-10 py-4 text-base tracking-widest uppercase',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  disabled,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded gap-2 transition-all duration-300 cursor-pointer select-none',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 pointer-events-none',
    className
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
