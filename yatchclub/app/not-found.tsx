import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <span className="font-display text-9xl font-black text-gold/10 block leading-none mb-4">
          404
        </span>
        <span className="block w-12 h-px bg-gold mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          Lost at Sea
        </h1>
        <p className="text-white/50 text-lg mb-10">
          The page you&apos;re looking for has sailed beyond the horizon. Let us guide you back.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/" size="md">Return Home</Button>
          <Button href="/yachts" variant="outline" size="md">View Fleet</Button>
        </div>
      </div>
    </div>
  );
}
