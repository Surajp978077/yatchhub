'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import { NAV_LINKS, SITE_NAME, DEFAULT_WHATSAPP } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-4 bg-navy/90 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'py-7 bg-transparent'
      )}
    >
      <div className="container mx-auto px-5 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-display text-2xl font-black text-gold tracking-widest">
          {SITE_NAME}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium tracking-wider uppercase transition-colors duration-200 relative group',
                pathname === href ? 'text-gold' : 'text-white/80 hover:text-white'
              )}
            >
              {label}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300',
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            href={`https://wa.me/${DEFAULT_WHATSAPP}`}
            external
            size="sm"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden bg-navy/95 backdrop-blur-md border-t border-white/5 overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-5 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-base font-medium tracking-wider transition-colors',
                pathname === href ? 'text-gold' : 'text-white/80'
              )}
            >
              {label}
            </Link>
          ))}
          <Button
            href={`https://wa.me/${DEFAULT_WHATSAPP}`}
            external
            size="sm"
            className="mt-2 w-full text-center"
          >
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
