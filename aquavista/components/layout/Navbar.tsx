'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { LinkButton } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/yachts' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1234567890';

export function Navbar() {
  const scrolled = useNavbarScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'py-4 bg-[#0a1128]/90 backdrop-blur-md shadow-lg'
          : 'py-7 bg-transparent'
        }`}
    >
      <nav className="max-w-[1400px] mx-auto px-[5%] flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-[2rem] font-black text-[#c9a66b] tracking-widest hover:text-[#e0c097] transition-colors"
        >
          AQUAVISTA
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link text-white/90 hover:text-white font-medium tracking-wide text-sm uppercase transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <LinkButton
            href={`https://wa.me/${WA_NUMBER}`}
            external
            size="sm"
          >
            Book Now
          </LinkButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-[#c9a66b] transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400
          ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-[#0a1128]/95 backdrop-blur-md px-[5%] py-6 flex flex-col gap-5 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-[#c9a66b] font-medium uppercase tracking-widest text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LinkButton
            href={`https://wa.me/${WA_NUMBER}`}
            external
            size="sm"
            className="text-center w-full"
          >
            Book Now
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
