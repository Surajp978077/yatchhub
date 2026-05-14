import { MessageCircle, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { DEFAULT_WHATSAPP } from '@/lib/constants';

interface ContactCTAProps {
  heading?: string;
  subheading?: string;
  whatsappNumber?: string;
}

export default function ContactCTA({
  heading = 'Ready to Set Sail?',
  subheading = 'Let our charter specialists craft your perfect voyage. Contact us today for a bespoke proposal.',
  whatsappNumber = DEFAULT_WHATSAPP,
}: ContactCTAProps) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-[#0d2040] to-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,166,107,0.07)_0%,_transparent_70%)]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative container mx-auto px-5 text-center">
        <span className="inline-block w-12 h-px bg-gold mb-8" />
        
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
          {heading}
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            href={`https://wa.me/${whatsappNumber}`}
            external
            size="lg"
            className="gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </Button>
          <Button
            href="tel:+1234567890"
            external
            variant="outline"
            size="lg"
            className="gap-3"
          >
            <Phone className="w-5 h-5" />
            Call Us
          </Button>
        </div>
      </div>
    </section>
  );
}
