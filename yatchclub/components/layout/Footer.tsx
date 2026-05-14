import Link from 'next/link';
import { Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import NewsletterForm from './NewsletterForm';
import { SITE_NAME, DEFAULT_WHATSAPP } from '@/lib/constants';

const fleetLinks = [
  { label: 'Superyachts', href: '/yachts?type=superyacht' },
  { label: 'Sailing Yachts', href: '/yachts?type=sailing' },
  { label: 'Expedition Yachts', href: '/yachts?type=expedition' },
];

const destinationLinks = [
  { label: 'Mediterranean', href: '/yachts?destination=mediterranean' },
  { label: 'Caribbean', href: '/yachts?destination=caribbean' },
  { label: 'South Pacific', href: '/yachts?destination=pacific' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050a18] pt-20 pb-8">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="font-display text-2xl font-black text-gold tracking-widest">
              {SITE_NAME}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Redefining luxury travel since 2010. Experience the ocean like never before aboard
              our handpicked fleet of superyachts.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors duration-200 hover:-translate-y-1 inline-block"
                aria-label="Instagram"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${DEFAULT_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors duration-200 hover:-translate-y-1 inline-block"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+1234567890"
                className="text-white/50 hover:text-gold transition-colors duration-200 hover:-translate-y-1 inline-block"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@aquavista.com"
                className="text-white/50 hover:text-gold transition-colors duration-200 hover:-translate-y-1 inline-block"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Fleet Column */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-widest mb-5">Fleet</h4>
            <ul className="space-y-3">
              {fleetLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Column */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-widest mb-5">Destinations</h4>
            <ul className="space-y-3">
              {destinationLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-widest mb-5">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe for exclusive charter offers and new yacht announcements.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME} Luxury Charters. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
