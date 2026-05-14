import { MessageCircle, Phone, Mail, Share2 } from 'lucide-react';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import type { SocialLinks } from '@/types';

interface ContactCTAProps {
  whatsappNumber?: string;
  socialLinks?: SocialLinks;
}

export function ContactCTA({
  whatsappNumber = '1234567890',
  socialLinks = {},
}: ContactCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a1128] to-[#050a18]">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <RevealWrapper>
          <div className="glass-card rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#c9a66b]/10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-[#c9a66b]/10" />

            <span className="block text-[#c9a66b] uppercase tracking-[5px] text-sm font-semibold mb-4">
              Ready to Charter?
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
              Your Dream Voyage<br />Awaits
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
              Contact our charter specialists today and let us craft the perfect
              bespoke yacht experience for you.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#c9a66b] text-[#0a1128]
                  font-bold px-10 py-4 rounded hover:bg-[#e0c097] hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
              {socialLinks.email && (
                <a
                  href={socialLinks.email}
                  className="inline-flex items-center justify-center gap-2
                    border border-[#c9a66b] text-[#c9a66b] font-bold px-10 py-4 rounded
                    hover:bg-[#c9a66b] hover:text-[#0a1128] transition-all duration-300"
                >
                  <Mail size={20} />
                  Send an Email
                </a>
              )}
            </div>

            {/* Social icons row */}
            <div className="flex items-center justify-center gap-6 text-white/30">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c9a66b] transition-colors"
                  aria-label="Instagram"
                >
                  <Share2 size={24} />
                </a>
              )}
              {socialLinks.phone && (
                <a
                  href={socialLinks.phone}
                  className="hover:text-[#c9a66b] transition-colors"
                  aria-label="Phone"
                >
                  <Phone size={24} />
                </a>
              )}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
