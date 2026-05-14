import { cn } from '@/utils/cn';

interface SectionTitleProps {
  heading: string;
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  accentLine?: boolean;
  className?: string;
}

export default function SectionTitle({
  heading,
  subheading,
  align = 'center',
  accentLine = true,
  className,
}: SectionTitleProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <div className={cn('flex flex-col gap-4 mb-16', alignClass, className)}>
      {accentLine && (
        <span className="block w-12 h-0.5 bg-gold" />
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
        {heading}
      </h2>
      {subheading && (
        <p className="text-white/60 text-lg max-w-2xl">{subheading}</p>
      )}
    </div>
  );
}
