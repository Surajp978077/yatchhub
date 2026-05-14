import Link from 'next/link';
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#c9a66b] text-[#0a1128] font-bold hover:bg-[#e0c097] hover:scale-105',
  outline:
    'border border-[#c9a66b] text-[#c9a66b] hover:bg-[#c9a66b] hover:text-[#0a1128]',
  ghost:
    'text-[#c9a66b] hover:text-[#e0c097] underline-offset-4 hover:underline',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
};

const baseClasses =
  'inline-block rounded cursor-pointer transition-all duration-300 ease-out font-semibold tracking-wide';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  children,
  ...props
}: LinkButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
