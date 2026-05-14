'use client';

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        placeholder="Your email address"
        className="bg-white/5 border border-white/10 text-white placeholder-white/30 rounded px-4 py-3 text-sm outline-none focus:border-[#c9a66b] transition-colors"
      />
      <button
        type="submit"
        className="bg-[#c9a66b] text-[#0a1128] font-bold py-3 rounded text-sm hover:bg-[#e0c097] transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
