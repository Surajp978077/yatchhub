import Link from 'next/link';
import { Share2, Phone, Mail, MessageCircle } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import type { SocialLinks } from '@/types';

const FLEET_LINKS = ['Superyachts', 'Sailing Yachts', 'Expedition Yachts'];
const DESTINATION_LINKS = ['Mediterranean', 'Caribbean', 'South Pacific', 'Indian Ocean'];

interface FooterProps {
  tagline?: string;
  socialLinks?: SocialLinks;
}

export function Footer({
  tagline = 'Redefining luxury travel since 2010. Experience the ocean like never before.',
  socialLinks = {},
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#050a18] pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-black text-[#c9a66b] tracking-widest inline-block mb-4"
            >
              AQUAVISTA
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{tagline}</p>
            <div className="flex gap-5">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/60 hover:text-[#c9a66b] hover:-translate-y-1 transition-all duration-300"
                >
                  <Share2 size={22} />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-white/60 hover:text-[#c9a66b] hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle size={22} />
                </a>
              )}
              {socialLinks.phone && (
                <a
                  href={socialLinks.phone}
                  aria-label="Phone"
                  className="text-white/60 hover:text-[#c9a66b] hover:-translate-y-1 transition-all duration-300"
                >
                  <Phone size={22} />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={socialLinks.email}
                  aria-label="Email"
                  className="text-white/60 hover:text-[#c9a66b] hover:-translate-y-1 transition-all duration-300"
                >
                  <Mail size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="text-[#c9a66b] font-semibold tracking-widest uppercase text-sm mb-5">
              Fleet
            </h4>
            <ul className="space-y-3">
              {FLEET_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href="/yachts"
                    className="text-white/50 hover:text-[#c9a66b] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-[#c9a66b] font-semibold tracking-widest uppercase text-sm mb-5">
              Destinations
            </h4>
            <ul className="space-y-3">
              {DESTINATION_LINKS.map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#c9a66b] font-semibold tracking-widest uppercase text-sm mb-5">
              Newsletter
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe for exclusive offers and charter updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {currentYear} AQUAVISTA Luxury Charters. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with Next.js &amp; Headless WordPress
          </p>
        </div>
      </div>
    </footer>
  );
}
