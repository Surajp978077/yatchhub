'use client';

import Button from '@/components/ui/Button';

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        placeholder="Your email address"
        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 rounded text-sm focus:outline-none focus:border-gold/50 transition-colors"
      />
      <Button type="submit" size="sm" className="w-full justify-center">
        Subscribe
      </Button>
    </form>
  );
}
