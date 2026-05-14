import Link from 'next/link';
import { Anchor } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a1128] flex items-center justify-center px-6">
      <div className="text-center">
        <Anchor className="text-[#c9a66b]/30 mx-auto mb-8" size={64} />
        <h1 className="font-serif text-8xl text-[#c9a66b] font-black mb-4">404</h1>
        <p className="font-serif text-2xl text-white mb-3">Page Not Found</p>
        <p className="text-white/40 mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for has sailed away. Let&apos;s get you back on course.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#c9a66b] text-[#0a1128] font-bold px-10 py-4 rounded
            hover:bg-[#e0c097] hover:scale-105 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
