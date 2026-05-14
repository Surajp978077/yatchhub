interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  goldAccent?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  goldAccent = true,
  className = '',
}: SectionTitleProps) {
  return (
    <div
      className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}
    >
      {goldAccent && (
        <span className="block text-[#c9a66b] uppercase tracking-[4px] text-sm font-semibold mb-3">
          — Aquavista —
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
